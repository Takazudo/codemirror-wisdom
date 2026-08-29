import { defineConfig } from "zfb/config";
import { zudoDoc } from "@takazudo/zudo-doc/config";

// The canonical seven content directives (directive name -> JSX component
// name). Identical to @takazudo/zudo-doc/directive-vocabulary-defaults; passed
// explicitly so the mapping is visible at the config site. `details` routes to
// the collapsible Details wrapper, NOT an admonition.
const directives = {
  note: "Note",
  tip: "Tip",
  info: "Info",
  warning: "Warning",
  danger: "Danger",
  caution: "Caution",
  details: "Details",
};

// zudoDoc() returns a complete ZfbConfig — framework "preact", Tailwind,
// content collections, the markdown pipeline, and package-owned routes — by
// shallow-merging these host settings over its documented defaults. Keep the
// fields literal here so scaffold tooling can inspect base and locale paths.
export default defineConfig(
  zudoDoc({
    colorScheme: "Default Dark",
    colorMode: {
      defaultMode: "dark",
      lightScheme: "Default Light",
      darkScheme: "Default Dark",
      respectPrefersColorScheme: true,
    },
    siteName: "zudo-codemirror-wisdom",
    siteDescription: "Takazudo's CodeMirror 6 dev notes for me and AI agents",
    // Home-hero logo. MUST stay explicit: zudo-doc defaults `logo` to "auto",
    // which renders a generated placeholder SVG seeded by siteName and silently
    // shadows this site's own brand mark. Rendered as a theme-adaptive CSS mask,
    // so the asset's fill colors are ignored by design.
    logo: "/img/logo.svg",
    base: "/",
    trailingSlash: false,
    // Preserve the 3.1.0 (unminified) HTML baseline. v4 defaults minifyHtml to
    // true; kept false here so the check:html gate validates the same
    // human-readable output shape as before the rescaffold.
    minifyHtml: false,
    noindex: false,
    editUrl: false,
    githubUrl: "https://github.com/Takazudo/zudo-codemirror-wisdom",
    siteUrl: "https://zudo-codemirror-wisdom.takazudomodular.com",
    metaTags: {
      description: true,
      keywords: "",
      ogImage: "/img/ogp.png",
      ogSiteName: true,
      twitterCard: "summary_large_image",
      twitterCreator: "@Takazudo",
    },
    // Site webfont - Noto Sans JP for JA + Latin body text. Emitted as real <head>
    // links via the head config (preconnect + async-loaded stylesheet). Never load
    // the font via global.css @import: Tailwind v4 bundling can push it past the
    // first style rule, making the browser silently drop it.
    head: {
      preconnect: [
        { href: "https://fonts.googleapis.com" },
        { href: "https://fonts.gstatic.com", crossorigin: "anonymous" },
      ],
      stylesheets: [
        {
          href: "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&display=swap",
          async: true,
        },
      ],
    },
    docsDir: "src/content/docs",
    defaultLocale: "en",
    locales: {
      ja: { label: "JA", dir: "src/content/docs-ja" },
    },
    mermaid: true,
    sitemap: false,
    docMetainfo: false,
    docTags: false,
    tagPlacement: "after-title",
    tagGovernance: "off",
    tagVocabulary: false,
    frontmatterPreview: false,
    llmsTxt: true,
    changelogs: false,
    math: false,
    cjkFriendly: true,
    onBrokenMarkdownLinks: "warn",
    aiAssistant: false,
    aiChatDemoMode: false,
    aiChatAllowedOrigins: [],
    aiChatGlobalDailyLimit: false,
    docHistory: true,
    bodyFootUtilArea: {
      docHistory: true,
      viewSourceLink: false,
    },
    designTokenPanel: false,
    tocMinDepth: 2,
    tocMaxDepth: 4,
    sidebarResizer: true,
    sidebarToggle: true,
    imageEnlarge: true,
    dynamicPageTransition: false,
    // CM6 IIFE bundle injected into every HtmlPreview iframe head so live demos
    // can reach `window.CM.*`. The wrapper does NOT base-prefix this raw string,
    // and base is "/" here, so the absolute /assets/... path resolves directly.
    htmlPreview: {
      head: '<script src="/assets/cm6-bundle.min.js"></script>',
    },
    versions: false,
    claudeResources: {
      claudeDir: ".claude",
    },
    // The claude-resources plugin generates these categories at build time from
    // .claude/ + CLAUDE.md. It also emits claude-agents / claude-commands, so
    // they are listed here too — all Claude content is default-locale-only (no
    // JA fallback routes).
    defaultLocaleOnlyPrefixes: [
      "/docs/claude/",
      "/docs/claude-md/",
      "/docs/claude-skills/",
      "/docs/claude-agents/",
      "/docs/claude-commands/",
    ],
    footer: {
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} <a href="https://x.com/Takazudo" rel="nofollow noreferrer noopener" target="_blank">Takazudo</a>. Built with <a href="https://zudo-doc.takazudomodular.com/" rel="nofollow noreferrer noopener" target="_blank">zudo-doc</a>. Enjoy synth on <a href="https://takazudomodular.com/" rel="nofollow noreferrer noopener" target="_blank">Takazudo Modular</a>.`,
    },
    headerNav: [
      { label: "Overview", path: "/docs/overview", categoryMatch: "overview" },
      { label: "Core", path: "/docs/core", categoryMatch: "core" },
      { label: "Vim Mode", path: "/docs/vim-mode", categoryMatch: "vim-mode" },
      {
        label: "Extensions",
        path: "/docs/extensions",
        categoryMatch: "extensions",
      },
      { label: "Recipes", path: "/docs/recipes", categoryMatch: "recipes" },
      { label: "Claude", path: "/docs/claude", categoryMatch: "claude" },
    ],
    headerRightItems: [
      { type: "component", component: "github-link" },
      { type: "component", component: "theme-toggle" },
      { type: "component", component: "search" },
      { type: "component", component: "language-switcher" },
    ],
    // Package-owned route injection (@takazudo/zudo-doc/plugins/routes): the
    // package supplies the 404 / sitemap / robots / tags / versions routes at
    // build time. The host still ships the doc catch-all stubs
    // (pages/docs/[[...slug]].tsx + the locale variant) because injected DYNAMIC
    // routes 404 in `zfb dev` — see the header comment in those files. Default is
    // true; kept explicit for clarity.
    packageOwnedRoutes: true,
    directives: directives,
    // Dev/preview port. zfb defaults to 3000; the generated CLAUDE.md and the
    // doc-history dev server assume 4321.
    port: 4321,
    // Cloudflare Workers adapter — required for the Workers static-assets
    // deploy and the package-owned api-ai-chat route. Bindings via wrangler.toml.
    adapter: "@takazudo/zfb-adapter-cloudflare",
    // Wide home grid on `/` and every locale home. Replaces the former
    // host-reconstructed pages/index.tsx, which existed only because zudo-doc
    // 4.2.1 had no toggle (zudolab/zudo-doc#2959); 4.4.x added `home.wide`, so
    // the package-owned route is used again and index.tsx is back to stock.
    home: { wide: true },
  }),
);
