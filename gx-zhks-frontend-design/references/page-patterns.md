# gx-zhks business page patterns

Use these patterns when applying the platform style to non-homepage business screens. The goal is to keep workflows intact while replacing the visual system.

## 1. Chat or Copilot Page

Use for intelligent Q&A, document interpretation, and workflow assistance.

- Shell: dark fixed gradient sidebar + light grid workspace.
- Main area: two columns on desktop.
- Left column: conversation stream with assistant/user message cards.
- Right column: context panel for attachments, selected knowledge, rules, and recent outputs.
- Bottom composer: tactile white `.prompt-bar` with cyan ring, inset input, and embedded dark send button.
- Mobile: stack context panel below conversation; composer remains horizontal.

## 2. Review or Approval Page

Use for material review, audit, approval, and issue localization.

- Top strip: page title, current object, status chip, primary action.
- For SkillNet/review queues, a compact hero/status band can replace the top strip, but it must stay task-oriented: title, one operational sentence, and one action. Use the craft layer lightly: subtle grid wash and restrained shadow, not a homepage-scale hero.
- First row: upload/source card + review rule card.
- Main row: issue list or table + detail drawer/card.
- Findings use restrained severity chips: cyan for info, amber for risk, red only for blocking failure.
- Every finding should have a location, reason, and suggested action.
- Do not use landing-page hero treatment on review queues. Keep shadows subtle, radius 8-12px, and table readability higher priority than decorative gradients.

## 3. Monitoring or Risk Page

Use for dashboards, devices, safety, emergency, and operational status.

- Hero becomes a compact status band, not a marketing hero.
- Use 3-4 metric cards above the main table.
- Main table/list shows entity, status, owner, latest signal, and operation.
- Right column can hold "风险解释" or "处置建议" cards.
- Do not make the whole page dark; only the shell is dark.

## 4. Form or Configuration Page

Use for rules, templates, scenario setup, and parameter configuration.

- Use a white settings card with section dividers.
- Group fields by business meaning, not by raw database schema.
- Keep advanced settings collapsed or placed in a right-side panel.
- Save button is dark navy; draft/test buttons are white border buttons.
- Show "will affect" warnings as amber callouts, not modal interruptions.

## 5. File Workspace Page

Use for uploads, knowledge base, generated files, and export workflows.

- Left/top: upload or source selection card.
- Middle: file list/table with type, source, updated time, and state chip.
- Right/bottom: preview or extracted summary panel.
- Empty state uses a pale cyan dashed upload area.
- Generated outputs use compact rows with export buttons.

## Business Page Conversion Rules

- Preserve workflow, fields, and action semantics from the original page.
- Replace visual wrappers, cards, buttons, tags, tables, and empty states with this platform language.
- If the original page uses Element Plus or generic admin styling, treat it as implementation detail, not design direction.
- If data is dense, reduce decoration before reducing information.
- Always produce visual QA for top page, scrolled long page, input close-up, card hover state, and mobile width.