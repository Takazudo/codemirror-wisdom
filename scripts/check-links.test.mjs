import assert from "node:assert/strict";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { checkHtmlLinksAndTrailing, extractHtmlLinks } from "./check-links.js";

async function withFiles(files, callback) {
  const root = await mkdtemp(path.join(os.tmpdir(), "check-links-"));
  for (const [name, value] of Object.entries(files)) {
    const target = path.join(root, name);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, value);
  }
  try {
    await callback(root);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}

const hrefs = (links) => links.map((link) => link.href);

test("extractHtmlLinks reads quoted and minified unquoted attribute values", () => {
  const html =
    "<a href=/docs/foo>a</a><a href='/docs/bar'>b</a><a href=\"/docs/baz?a=1&amp;b=2\">c</a>";
  assert.deepEqual(hrefs(extractHtmlLinks(html)), [
    "/docs/foo",
    "/docs/bar",
    "/docs/baz?a=1&b=2",
  ]);
});

test("extractHtmlLinks skips external and non-navigable schemes", () => {
  const html = [
    '<a href="https://example.com">x</a>',
    "<a href=//cdn.example.com/x>x</a>",
    '<a href="mailto:a@b.c">x</a>',
    '<a href="tel:+123">x</a>',
    '<a href="/docs/keep">x</a>',
  ].join("");
  assert.deepEqual(hrefs(extractHtmlLinks(html)), ["/docs/keep"]);
});

test("escaped source attributes are not mistaken for rendered links or anchors", async () => {
  await withFiles(
    {
      "index.html": [
        String.raw`<a data-example='href=\"/docs/ghost\"' href=/docs/real>real</a>`,
        String.raw`<a href="#\">escaped-anchor-probe</a>`,
        String.raw`<code data-example='id=\"pretend\"'></code>`,
      ].join(""),
      "docs/real/index.html": "<h2 id=real>Real</h2>",
    },
    async (root) => {
      const result = await checkHtmlLinksAndTrailing(root, root, "/", []);
      assert.deepEqual(hrefs(result.broken), []);
      assert.deepEqual(hrefs(result.anchors), ["#\\"]);
    },
  );
});

test("checkHtmlLinksAndTrailing validates minified unquoted href and id attributes", async () => {
  await withFiles(
    {
      "docs/a/index.html": [
        "<a href=/docs/b#bindings-images>good</a>",
        "<a href=/docs/b#images>bad-anchor</a>",
        "<a href=#here>good-local</a>",
        "<a href=#nowhere>bad-local</a>",
        "<a href=/docs/gone#anything>bad-path</a>",
        "<h2 id=here>here</h2>",
      ].join(""),
      "docs/b/index.html": "<h3 id=bindings-images>Images</h3>",
    },
    async (root) => {
      const result = await checkHtmlLinksAndTrailing(root, root, "/", []);
      assert.deepEqual(hrefs(result.broken), ["/docs/gone#anything"]);
      assert.deepEqual(hrefs(result.anchors).sort(), ["#nowhere", "/docs/b#images"]);
    },
  );
});
