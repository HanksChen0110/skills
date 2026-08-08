# gx-zhks teal platform mapping

Use this file to translate the default teal route into concrete implementation rules.

## Cross-Stack Mapping

### Plain CSS

- Define all tokens in `:root`.
- Create local aliases only when needed, e.g. `--agent-bg: var(--page-alt)`.
- Prefer component classes over inline styles.
- If inline SVG is used, reference `var(--brand)` and semantic token names.

### Tailwind

- Map tokens to CSS variables first.
- Use arbitrary values only when they reference variables, e.g. `bg-[var(--card)]`, `text-[var(--text)]`.
- Avoid repeated hard-coded `#1ba2a0`; define the token in CSS and consume it.
- Tailwind v4 CSS-first projects should put variables in global CSS and map them through `@theme inline` where useful.

### React

- Put skin handling in a small bridge component or hook.
- Keep assistant state explicit: `open`, `mode`, `active`, `step`, `messages`, `history`, `context`.
- Include task lifecycle state: `idle`, `active`, `paused`, `resumable`, `completed`, `failed`.
- Persist harmless UI state locally only when it improves continuity.
- Do not store secrets, tokens, or sensitive business data in localStorage.

### Ant Design / shadcn / Component Libraries

- Map `colorPrimary` or primary variables to `--brand`.
- Override semantic status colors separately; do not derive them from primary.
- Button, Tag, Card, Table, Drawer, Modal, Input, and Tabs should consume the same token vocabulary.
- Do not let library defaults introduce blue, purple, or dark theme chrome.

## Product Identity Fixes

For existing React/Vite apps:

- Page title must match product identity.
- Favicon must not remain Vite/React default.
- App brand text and logo must match the page/product.
- Do not leave placeholder nav labels or generic `web` metadata.

## Reference Assets

- When domain imagery or project thumbnails are useful, inspect `G:\AI_products\gx_tkplatform\assets`.
- Reuse only assets that represent the actual mine, project, object, or business state required by the page.
- Treat these files as optional product references, not as token or layout authority.
- Verify provenance and usage rights before copying an asset into another deliverable.
- Do not replace inspectable mining content with generic stock imagery or decorative atmosphere.

## Verification Checklist

Run checks appropriate to the project:

- Grep for old primary hard-coding:
  - `#079B91`
  - `#1ba2a0` outside the token definition
  - `#1769D2`
  - legacy dark sidebar colors `#0b1320`, `#020617`
- Confirm `--brand` is the single brand-color source for the teal route.
- Confirm semantic colors remain fixed.
- Confirm no dark theme or dark full-screen dashboard was introduced.
- Confirm assistant/copy says candidate/draft/human confirmation where AI output affects business decisions.
- Confirm mobile at 320-390px:
  - no vertical Chinese button text,
  - composer remains usable,
  - assistant can close/reopen,
  - tables either stack or scroll intentionally.
- Confirm keyboard focus is visible.
- Measure rendered contrast: normal text at least `4.5:1`; large text and essential UI graphics at least `3:1`.
- Confirm `prefers-reduced-motion` disables nonessential animation.
- Confirm icon buttons have accessible names and drawers/modals trap and restore focus.
- Confirm AI submission remains disabled until the human-confirmation control is explicitly selected.

## Visual Verification Gate

For implemented frontend work using this skill:

1. Start the target project's normal preview or development server.
2. Use Playwright or the available browser tool to capture:
   - desktop `1440x900`,
   - mobile `390x844`,
   - narrow mobile `320x720` when dense tables, filters, or the assistant are present.
3. Inspect screenshots and browser console output. Do not treat a successful build as visual proof.
4. Verify stable layout dimensions, no overlap, no clipped Chinese text, intentional scrolling, and visible next-section/content cues where relevant.

Capture the applicable states:

1. top-of-page default state,
2. scrolled content state,
3. table/list dense state,
4. drawer/modal state,
5. AI assistant idle state,
6. AI assistant active conversation state,
7. composer focused state,
8. mobile width state.

For AI copilot pages also capture paused/resumable, failed/recovery, evidence drawer, and human-confirmation preview states.

Do not claim visual QA passed without fresh screenshots from the current implementation. If no runnable UI or browser is available, report the missing verification explicitly.

## Route Consistency

The default teal route must not load or copy the legacy route's dark-sidebar references. The legacy route may remain available, but it must be selected explicitly.
