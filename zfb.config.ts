import { defineConfig } from "zfb/config";
import { zudoDoc } from "@takazudo/zudo-doc/config";
import { settings } from "./src/config/settings";

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

// v4 single-entry config (zudolab/zudo-doc#2651 "Minimal Scaffold"): zudoDoc()
// returns a COMPLETE ZfbConfig — framework "preact", tailwind, content
// collections, markdown pipeline, and the package-owned routes — by shallow-
// merging the fields below over its documented defaults. Host shell fields
// (port / adapter / directives) are accepted directly by zudoDoc(); `base`
// rides in via ...settings.
export default defineConfig(
  zudoDoc({
    ...settings,
    directives,
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
