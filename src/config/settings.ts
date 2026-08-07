export type {
  HeaderNavChildItem,
  HeaderNavItem,
  HeaderRightItem,
  ColorModeConfig,
  HtmlPreviewConfig,
  LocaleConfig,
  VersionConfig,
  FooterConfig,
  FrontmatterPreviewConfig,
  BodyFootUtilAreaConfig,
  TagPlacement,
  TagGovernanceMode,
  TagVocabularyEntry,
  ChangelogConfig,
  SiteHeadConfig,
  MetaTagsConfig,
} from "@takazudo/zudo-doc/settings";
import type {
  HeaderNavItem,
  HeaderRightItem,
  ColorModeConfig,
  HtmlPreviewConfig,
  LocaleConfig,
  VersionConfig,
  FooterConfig,
  FrontmatterPreviewConfig,
  BodyFootUtilAreaConfig,
  TagPlacement,
  TagGovernanceMode,
  ChangelogConfig,
  SiteHeadConfig,
  MetaTagsConfig,
} from "@takazudo/zudo-doc/settings";

export const settings = {
  colorScheme: "Default Dark",
  colorMode: {
    defaultMode: "dark",
    lightScheme: "Default Light",
    darkScheme: "Default Dark",
    respectPrefersColorScheme: true,
  } satisfies ColorModeConfig as ColorModeConfig | false,
  siteName: "zudo-codemirror-wisdom",
  siteDescription: "Takazudo's CodeMirror 6 dev notes for me and AI agents" as string,
  // Home-hero logo. MUST stay explicit: zudo-doc defaults `logo` to "auto",
  // which renders a generated placeholder SVG seeded by siteName and silently
  // shadows this site's own brand mark. Rendered as a theme-adaptive CSS mask,
  // so the asset's fill colors are ignored by design.
  logo: "/img/logo.svg" as string | false,
  base: "/",
  trailingSlash: false as boolean,
  // Preserve the 3.1.0 (unminified) HTML baseline. v4 defaults minifyHtml to
  // true; kept false here so the check:html gate validates the same
  // human-readable output shape as before the rescaffold.
  minifyHtml: false as boolean,
  noindex: false as boolean,
  editUrl: false as string | false,
  githubUrl: "https://github.com/Takazudo/zudo-codemirror-wisdom" as string | false,
  siteUrl: "https://zudo-codemirror-wisdom.takazudomodular.com" as string,
  metaTags: {
    description: true,
    keywords: "",
    ogImage: "/img/ogp.png",
    ogSiteName: true,
    twitterCard: "summary_large_image",
    twitterCreator: "@Takazudo",
  } satisfies MetaTagsConfig as MetaTagsConfig,
  // Site webfont - Noto Sans JP for JA + Latin body text. Emitted as real <head>
  // links via settings.head (preconnect + async-loaded stylesheet). Never load
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
  } satisfies SiteHeadConfig as SiteHeadConfig,
  docsDir: "src/content/docs",
  defaultLocale: "en" as const,
  locales: {
    ja: { label: "JA", dir: "src/content/docs-ja" },
  } satisfies Record<string, LocaleConfig>,
  mermaid: true,
  sitemap: false,
  docMetainfo: false,
  docTags: false,
  tagPlacement: "after-title" as TagPlacement,
  tagGovernance: "off" as TagGovernanceMode,
  tagVocabulary: false as boolean,
  frontmatterPreview: false as FrontmatterPreviewConfig | false,
  llmsTxt: true,
  changelogs: false as ChangelogConfig[] | false,
  math: false,
  cjkFriendly: true as boolean,
  onBrokenMarkdownLinks: "warn" as "warn" | "error" | "ignore",
  aiAssistant: false as boolean,
  aiChatDemoMode: false as boolean,
  aiChatAllowedOrigins: [] as string[],
  aiChatGlobalDailyLimit: false as number | false,
  docHistory: true,
  bodyFootUtilArea: {
    docHistory: true,
    viewSourceLink: false,
  } satisfies BodyFootUtilAreaConfig as BodyFootUtilAreaConfig | false,
  designTokenPanel: false as boolean,
  tocMinDepth: 2 as number,
  tocMaxDepth: 4 as number,
  sidebarResizer: true as boolean,
  sidebarToggle: true as boolean,
  imageEnlarge: true as boolean,
  dynamicPageTransition: false as boolean,
  // CM6 IIFE bundle injected into every HtmlPreview iframe head so live demos
  // can reach `window.CM.*`. The wrapper does NOT base-prefix this raw string,
  // and base is "/" here, so the absolute /assets/... path resolves directly.
  htmlPreview: {
    head: '<script src="/assets/cm6-bundle.min.js"></script>',
  } as HtmlPreviewConfig | undefined,
  versions: false as VersionConfig[] | false,
  claudeResources: {
    claudeDir: ".claude",
  } as { claudeDir: string; projectRoot?: string; scanRoot?: string } | false,
  // The claude-resources plugin generates these categories at build time from
  // .claude/ + CLAUDE.md. At v4 the plugin also emits claude-agents /
  // claude-commands, so they are listed here too — all Claude content is
  // default-locale-only (no JA fallback routes).
  defaultLocaleOnlyPrefixes: [
    "/docs/claude/",
    "/docs/claude-md/",
    "/docs/claude-skills/",
    "/docs/claude-agents/",
    "/docs/claude-commands/",
  ] as string[],
  footer: {
    links: [],
    copyright: `Copyright © ${new Date().getFullYear()} <a href="https://x.com/Takazudo" rel="nofollow noreferrer noopener" target="_blank">Takazudo</a>. Built with <a href="https://zudo-doc.takazudomodular.com/" rel="nofollow noreferrer noopener" target="_blank">zudo-doc</a>. Enjoy synth on <a href="https://takazudomodular.com/" rel="nofollow noreferrer noopener" target="_blank">Takazudo Modular</a>.`,
  } satisfies FooterConfig as FooterConfig | false,
  headerNav: [
    { label: "Overview", path: "/docs/overview", categoryMatch: "overview" },
    { label: "Core", path: "/docs/core", categoryMatch: "core" },
    { label: "Vim Mode", path: "/docs/vim-mode", categoryMatch: "vim-mode" },
    { label: "Extensions", path: "/docs/extensions", categoryMatch: "extensions" },
    { label: "Recipes", path: "/docs/recipes", categoryMatch: "recipes" },
    { label: "Claude", path: "/docs/claude", categoryMatch: "claude" },
  ] satisfies HeaderNavItem[] as HeaderNavItem[],
  headerRightItems: [
    { type: "component", component: "github-link" },
    { type: "component", component: "theme-toggle" },
    { type: "component", component: "search" },
    { type: "component", component: "language-switcher" },
  ] satisfies HeaderRightItem[] as HeaderRightItem[],
  // Package-owned route injection (@takazudo/zudo-doc/plugins/routes): the v4
  // package supplies the 404 / sitemap / robots / tags / versions routes at
  // build time. The host still ships the doc catch-all stubs
  // (pages/docs/[[...slug]].tsx + the locale variant) because injected DYNAMIC
  // routes 404 in `zfb dev` — see the header comment in those files. Default is
  // true; kept explicit for clarity.
  packageOwnedRoutes: true,
};
