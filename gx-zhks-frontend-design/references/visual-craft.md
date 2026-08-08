# gx-zhks visual craft

Use this file when the task asks for closer 1:1 fidelity to the 智慧矿山智能体平台 main page. This is the craft layer: grid texture, depth, hover, prompt input, and sidebar finish.

Design source: only `http://125.69.16.175:8015/smart-mine/index.html` and approved screenshots of that main page. Do not use 申报、边坡、岩芯 or other sub-agent pages as style sources.

## 1. Page Grid Field

The workspace is not a flat blue-gray background. It is a pale surface with a fixed, subtle grid that is strongest near the top and fades downward.

Use this pattern for full app pages:

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
  background-image:
    linear-gradient(rgba(15, 23, 42, .045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(15, 23, 42, .04) 1px, transparent 1px);
  background-size: 28px 28px;
  -webkit-mask-image: linear-gradient(180deg, rgba(0, 0, 0, .75), transparent 72%);
  mask-image: linear-gradient(180deg, rgba(0, 0, 0, .75), transparent 72%);
}
```

Rules:

- Grid lines must be visible only as texture. If users notice the grid before the content, reduce opacity.
- Keep the grid attached to the viewport, not to individual cards.
- Do not use dotted paper grids, blueprint grids, or heavy engineering CAD lines.

## 2. Hero Stage Layers

The homepage hero has three layers:

1. Workspace grid behind everything.
2. Large rounded hero panel with blue/cyan washes and a wider 72px vertical grid.
3. Center glass panel/inner frame that creates depth behind the title and prompt bar.

Use this structure:

```css
.hero-panel {
  position: relative;
  overflow: hidden;
  border-radius: 28px;
  border: 1px solid rgba(165, 243, 252, .65);
  background: rgba(239, 248, 255, .95);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .55), 0 24px 80px rgba(15, 23, 42, .08);
}

.hero-panel::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(135deg, rgba(36, 119, 230, .12), transparent 38%),
    linear-gradient(225deg, rgba(14, 165, 233, .12), transparent 42%),
    repeating-linear-gradient(90deg, rgba(14, 165, 233, .06) 0 1px, transparent 1px 72px);
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
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .50), 0 0 70px rgba(14, 165, 233, .08);
}
```

Rules:

- Keep content above pseudo-elements with `position: relative; z-index: 1`.
- The hero panel may be large and rounded on the platform home page.
- On review queues, tables, forms, and SkillNet pages, convert this into a compact status band. Do not force a marketing-scale hero onto business workflows.

## 3. Depth And Shadow System

The platform uses layered, airy depth. Do not reuse one shadow everywhere.

| Surface | Shadow | Use |
|---|---|---|
| Small card | `0 14px 44px rgba(15, 23, 42, .06)` | compact stats, list cards |
| Normal card | `0 18px 55px rgba(15, 23, 42, .07)` | capability cards, agent cards |
| Main hero/container | `0 24px 80px rgba(15, 23, 42, .08)` | large page panels |
| Floating prompt bar | `0 26px 70px rgba(29, 98, 207, .16)` | command input shell |
| Dark action button | `0 12px 28px rgba(15, 23, 42, .22)` | embedded primary action |
| Strong overlay only | `0 30px 90px rgba(15, 23, 42, .25)` | modal/drawer overlays, not normal cards |

Rules:

- Depth should feel like a raised white surface on a pale technical workspace.
- Use light borders with shadows. Shadow without border becomes generic SaaS.
- Business pages should use the small/normal card shadows, not the hero/container shadow on every panel.

## 4. Card Hover Micro-Interaction

Cards do not animate loudly. They lift 2px, border becomes more cyan, and a soft technical glow appears through a pseudo-element.

```css
.tech-card {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(226, 232, 240, .85);
  background: rgba(255, 255, 255, .95);
  box-shadow: 0 18px 55px rgba(15, 23, 42, .07);
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
  box-shadow: 0 24px 80px rgba(15, 23, 42, .08);
}

.tech-card:hover::before {
  opacity: 1;
}
```

Rules:

- Use `translateY(-2px)`, not large lift, bounce, scale, or rotation.
- Hover should clarify interactivity without making dense enterprise pages feel playful.
- Respect reduced motion when the host app already supports it.

## 5. Prompt Bar / Command Input

The command input is a thick, tactile surface, not a plain bordered input.

```css
.prompt-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  border-radius: 16px;
  border: 1px solid rgba(165, 243, 252, .80);
  background: rgba(255, 255, 255, .92);
  box-shadow: 0 26px 70px rgba(29, 98, 207, .16), inset 0 0 0 1px rgba(255, 255, 255, .72);
}

.prompt-bar input,
.prompt-bar textarea {
  min-height: 48px;
  flex: 1;
  border: 1px solid rgba(226, 232, 240, .88);
  border-radius: 12px;
  background: #ffffff;
  color: #020617;
  padding: 0 16px;
  box-shadow: inset 0 1px 2px rgba(15, 23, 42, .04);
}

.prompt-bar input::placeholder,
.prompt-bar textarea::placeholder {
  color: #94a3af;
}

.prompt-bar button {
  min-height: 48px;
  border-radius: 10px;
  border: 0;
  background: #020617;
  color: #ffffff;
  box-shadow: 0 12px 28px rgba(15, 23, 42, .22);
}
```

Rules:

- Embed the dark primary action inside the prompt shell for command-like tasks.
- Keep Chinese button text horizontal. On mobile, let the input wrap above the button only when needed.
- Use prompt bars for AI command/composer surfaces, not for every ordinary form input.

## 6. Sidebar Gradient And Structure

The sidebar is a fixed dark product rail with a top blue wash, not a flat black rectangle.

```css
.app-sider {
  background:
    linear-gradient(180deg, rgba(36, 119, 230, .28), rgba(11, 19, 32, 0) 34%),
    linear-gradient(180deg, #0b1320, #020617);
  color: #c8d4e6;
}

.sidebar-brand {
  border-bottom: 1px solid rgba(255, 255, 255, .10);
}

.sidebar-logo {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  border: 1px solid rgba(103, 232, 249, .35);
  background: rgba(34, 211, 238, .08);
  color: #67e8f9;
  box-shadow: 0 0 28px rgba(34, 211, 238, .18);
}

.sidebar-nav-item.is-active {
  background: rgba(34, 211, 238, .10);
  color: #ffffff;
  box-shadow: inset 0 0 0 1px rgba(103, 232, 249, .20);
}
```

Required sidebar sections:

- Brand/logo area.
- Primary navigation.
- 最近使用.
- 最近对话.
- Footer status: `知识库驱动 · 本地生成 · 真实导出`.

Rules:

- Desktop sidebar must be fixed to the viewport and occupy full height while the right workspace scrolls.
- Do not let Ant Design's light menu theme appear inside the dark rail.
- Do not make the sidebar text low-contrast. Active item is white; inactive items are blue-gray.

## 7. Quick Visual QA

Before calling a gx-zhks page complete, inspect these states:

1. Top of page: grid visible, sidebar full height, hero/panel depth visible.
2. Scrolled long page: sidebar remains fixed and clickable from top to bottom.
3. Prompt/input close-up: thick white shell, cyan ring, inset input, dark embedded button.
4. Card hover: exactly `translateY(-2px)` with cyan border and soft glow.
5. Browser identity: title and favicon are product-specific, not Vite/React/default `web`.