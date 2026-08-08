# gx-zhks teal components

Use these component rules for the default `teal-mining` route.

## App Surface

- Use a light operational workspace: `--page` and `--page-alt`.
- Navigation can be top, left, rail, or host-provided. This theme does not require the legacy dark sidebar.
- If a rail exists, keep it pale and quiet: rail `--page-alt` or a slightly tinted teal surface, active item `--card`, active text `--brand` or `--brand-dark`.
- Main work areas should be dense but readable. Prefer tables, split panes, drawers, and right-side assistant panels over decorative card mosaics.
- Keep scroll ownership clear: fixed top bars, fixed rails, scrollable content panes, and assistant scroll areas must not fight each other.

## Cards

- Card surface: `--card`.
- Radius: `--radius-xl`. Use smaller radii for controls inside cards, not for the card itself.
- Border: `1px` foreground at 10% opacity. Map this to a semantic border token when the stack cannot express alpha reliably.
- Padding: `--card-spacing` (`16px`), compact variant `12px`.
- Shadow: none by default. If product hierarchy requires one, define a product-local semantic shadow token instead of scattering a hard-coded value.
- Optional top or left accent is allowed only when it carries meaning. Avoid decorative colored strips.

## Buttons

- Primary: `background: var(--brand)`, white text, radius `--radius-md`, compact height `32-38px` for business pages.
- Primary hover: `var(--brand-dark)`.
- Secondary: white background, `--divider` border, `--text-secondary`.
- Ghost/icon: transparent background, muted icon, hover `--accent`.
- Destructive: white or pale red background, `--status-red` text/border.
- Disabled: preserve the button footprint, use muted foreground and surface, remove elevation, and expose the disabled state semantically.
- Loading: keep width stable, retain the action label, add an inline progress indicator, and prevent duplicate submission.
- Pressed / selected: use `aria-pressed` where applicable and a visible token-driven selected state.
- Focus: show a visible `--ring` outline that is not removed on keyboard interaction.
- Buttons must keep Chinese text horizontal on mobile. Wrap the row, not individual characters.

## Tags, Badges, and Status Chips

- Badge: inline pill or small rounded rectangle, `11-12px`.
- Brand badge: `--accent` background, `--brand` text.
- Warning badge: orange 10% background, orange text.
- Danger badge: red 10% background, red text.
- Success badge: green 10% background, green text.
- Status chip copy should be business-state language: `待复核`, `限制使用`, `已确认`, `候选`, `需补充`, not abstract labels.

## Tables and Lists

- Tables sit in white surfaces with thin borders and small radius.
- Header row: `--page-alt` background, muted text, `11-13px`.
- Body row: `52-60px` for full tables, `36-44px` for compact assistant tables.
- Hover: `--page-alt` or `--accent` only when row is clickable.
- Mobile: convert dense tables into stacked record cards unless horizontal comparison is essential.

## Forms and Filters

- Filter bars are compact, white, and close to the table or list they filter.
- Inputs/selects: `38-42px` height, radius `--radius-md`, `--divider` border.
- Labels must remain visible when fields contain text. Do not use placeholder-only labels.
- Use amber callouts for "will affect" warnings; avoid modal interruptions unless the action writes business state.

## Drawers and Modals

- Detail drawers open from the right on desktop and become full-width sheets on mobile.
- Drawer width: `380-460px`.
- Surface: white, subtle border, restrained shadow.
- Header: title, object state, close icon.
- Write actions inside drawers require explicit confirmation when they affect business data.

## Data Visualization

- Mini charts should use inline SVG.
- Main chart colors:
  - primary: `var(--brand)`
  - secondary: `var(--brand-light)`
  - success: `var(--status-green)`
  - warning: `var(--status-orange)`
  - danger: `var(--status-red)`
- Warning sparklines and warning donut segments use `var(--status-orange)`.
- Completed bars use `var(--brand)`; incomplete bars use `var(--brand-light)` or a neutral token.
- Inline SVG must not hard-code the brand hex.

## Business Page Patterns

### Workbench / Dashboard

- Header focuses on scope, selected project, role, and current operational status.
- Use 3-4 metrics only when they drive action.
- Pair metrics with the list/table they filter.
- Avoid full-page KPI mosaics.

### Review / Approval

- Top strip: current object, state chip, one primary action.
- Main area: evidence/source list, issue list, detail/preview, confirmation boundary.
- Every finding should show location, reason, evidence, and suggested action.

### File / Knowledge Workspace

- Upload area is compact, not illustrative.
- Files show type, source, update time, state, and next action.
- Empty state includes a useful first action and supported file types.

### AI / Copilot Page

- Load `ai-copilot-pattern.md`.
- Keep AI as an assistant surface that augments business work, not a wizard that hijacks the app.

## Responsive Rules

- Use `min-width: 0` in flex/grid text containers so Chinese titles wrap correctly.
- Touch targets: at least `44px` when primary on mobile; compact desktop icon buttons can be smaller.
- Assistant right panel becomes full-width or bottom-sheet on mobile.
- Long Chinese titles wrap by phrase. Never allow vertical character stacking.
- Verify top state, scrolled state, drawer state, assistant composer, and mobile width.

## Interaction Accessibility

- Give every icon-only button an accessible name and tooltip.
- Expose expanded/collapsed state with `aria-expanded` and link controls to their regions.
- Drawers and modals use dialog semantics, trap focus while open, close on `Escape`, and restore focus to the opener.
- Toasts use an appropriate live region; progress/thinking updates must not repeatedly interrupt screen readers.
- Keep all primary flows operable by keyboard without relying on hover.
