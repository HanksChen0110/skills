---
name: gx-zhks-frontend-design
description: "Design or redesign gx-zhks smart-mine, geology, mining-dashboard, and AI copilot interfaces. Use when the user names gx-zhks, gx-zhks-frontend-design, 观想智慧矿山青绿主题, 青绿矿山主题, 智慧矿山智能体平台风格, or requests the approved mining AI copilot interaction pattern. Includes deterministic routing between the default teal-mining design system and the explicit-only legacy dark platform style. Do not use for generic UI work."
metadata:
  version: "2.2.0"
---

# gx-zhks-frontend-design

Apply the gx-zhks frontend design language through one design route plus optional capability references:

- **recommended route: `teal-mining`** - the light-only 青绿矿山 theme based on the cross-stack design-token specification.
- **explicit-only route: `legacy-dark-platform`** - the older dark-sidebar 智慧矿山智能体平台 main-page style.
- **optional capability: `ai-copilot`** - the approved `kcfx` conversation and human-review behavior. This capability does not select a visual route.

## Route Selection

Resolve the design route before visual work. Treat visual route and page capability as separate decisions.

1. Detect explicit teal terms: `新版`, `青绿`, `teal`, `默认方案`, `设计规范`, `单主题`, or a reference to `设计规范 — 青绿矿山主题（跨技术栈通用 · 单主题）.md`.
2. Detect explicit legacy terms: `旧版`, `legacy`, `暗色侧栏`, `dark sidebar`, `原智慧矿山平台主站风格`, or a request to reproduce the old platform homepage.
3. If both groups appear, do not use first-match routing. Ask the user to resolve the conflict.
4. If only teal terms appear, use `teal-mining`.
5. If only legacy terms appear, use `legacy-dark-platform`.
6. If neither group appears, actively ask:
   - `A. 青绿矿山主题（新版默认，推荐）`
   - `B. legacy 暗色平台主题（旧版，仅兼容旧页面）`
   Do not silently choose when the user has not named a design scheme.
7. Interpret `A / 默认 / proceed / 随便 / 继续 / 新版` as `teal-mining` only when answering this route question. Interpret `B / 旧版 / legacy` as `legacy-dark-platform`.
8. Keep the selected route for the current task. Change it only when the user explicitly asks to switch routes.

After selecting the route, detect capabilities:

- If the page includes `kcfx`, AI assistant, agent, copilot, chat, workflow analysis, recommendations, evidence, or human confirmation, enable the `ai-copilot` capability.
- Capability terms never override or infer the visual route.
- Under `legacy-dark-platform`, use the behavioral sections of `references/ai-copilot-pattern.md` but keep legacy visual tokens. Do not import its teal visual treatment.

## Default Route: `teal-mining`

Use this route for all new gx-zhks frontend work unless the user explicitly requests legacy.

Authoritative design source:

- `G:\CHLobsidian\40_知识库\观想\开发知识与标准\设计规范 — 青绿矿山主题（跨技术栈通用 · 单主题）.md`

Visual / interaction reference, not a token authority:

- `G:\AI_products\gx_tkplatform`
- `G:\AI_products\gx_tkplatform\kcfx`

Default workflow:

1. Load `references/teal-theme.md`.
2. Load `references/teal-components.md`.
3. If the `ai-copilot` capability is enabled, also load `references/ai-copilot-pattern.md`.
4. Load `references/teal-platform-mapping.md` for implementation details in React, Tailwind, plain CSS, Ant Design, shadcn, or other stacks.
5. Preserve the target app's workflow and information architecture; replace only the visual language, component styling, and interaction details needed to match the teal theme.
6. Verify the result against the teal design-token spec first, then against `kcfx` for AI copilot behavior where relevant.
7. For implemented frontend work, run the visual verification gate in `references/teal-platform-mapping.md` before claiming completion.

Default route core rules:

- Single light theme only. Do not add dark mode.
- `--brand` is the only brand-color source. Default is `#1ba2a0`.
- Derive `--brand-light`, `--brand-dark`, `--accent`, chart colors, focus rings, icon tint, and active states from `--brand`.
- Do not scatter hard-coded primary hex values in implementation. Use tokens or local variables mapped from tokens.
- Semantic status colors are fixed and do not follow brand color: red, orange, yellow, green.
- Page background is soft gray-green; cards are white; borders are fine and low-contrast.
- Use calm, dense operational layout. Do not create a marketing landing page unless explicitly asked.
- Cards must earn their existence. Prefer layout surfaces, tables, drawers, and conversation panels over decorative card grids.
- For AI copilot work, keep the assistant as a persistent right-side conversation surface or a full-screen version of the same surface, not a separate wizard that erases prior analysis.
- AI output must keep provenance, context, uncertainty, and human confirmation boundaries visible.

## Legacy Route: `legacy-dark-platform`

Use this route only when the user explicitly requests the older dark-sidebar platform style.

Legacy source:

- `http://125.69.16.175:8015/smart-mine/index.html`

Legacy workflow:

1. Load `references/visual-craft.md`.
2. Load `references/tokens.md`.
3. Load `references/components.md`.
4. Load `references/page-patterns.md`.
5. Load `references/platform-mapping.md`.
6. If the `ai-copilot` capability is enabled, load the behavioral sections of `references/ai-copilot-pattern.md` and ignore its teal-only visual section.

Legacy guardrails:

- Do not use legacy dark sidebar unless the user explicitly chooses it.
- Do not mix the legacy dark shell with the teal token system.
- Do not use the "最近使用" pages or sub-agent systems such as 岩芯识别、申报、边坡监测 as legacy style sources unless the user explicitly asks to reproduce those pages.

## Anti-patterns

- Do not silently pick a route when the user invokes this skill without naming a design scheme.
- Do not use `kcfx`, `AI copilot`, `agent`, or `chat` as visual-route selectors.
- Do not resolve simultaneous teal and legacy terms by first match; ask for clarification.
- Do not use legacy dark sidebar for new work unless explicitly requested.
- Do not hard-code the teal brand color across components; use `--brand` and derived tokens.
- Do not use brand color for danger, blocking, overdue, or error states.
- Do not add purple-heavy, orange-heavy, beige, generic SaaS, or dark dashboard palettes.
- Do not use oversized decorative cards inside cards.
- Do not add stock photos, abstract blobs, or marketing hero illustrations to operational product screens.
- Do not mix icon libraries inside one implementation.
- Do not keep framework starter assets such as Vite favicon, React favicon, page title `web`, or placeholder metadata.
- Do not create a landing page when the task is to build an application page.
- Do not let mobile buttons become vertical text; wrap layout, not individual Chinese characters.

## Completion Gate

Before reporting frontend work complete:

1. Confirm the selected route and loaded references.
2. Confirm the implementation uses the authoritative tokens and does not mix teal and legacy visual systems.
3. Run the target project's existing lint, test, and build commands when available.
4. Run visual checks at desktop and mobile widths using Playwright or the available browser tool. Capture the required states from `references/teal-platform-mapping.md`.
5. Check keyboard focus, dialog/drawer focus behavior, reduced motion, text contrast, overflow, scroll ownership, and Chinese text wrapping.
6. For AI copilot work, verify evidence provenance, pause/resume continuity, failed/recovery states, and the human-confirmation gate.
7. If a runnable UI or browser tool is unavailable, state that visual verification was not performed. Do not imply it passed.

## Maintenance Validation

After updating this skill, run:

```powershell
$env:PYTHONUTF8 = "1"
python scripts/validate_skill.py
```

Also run Codex's current `quick_validate.py` against the skill root and forward-test the route scenarios in a fresh Codex or Claude Code session.

## References

Default teal route:

- `references/teal-theme.md` - authoritative teal mining design tokens, principles, color rules, typography, radius, spacing, theming protocol
- `references/teal-components.md` - cards, buttons, badges, tables, filters, drawers, layout surfaces, business-page patterns
- `references/ai-copilot-pattern.md` - AI copilot layout, conversation memory, context bar, evidence references, suggestion actions, human confirmation, composer behavior
- `references/teal-platform-mapping.md` - cross-stack implementation and verification rules

Legacy route:

- `references/visual-craft.md` - legacy craft details for grid, shadows, hover, prompt bar, hero layers, sidebar gradient, and visual QA
- `references/tokens.md` - legacy colors, typography, spacing, radius, elevation, motion, icon choices
- `references/components.md` - legacy navigation, hero, cards, status chips, prompt bar, agent entries
- `references/page-patterns.md` - legacy business page patterns
- `references/platform-mapping.md` - legacy HTML/CSS and React/Tailwind implementation rules
