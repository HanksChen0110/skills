# gx-zhks frontend components

Use these components to redesign smart-mine agent pages into the main platform language.

## App Shell

- Desktop layout: fixed dark sidebar on the left, light grid workspace on the right. The sidebar stays fixed while long right-side pages scroll.
- Sidebar background: layered gradient, `linear-gradient(180deg, rgba(36,119,230,.28), rgba(11,19,32,0) 34%), linear-gradient(180deg, #0b1320, #020617)`.
- Sidebar logo: rounded cyan outline icon tile plus two-line brand text, with a faint cyan glow.
- Sidebar sections: brand/logo area, primary nav, 最近使用, 最近对话, footer status.
- Active nav: translucent cyan background, white text, 1px cyan ring.
- Inactive nav: muted blue-gray text, no border, cyan hover tint.
- Footer line: `知识库驱动 · 本地生成 · 真实导出`.
- In Ant Design apps, set both `Sider` and `Menu` to dark theme. A dark `Sider` with a light `Menu` creates a broken white block and poor contrast.
- Do not position the footer absolutely inside a scrolling shell. Use a flex column sidebar with footer `margin-top: auto`.
- For desktop fixed sidebar implementations, offset the main layout with the exact sidebar width. Re-test after scrolling a long page, not only at the top of the page.

## Hero Stage

- Large rounded rectangle with pale blue gradient and vertical grid lines.
- Compose three layers: workspace 28px grid, hero panel blue/cyan 72px vertical grid, and centered inner glass frame.
- Inner panel: lighter translucent surface with cyan border and faint glow; use `hero-panel::after` when the page needs the main platform hero.
- Hero title: navy-to-cyan gradient text, centered.
- Subtitle: 15-16px slate text.
- Prompt bar: thick white shell, 16px radius, light cyan outer ring, inset white input, dark embedded primary action button.
- Mobile: title wraps to two lines; prompt action can become a compact second row if space is tight, but button text stays horizontal.
- For data-dense business tools, shrink the hero into a compact status band: 8-12px radius, restrained shadow, operational copy, and one clear action.

## Capability Shortcut Cards

- Four cards in desktop row; single column on mobile.
- White card, 12px radius, soft shadow, no nested card.
- Interactive cards use `translateY(-2px)` on hover, cyan border lift, and a subtle `::before` glow.
- Icon tile at left with colored background:
  - 智能评审: blue
  - AI 写作: teal
  - PPT 生成: purple
  - 知识库: orange
- Text hierarchy: 16px semibold title, 13px muted description.
- Right chevron is small and pale.

## Agent Entry Cards

- Cards use white surface, 12px radius, subtle border, 16-20px padding.
- Interactive agent cards follow the same hover: `translateY(-2px)`, cyan border lift, soft pseudo-element glow.
- Header row: icon tile, title, small category line, status chip.
- Status chips:
  - 已配置: pale green background, green text.
  - 未配置: pale amber background, amber text.
- Body: one sentence description, max two lines.
- Tags: small rounded rectangles with pale slate background and border.
- Primary action: full-width dark navy button, 36px height, 8px radius, white text, arrow icon.
- Do not copy each sub-agent page's own UI; every agent card should inherit this platform format.

## Panels and Sections

- Section title: 18px semibold black/navy.
- Section helper text: muted slate, 14px.
- Header actions: compact white button with border and chevron.
- Use horizontal divider lines sparingly; prefer whitespace and card grouping.

## Status and Risk Patterns

- Risk warning uses amber, but only as a chip or small callout.
- Success uses green for configured and completed states.
- Error/danger should be restrained; use red only for actual failure.
- Never make risk cards dominate the palette. The primary identity remains blue/cyan.

## Inputs

- Search or prompt inputs are large white surfaces with pale border.
- Prompt/command inputs use a tactile shell: outer white container, cyan ring, inset white input, and dark embedded button.
- Placeholder text is `#94a3af`.
- Focus ring uses pale cyan or bright blue.
- Place the primary action inside the prompt bar when the task is command-like.
- Ordinary filters remain compact 38-42px controls; do not apply the full prompt-bar treatment to every form field.

## Tables and Lists

- Use tables inside a white card with 12px radius and a light border.
- Header row: pale blue-gray background, 13px semibold slate text, 44px height.
- Body row: 52-60px height, 1px `#e2e8f0` separator, hover `#eff8ff`.
- Primary identifiers use navy 14px semibold text; metadata uses `#64748b`.
- Operation buttons stay compact: text button or 32-36px dark primary button.
- On mobile, convert tables into stacked record cards; do not force horizontal scroll unless the table is truly wide and data comparison is required.

## Forms and Filters

- Filters live in a compact white toolbar above tables.
- Inputs, selects, and date fields use 38-42px height, 8px radius, `#e2e8f0` border, white background.
- Use labels only when the field meaning is not obvious from context; keep labels 12-13px and slate.
- Primary submit button is dark navy; secondary actions are white border buttons.
- Toggle and switch controls use cyan active state, not green, unless the toggle means success/completion.

## Upload and Attachment Areas

- Upload zones are white or very pale cyan panels with dashed cyan border.
- Include file name, type, and current processing state in a compact row after upload.
- Empty upload copy should be operational: "上传材料 / 支持 PDF、DOCX、图片", not marketing copy.
- Do not use oversized drag-and-drop illustrations.

## Chat and Command Panels

- Chat pages keep the same shell but use a two-column workspace: conversation on the left, context/material panel on the right.
- User and assistant messages are white cards with subtle borders; assistant cards can use pale cyan top accent.
- The input composer is a tactile white `.prompt-bar` with cyan ring, inset input, and embedded dark send button.
- Show attached materials as tags or compact rows, not as nested cards.

## Detail Drawers and Overlays

- Detail drawers slide from the right on desktop and become full-width sheets on mobile.
- Drawer width: 380-460px desktop.
- Drawer surface: `#ffffff`, 12-16px radius if floating, 1px border.
- Header contains title, status chip, and one close icon button.
- Keep destructive or publish actions out of drawers unless the user explicitly asks.

## Responsive Rules

- Keep stable card dimensions and predictable grid tracks.
- Do not let long Chinese titles overflow icon rows; use wrap or `min-width: 0`.
- Mobile can keep a left rail if the host app already uses one, but the content must remain readable with a minimum 320px content column.
- No text overlap, especially in hero title, prompt bar, and primary buttons.
- Mobile primary buttons must keep horizontal text. Use at least 96px width for compact action buttons.
- Card headers collapse from three columns to two rows when title + status chip cannot fit.
- Long Chinese titles wrap at phrase boundaries; never rely on character-by-character vertical stacking.
- For flex hero/content rows, set `min-width: 0` on text containers so long Chinese copy wraps instead of pushing outside the card.