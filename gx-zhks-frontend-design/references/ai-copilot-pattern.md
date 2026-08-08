# gx-zhks AI copilot pattern

Use this file when a page includes AI assistant, copilot, agent, chat, workflow analysis, recommendations, or human confirmation.

Reference behavior:

- `G:\AI_products\gx_tkplatform\kcfx`
- Relevant files: `src/main.jsx`, `src/styles.css`, `README.md`

The `kcfx` implementation is an interaction reference under either design route. The visual rules in this file apply only to `teal-mining`. Under `legacy-dark-platform`, keep the conversation, evidence, state, and human-review behavior but use the legacy route's visual tokens.

## Core Model

The AI assistant is one persistent conversation surface.

- Compact mode: fixed right-side panel, about `390px` wide on desktop.
- Full mode: same assistant becomes full-screen. Do not create a separate full-screen wizard with different information ownership.
- Closed mode: a small floating action button can reopen the assistant.
- The business page remains visible behind or beside the assistant when desktop space allows.
- Active tasks can be paused and resumed without losing messages, context, selected route, or completed-step summaries.
- A completed task remains available for evidence review and follow-up questions.

## Required Regions

1. Header
   - Agent avatar / icon.
   - Agent name.
   - Current task/project subtitle.
   - History button.
   - Compact/full toggle.
   - Close button.

2. Context bar
   - Collapsed by default after a task starts.
   - Shows current project, scope, data strategy, or active object.
   - Expandable detail view with 2-column facts.
   - Includes `查看完整上下文` or equivalent action.

3. Conversation stream
   - User request bubble.
   - Assistant messages with avatar, metadata, status tag.
   - Completed analysis steps collapse into summary cards.
   - Current step expands with evidence, tables, warnings, or candidate outputs.
   - Free-form user follow-up is appended as a new message and records its impact scope.

4. Suggestion actions
   - Primary recommendation button first.
   - 2-3 alternative suggestion buttons.
   - Buttons use business phrases, not `上一步 / 下一步`.
   - Suggestions advance or refine analysis; they do not silently write official data.

5. Composer
   - Bottom-fixed inside the assistant.
   - Textarea supports `Enter` to send and `Shift+Enter` for newline.
   - `+` or attachment button is allowed.
   - Send button uses `--brand`.
   - Helper text explains whether input starts a task or updates current context.

6. Drawer / detail surface
   - Use a right drawer for history, complete evidence, or modify-current-step.
   - Saves create a new analysis/process version; they do not mutate source data silently.

7. Toast / lightweight feedback
   - Use compact toast for non-blocking confirmation: task paused, version saved, draft created.

## Conversation Memory

Do not make historical analysis disappear.

- Model task continuity explicitly with `idle`, `active`, `paused`, `resumable`, `completed`, and `failed` states.
- Completed steps collapse into cards that preserve key findings and can expand.
- Each collapsed card shows:
  - step label,
  - one-line summary,
  - 1-3 highlight chips,
  - action to expand evidence.
- User decisions appear as user-message bubbles labelled `采用智能体建议` or equivalent.
- Free-form follow-ups produce assistant acknowledgements with:
  - what was recorded,
  - which step/scope it affects,
  - statement that existing analysis is not silently overwritten.
- Persist only harmless continuity state locally. Never store credentials, secrets, or sensitive business payloads in `localStorage`.

## Evidence and Provenance

Every substantive AI answer should show what it is based on.

- Add a compact `本次回答基于` strip.
- Reference project context, input data version, quality checks, confirmed reports, spatial objects, or prior analysis steps.
- Candidate outputs must expose:
  - support evidence,
  - contradictions,
  - missing data,
  - reliability / confidence,
  - formal-use limitation.
- Each evidence item must carry:
  - stable evidence or source-record ID,
  - source type and confirmation state,
  - data/report version and timestamp when available,
  - object, spatial, file, or field location,
  - action to open or inspect the source.

## Human Confirmation Boundary

AI may generate candidates, drafts, previews, and suggestions. It must not silently publish, approve, close, or write official business data.

Required patterns:

- Show guard callouts such as `智能体只形成候选成果，不自动确认...`.
- Before write-back, show preview of affected fields and scope.
- Use an unchecked-by-default checkbox or equivalent explicit confirmation for expert review submission.
- Keep the submit/write-back action disabled until confirmation is given, then revalidate confirmation and affected scope at submission time.
- Use language like `候选`, `草稿`, `待专家复核`, `人工确认后回填`.
- Keep source chain and version visible where relevant.
- Exports and downloads must identify the result as candidate/draft when it is not official data.

## Visual Treatment

- Assistant panel background uses `--page-alt`; messages/cards use `--card`.
- User message: `--accent` background, secondary text.
- Assistant avatar: `--accent` background, `--brand` icon.
- Current AI result surface: white card, radius `--radius-xl`, subtle border and shadow.
- Context reference strip: `--page-alt` background, small chips using `--accent`.
- Suggestion group: `--page-alt` background; first recommendation is `--brand`, others are white.
- Thinking state: small animated dots or quiet progress, respecting `prefers-reduced-motion`.

## Interaction States

Specify these states before implementation:

| Feature | State | Required UI |
|---|---|---|
| Assistant panel | closed | Floating reopen button with label, not an unlabeled icon |
| Assistant panel | compact | Right panel; business page stays accessible |
| Assistant panel | full | Same conversation expanded; no route reset |
| Task | idle | Recommendation cards and recent tasks |
| Task | active | Context bar, conversation stream, composer |
| Task | paused | Preserve context and show a clear resume action |
| Task | resumable | Restore the saved step, messages, and version without route reset |
| Task | completed | Preserve evidence and allow follow-up without reopening a wizard |
| Step | current | Expanded evidence/result card and suggestion actions |
| Step | completed | Collapsed summary card, expandable |
| AI response | thinking | Quiet in-stream thinking card |
| Follow-up | sent | User message plus acknowledgement of impact scope |
| Write-back | preview | Affected fields, risk, and confirmation boundary |
| Error | failed | Explain what failed, what remains safe, and recovery action |

## Accessibility Contract

- Header icon buttons require accessible names for history, mode switch, close, pause, and resume.
- Context and completed-step controls expose `aria-expanded` and preserve keyboard focus when toggled.
- The history/evidence drawer uses dialog semantics, focus trapping, `Escape` close, and focus restoration.
- Thinking/progress uses a polite status region and respects `prefers-reduced-motion`.
- Toasts announce non-blocking results once; errors move focus only when immediate action is required.
- Composer send is keyboard-operable and must not submit during IME composition.

## Do Not

- Do not turn copilot into a page-by-page wizard that hides earlier conclusions.
- Do not use generic chat bubbles without context, evidence, or state.
- Do not use "上一步 / 下一步" as the main AI workflow language.
- Do not auto-apply AI output to official data.
- Do not use dark-mode chat UI under the teal route.
- Do not let the composer scroll off-screen while the assistant is open.
- Do not erase user decisions when the user adds follow-up constraints.
