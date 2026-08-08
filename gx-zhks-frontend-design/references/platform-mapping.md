# gx-zhks platform mapping

## HTML/CSS

Before styling the page, remove starter identity assets:

```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<title>智能审核智能体</title>
```

Use a product-specific favicon, for example a dark navy audit/shield/check mark SVG. Do not leave Vite, React, generic `web`, or purple lightning assets in place.

Load fonts with system fallbacks:

```css
body {
  font-family: Inter, "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif;
}
```

Optional Tabler Icons:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.41.1/dist/tabler-icons.min.css">
```

If the CDN cannot load, use a local line-icon fallback instead of mixing icon libraries:

```css
.ti {
  width: 1.1em;
  height: 1.1em;
  display: inline-grid;
  place-items: center;
  line-height: 1;
  flex: none;
}

.ti::before {
  content: "";
  width: .86em;
  height: .86em;
  display: block;
  border: 1.8px solid currentColor;
  border-radius: .24em;
}

.ti-chevron-right::before,
.ti-send::before {
  width: .52em;
  height: .52em;
  border-left: 0;
  border-bottom: 0;
  border-radius: 0;
  transform: rotate(45deg);
}
```

Set CSS variables first:

```css
:root {
  --gx-sidebar: #0b1320;
  --gx-page: #eef3f8;
  --gx-card: rgba(255,255,255,.95);
  --gx-navy: #020617;
  --gx-blue: #1d62cf;
  --gx-cyan: #22d3ee;
  --gx-muted: #64748b;
  --gx-border: #e2e8f0;
  --gx-radius-card: 12px;
  --gx-radius-hero: 28px;
  --gx-shadow-card: 0 18px 55px rgba(15, 23, 42, .07);
  --gx-shadow-small: 0 14px 44px rgba(15, 23, 42, .06);
  --gx-shadow-hero: 0 24px 80px rgba(15, 23, 42, .08);
  --gx-shadow-prompt: 0 26px 70px rgba(29, 98, 207, .16);
  --gx-shadow-button: 0 12px 28px rgba(15, 23, 42, .22);
  --gx-grid-page: linear-gradient(rgba(15,23,42,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,.04) 1px, transparent 1px);
  --gx-grid-hero: repeating-linear-gradient(90deg, rgba(14,165,233,.06) 0 1px, transparent 1px 72px);
}
```

Apply the main platform craft layer before composing components:

```css
.app-surface {
  min-height: 100vh;
  position: relative;
  background:
    linear-gradient(180deg, rgba(239, 248, 255, .95), rgba(244, 247, 251, .98) 34%, #eef3f8),
    linear-gradient(120deg, rgba(36, 119, 230, .08), transparent 38%, rgba(20, 184, 166, .07) 72%, transparent);
}

.app-surface::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  background-image: var(--gx-grid-page);
  background-size: 28px 28px;
  -webkit-mask-image: linear-gradient(180deg, rgba(0, 0, 0, .75), transparent 72%);
  mask-image: linear-gradient(180deg, rgba(0, 0, 0, .75), transparent 72%);
}

.hero-panel {
  position: relative;
  overflow: hidden;
  border-radius: 28px;
  border: 1px solid rgba(165, 243, 252, .65);
  background: rgba(239, 248, 255, .95);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .55), var(--gx-shadow-hero);
}

.hero-panel::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(135deg, rgba(36, 119, 230, .12), transparent 38%),
    linear-gradient(225deg, rgba(14, 165, 233, .12), transparent 42%),
    var(--gx-grid-hero);
}

.hero-panel::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: min(78%, 860px);
  height: 62%;
  transform: translate(-50%, -50%);
  border: 1px solid rgba(14, 165, 233, .16);
  border-radius: 28px;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.50), 0 0 70px rgba(14,165,233,.08);
}

.hero-panel > * {
  position: relative;
  z-index: 1;
}

.tech-card {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(226, 232, 240, .85);
  background: rgba(255, 255, 255, .95);
  box-shadow: var(--gx-shadow-card);
  transition: transform .18s ease, border-color .18s ease, box-shadow .18s ease;
}

.tech-card::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  background: linear-gradient(135deg, rgba(34, 211, 238, .08), transparent 42%);
  transition: opacity .18s ease;
}

.tech-card:hover {
  transform: translateY(-2px);
  border-color: rgba(103, 232, 249, .58);
  box-shadow: var(--gx-shadow-hero);
}

.tech-card:hover::before {
  opacity: 1;
}

.prompt-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  border-radius: 16px;
  border: 1px solid rgba(165, 243, 252, .80);
  background: rgba(255, 255, 255, .92);
  box-shadow: var(--gx-shadow-prompt), inset 0 0 0 1px rgba(255, 255, 255, .72);
}
```

Use a two-zone app layout. For plain CSS/grid apps:

```css
.app {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 256px minmax(0, 1fr);
  background: var(--gx-page);
}
```

For Ant Design `Layout + Sider`, do not rely on `position: sticky`. Make desktop navigation fixed and override Ant's flex width behavior:

```css
:root {
  --gx-sidebar-width: 256px;
}

.app-shell {
  display: block;
  min-height: 100vh;
  background: var(--gx-page);
}

.app-sider {
  position: fixed !important;
  inset: 0 auto 0 0;
  width: var(--gx-sidebar-width) !important;
  min-width: var(--gx-sidebar-width) !important;
  max-width: var(--gx-sidebar-width) !important;
  height: 100dvh;
  overflow: hidden;
  z-index: 20;
  background:
    linear-gradient(180deg, rgba(36, 119, 230, .28), rgba(11, 19, 32, 0) 34%),
    linear-gradient(180deg, #0b1320, #020617);
}

.app-sider .ant-layout-sider-children {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}

.app-main {
  width: calc(100% - var(--gx-sidebar-width)) !important;
  margin-left: var(--gx-sidebar-width);
  flex: none !important;
}

@media (max-width: 960px) {
  .app-sider {
    position: relative !important;
    width: 100% !important;
    min-width: 0 !important;
    max-width: none !important;
    height: auto;
    overflow: visible;
  }

  .app-main {
    width: 100% !important;
    margin-left: 0;
  }
}
```

Why this matters: Ant Design applies `width: 0` to nested layouts under `ant-layout-has-sider` for flex behavior. If the sidebar is fixed, that default can collapse the main area unless `.app-main` explicitly restores width and disables flex shrinking.

## React/Tailwind

Map tokens to Tailwind classes without inventing a new palette:

- Sidebar: `bg-[#0b1320] text-[#c8d4e6]`
- Page: `bg-[#eef3f8]`
- Cards: `rounded-xl border border-slate-200/80 bg-white/95 shadow-[0_18px_55px_rgba(15,23,42,.07)] hover:-translate-y-0.5 hover:border-cyan-300/60`
- Hero: `rounded-[28px] border border-cyan-100/80 bg-[linear-gradient(...)] shadow-[0_24px_80px_rgba(15,23,42,.08)]`
- Active nav: `bg-cyan-400/10 text-white ring-1 ring-cyan-300/20`
- Primary button: `bg-[#020617] text-white hover:bg-[#0b1320]`
- Prompt bar: `rounded-2xl border border-cyan-200/80 bg-white/90 shadow-[0_26px_70px_rgba(29,98,207,.16)]`

## Applying to Existing Agent Pages

When redesigning a sub-agent page:

1. Keep the page's business workflow and data contract unchanged.
2. Replace visual shell, spacing, cards, tags, buttons, and status treatment with this skill.
3. Do not borrow colors or component styles from that sub-agent's current page.
4. Keep dense business information, but wrap it in the platform's white card system.
5. Validate against the main platform screenshot, not against the original sub-agent page.

## Verification Checklist

Run this checklist before considering a generated page done:

- Browser tab title is product-specific, for example `智能审核智能体`, not `web`.
- Favicon is product-specific and does not use Vite/React/default framework assets.
- It looks like the 智慧矿山智能体平台 main page, not like a sub-agent legacy page.
- Desktop uses dark shell + light workspace.
- Page uses `.app-surface::before` or equivalent fixed 28px grid with a downward mask.
- Hero/status panel uses `.hero-panel::before` for blue/cyan grid wash when the page has a hero.
- Prompt/command input uses `.prompt-bar` with tactile white shell, cyan ring, inset input, and dark embedded button.
- Interactive cards use `.tech-card` hover or equivalent `translateY(-2px)` plus cyan border/glow.
- On long desktop pages, scroll down and confirm the left sidebar remains fixed from top to bottom and all navigation items are still clickable.
- In Ant Design apps, verify `.app-sider` is `position: fixed` and `.app-main` has non-zero width after scrolling.
- Screenshot QA includes: top page, scrolled long page, input close-up, and card hover state.
- Mobile has no horizontal overflow at 390px.
- Button text remains horizontal; no Chinese character vertical stacking.
- Status colors do not overpower blue/cyan as the primary identity.
- Tables become readable stacked cards on mobile, or have an intentional scroll container.
- Only one icon system is used; fallback icons are local line icons.
- No `.env`, backend endpoint, token, or production publishing dependency is introduced.