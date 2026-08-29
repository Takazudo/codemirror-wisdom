# zudo-codemirror-wisdom

Takazudo's personal CodeMirror 6 development notes, built with zudo-doc (zfb stack, MDX, Tailwind CSS v4).

**Live site**: <https://zudo-codemirror-wisdom.takazudomodular.com/>

## Commands

```bash
pnpm dev              # Start zfb dev server (port 4321)
pnpm build            # Build: cm6 bundle + zfb build
pnpm build:cm6        # Rebuild CodeMirror IIFE bundle
pnpm preview          # Preview built site
pnpm check            # zfb type checking
pnpm format:md        # Format MDX files
pnpm b4push           # Pre-push validation (cm6 bundle + format + typecheck + build)
pnpm setup:doc-skill  # Generate codemirror-wisdom skill + symlink all skills
```

## Project Layout

```
pages/          # Host-app routing layer (zfb entry points)
src/
  components/   # Shared UI components
  content/      # MDX doc pages (docs/ + docs-ja/)
  utils/        # Shared utilities
plugins/        # zfb integration plugins (.mjs)
zfb.config.ts   # Site and build config
```

## Topics

- **Overview** — Installation, quick reference
- **Core** — EditorState, EditorView, Transaction, Extension system, key bindings
- **Vim Mode** — @replit/codemirror-vim setup, commands, Ex commands, clipboard, vimrc
- **Extensions** — Built-in, language support, themes, search, custom extensions, compartments
- **Recipes** — React integration, markdown editor, Tauri/WebView, performance
- **Claude** — Claude Code integration docs

## CM6 Bundle

The pre-built IIFE bundle at `public/assets/cm6-bundle.min.js` exposes `window.CM` in every HtmlPreview iframe, enabling live CodeMirror demos in the docs.

Rebuild with `pnpm build:cm6` (entry: `scripts/cm6-bundle-entry.ts`). The bundle is injected via `htmlPreview.head` in `zfb.config.ts`.

## Hosting & CI/CD

- **Hosting**: Cloudflare Workers static assets (not Pages)
- **PR checks**: typecheck + build + Workers preview (`*.workers.dev` URL posted as PR comment)
- **Main deploy**: build → `wrangler deploy` → Workers production + IFTTT notification
- **Secrets**: `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_API_TOKEN`, `IFTTT_PROD_NOTIFY`

## License

MIT
