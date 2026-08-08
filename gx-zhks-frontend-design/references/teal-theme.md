# gx-zhks teal mining theme

This is the default gx-zhks design route. It is based on the cross-stack design spec:

`G:\CHLobsidian\40_知识库\观想\开发知识与标准\设计规范 — 青绿矿山主题（跨技术栈通用 · 单主题）.md`

## Principles

1. Use one brand color source: `--brand`.
2. Default brand color is teal `#1ba2a0`.
3. All brand-related colors derive from `--brand`.
4. Status colors are semantic and fixed. Red, orange, yellow, and green do not change with theme.
5. Implementation must be token-driven. Do not scatter hard-coded primary hex values.
6. The theme is light only. Do not add dark mode.
7. Layout is product-specific. This skill defines tokens, component language, AI copilot behavior, and verification rules, not a mandatory page shell.
8. If embedded in another product, support runtime skinning by updating `--brand`.

## Required Tokens

Use these exact tokens or equivalent constants in non-CSS stacks.

```css
:root {
  --brand: #1ba2a0;
  --brand-light: color-mix(in srgb, var(--brand) 65%, white);
  --brand-dark: color-mix(in srgb, var(--brand) 72%, black);

  --page: #eef3f2;
  --page-alt: #f6f9f8;
  --card: #ffffff;
  --divider: #dde6e4;
  --text: #1f3a36;
  --text-secondary: #4a6b65;
  --text-muted: #8ca39d;

  --status-red: #e6524e;
  --status-orange: #f5a623;
  --status-yellow: #f5d423;
  --status-green: #2fbf71;

  --radius-sm: 0.30rem;
  --radius-md: 0.40rem;
  --radius: 0.50rem;
  --radius-lg: 0.50rem;
  --radius-xl: 0.70rem;
  --radius-2xl: 0.90rem;
  --radius-3xl: 1.10rem;
  --radius-4xl: 1.30rem;

  --card-spacing: 16px;

  --font-sans: system-ui, -apple-system, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  --font-heading: system-ui, -apple-system, "Segoe UI", Roboto, "PingFang SC", "Microsoft YaHei", sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;

  --primary: var(--brand);
  --primary-foreground: #ffffff;
  --accent: color-mix(in srgb, var(--brand) 10%, white);
  --ring: var(--brand);
  --chart-1: var(--brand);
  --chart-2: var(--brand-light);
  --chart-3: var(--status-green);
  --chart-4: var(--status-orange);
  --chart-5: var(--status-red);
}
```

If the stack does not support `color-mix`, precompute:

| Skin | `--brand` | `--brand-light` | `--brand-dark` | `--accent` |
|---|---:|---:|---:|---:|
| Teal | `#1ba2a0` | `#6bc3c1` | `#137573` | `#e3f3f0` |
| Blue | `#4588e3` | `#86b2ed` | `#3262a3` | `#e9f0fb` |

## Typography

- Use `--font-sans` for product UI.
- Use `--font-heading` for section titles, card titles, panel headers, and AI message titles.
- Use `--font-mono` for IDs, codes, coordinates, versions, and data identifiers.
- Section title: `14px`, bold.
- Card title: `16px`, compact variant `14px`.
- Body: `14px`.
- Secondary / summary: `11.5px`.
- Status tag: `11px`.
- Letter spacing is `0`. Do not use negative tracking.

## Color Rules

- Page background: `--page`.
- Secondary panel background: `--page-alt`.
- Cards, dialogs, drawers, and assistant panels: `--card`.
- Borders and dividers: `--divider`.
- Primary action: `--brand` background, white text.
- Secondary action: white background, `--divider` border, text color.
- Brand tag: `--accent` background, `--brand` or `--brand-dark` text.
- Status tag: semantic color at 10% background plus semantic text color.
- Danger, overdue, blocking, error, and destructive states must use `--status-red`, not `--brand`.

## Theming Protocol

When embedded in a host app, listen for:

```js
{ type: "apitable_theme", apitable_theme: "themeBlue" }
{ type: "apitable_theme", apitable_theme: "themeGreen" }
```

Map values exactly:

| `apitable_theme` | `--brand` | `data-skin` |
|---|---:|---|
| `themeBlue` | `#4588e3` | `blue` |
| `themeGreen` | `#1ba2a0` | `teal` |
| unknown / missing | `#1ba2a0` | `teal` |

Also support legacy:

```js
{ type: "SKIN_CHANGE", primary: "#4588e3", skin: "blue" }
```

Implementation:

```js
document.documentElement.style.setProperty("--brand", hex);
document.documentElement.setAttribute("data-skin", skin);
```

When embedded, send these exact handshake payloads:

```js
{ source: "mining-dashboard", type: "READY" }
{ source: "mining-dashboard", type: "REQUEST_SKIN" }
```

Security:

- Validate hex format.
- Validate `event.origin` against same-origin, referrer origin, or a configured allowlist.
- Send `READY` and `REQUEST_SKIN` only when embedded.

## Accessibility Override

Keep the canonical tokens unchanged, then verify their actual combinations in the rendered UI.

- Normal text must meet WCAG AA `4.5:1`; large text and essential UI graphics must meet `3:1`.
- If white text on `--brand` fails for the rendered size and weight, use `--brand-dark` for the filled action or use a light `--accent` action with dark text. Do not invent a second brand hue.
- If semantic-colored text on a 10% semantic background fails, keep the semantic border/icon and use a contrast-safe dark foreground derived from the same semantic color.
- Never claim accessibility from token names alone. Measure the rendered foreground/background pair.

## Do Not

- Do not add a dark theme.
- Do not use multiple theme files for brand skins.
- Do not use hard-coded primary hex values in component styles.
- Do not use brand color for risk or failure.
- Do not force a single layout shape across products.
- Do not introduce heavy chart libraries for miniature charts; use inline SVG with tokens.
