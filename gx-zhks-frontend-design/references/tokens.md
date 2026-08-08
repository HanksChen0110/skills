# gx-zhks frontend tokens

Observed source: 智慧矿山智能体平台 main page only.

## Typography

- Font stack: `Inter, PingFang SC, Microsoft YaHei, Helvetica Neue, Arial, sans-serif`
- Body size: 14-16px
- Section title: 18px, weight 600, color `#020617`
- Card title: 16px, weight 600, color `#020617`
- Hero title desktop: 52-60px, weight 600, tight but not negative tracking
- Hero title mobile: 40-44px, weight 600, allow 2 lines
- Muted body: `#64748b`
- Secondary text: `#475569`

## Colors

### Shell

- Sidebar background: `#0b1320`
- Sidebar deeper: `#020617`
- Sidebar top wash: `rgba(36, 119, 230, .28)`
- Sidebar text: `#c8d4e6`
- Sidebar muted: `#9ca3af`
- Active nav background: `rgba(34, 211, 238, 0.10)`
- Active nav border/ring: `rgba(103, 232, 249, 0.20)`
- Sidebar divider: `rgba(255, 255, 255, 0.10)`

### Workspace

- Page background: `#eef3f8`
- Hero surface: `rgba(239, 248, 255, 0.95)`
- Card surface: `rgba(255, 255, 255, 0.95)`
- Pale cyan surface: `#ecfeff`
- Border subtle: `#e2e8f0`
- Border cyan: `rgba(165, 243, 252, 0.65)`
- Text primary: `#020617`
- Text secondary: `#475569`
- Text muted: `#64748b`
- Placeholder: `#94a3af`

### Brand and Accents

- Navy text: `#020617`
- Mine blue: `#1d62cf`
- Bright blue: `#3b82f6`
- Cyan: `#22d3ee`
- Cyan light: `#67e8f9`
- Teal: `#2dd4bf`
- Success: `#10b981`
- Warning: `#f59e0b`
- Orange accent: `#fb923c`
- Purple accent only for PPT-like capability cards: `#8b5cf6`

## Gradients And Grid

- Sidebar gradient: `linear-gradient(180deg, rgba(36,119,230,.28), rgba(11,19,32,0) 34%), linear-gradient(180deg, #0b1320, #020617)`
- Hero title: `linear-gradient(90deg, #020617, #1d62cf 58%, #22d3ee)`
- Workspace wash: `linear-gradient(180deg, rgba(239,248,255,.95), rgba(244,247,251,.98) 34%, #eef3f8)`
- Workspace diagonal wash: `linear-gradient(120deg, rgba(36,119,230,.08), transparent 38%, rgba(20,184,166,.07) 72%, transparent)`
- Page grid lines: `linear-gradient(rgba(15,23,42,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,.04) 1px, transparent 1px)`
- Page grid size: `28px 28px`
- Page grid mask: `linear-gradient(180deg, rgba(0,0,0,.75), transparent 72%)`
- Hero panel grid wash: `linear-gradient(135deg, rgba(36,119,230,.12), transparent 38%), linear-gradient(225deg, rgba(14,165,233,.12), transparent 42%)`
- Hero vertical grid: `repeating-linear-gradient(90deg, rgba(14,165,233,.06) 0 1px, transparent 1px 72px)`
- Hero inner frame: width `min(78%, 860px)`, height `62%`, radius `28px`, border `rgba(14,165,233,.16)`, glow `0 0 70px rgba(14,165,233,.08)`

## Spacing

- Desktop sidebar width: 256px
- Main content max width: 1120px
- Business page max width: 1180-1240px when tables or split panes need more room
- Page padding: 32px desktop, 20px tablet, 16px mobile
- Section gap: 18-28px
- Card padding: 16-20px
- Compact card gap: 12px
- Button height: 36-44px
- Prompt action height: 48px
- Table row height: 52-60px
- Filter/input height: 38-42px

## Radius

- Nav item: 10px
- Prompt bar: 16px
- Prompt inner input: 12px
- Capability card: 12px
- Agent card: 12px
- Dense business card/table shell: 8-12px
- Hero panel: 28px
- Icon tile: 10px
- Status pill: 999px

Observed CSS also contains `.375rem`, `.5rem`, `.75rem`, `1rem`, `1.5rem`, `28px`, `999px`, and `9999px`. Use these as the radius scale, but keep dense business pages at 8-12px.

## Elevation

- Small card shadow: `0 14px 44px rgba(15, 23, 42, .06)`
- Normal card shadow: `0 18px 55px rgba(15, 23, 42, .07)`
- Hero/container shadow: `0 24px 80px rgba(15, 23, 42, .08)`
- Prompt bar shadow: `0 26px 70px rgba(29, 98, 207, .16)`
- Dark button shadow: `0 12px 28px rgba(15, 23, 42, .22)`
- Strong overlay shadow: `0 30px 90px rgba(15, 23, 42, .25)`
- Logo glow: `0 0 28px rgba(34, 211, 238, .18)`
- Glow boundary: `inset 0 0 0 1px rgba(255,255,255,.5), 0 0 70px rgba(14,165,233,.08)`
- Do not use heavy black modal shadows on normal cards.

## Iconography

- Use exactly one icon kit: Tabler Icons.
- Match profile: regular 1.5-2px outline, geometric, technical, broad business coverage.
- Use icons inside rounded square tiles with cyan, blue, teal, purple, or orange fills depending on capability type.
- If Tabler is unavailable, use the local line-icon fallback from `references/platform-mapping.md` rather than mixing another icon set.

## Motion

- Keep motion quiet: 120-180ms ease for hover and focus.
- Hover cards use `translateY(-2px)`, increase cyan border contrast, and reveal a soft pseudo-element glow.
- Avoid looping animations except a very subtle glow on hero panels.