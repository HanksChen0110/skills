---
name: excalidraw-canvas-builder
description: Generate directly viewable Obsidian Excalidraw canvas files from structured content. Use when the user wants Codex or Claude Code to organize ideas, frameworks, maps, workflows, product diagrams, capability maps, architecture diagrams, or similar content into a final `.excalidraw.md` / `.excalidraw` canvas that opens as visual modules instead of Markdown text.
---

# Excalidraw Canvas Builder

## Purpose

Create a real Obsidian Excalidraw canvas by turning content into a structured JSON spec, then running the bundled generator script. The final deliverable is a directly viewable `.excalidraw.md` file path, not an ExcalidrawAutomate script note and not a Markdown outline.

## Workflow

1. Identify the target vault and output directory. Default to the active Obsidian vault when the user is working in one, and prefer `Excalidraw/` unless they specify another folder.
2. Analyze the source content before drawing:
   - Core objects: what entities, modules, roles, systems, or concepts must appear.
   - Hierarchy: whether the content has layers, ownership levels, domains, or containment.
   - Flow: whether there is a time order, process order, routing path, or state transition.
   - Relationships: dependency, mapping, feedback, governance, side-channel validation, or data exchange.
   - Best-fit diagram type: choose the layout that makes the structure easiest to understand.
3. Choose exactly one diagram type:
   - `layered_architecture`: product/technical/platform architecture, capability stacks, system layers.
   - `swimlane_flow`: cross-role or cross-system workflows.
   - `timeline`: roadmap, release sequence, evolution path.
   - `comparison_matrix`: option comparison, before/after, capability contrast.
   - `topology_map`: systems, services, data sources, integration topology.
   - `mindmap_radial`: true hub-and-spoke concept maps only.
4. Organize the content into the matching visual spec. Prefer the new `diagram.type` spec shape. Use the old `center + cards + flow` shape only when the canvas is intentionally radial.
5. Save the spec as UTF-8 JSON in a temporary or task-local file.
6. Run `scripts/generate_excalidraw_canvas.js` with Node:

```bash
node <skill-dir>/scripts/generate_excalidraw_canvas.js --vault <vault-path> --spec <spec.json> --output <relative-or-absolute-output.excalidraw.md>
```

7. Report the final canvas path and the script verification summary.

## Layout Decision Rules

- Do not default to a radial "cards pointing to center" layout.
- Product or technical architecture should usually be `layered_architecture`.
- Product modules with hierarchy and cross-module relationships should be `layered_architecture` or `topology_map`.
- User journeys, operations, approval flows, and task execution should be `swimlane_flow`.
- Roadmaps and phased plans should be `timeline`.
- Evaluating alternatives should be `comparison_matrix`.
- Use `mindmap_radial` only when the content is genuinely one central concept with independent surrounding branches.
- If the content mixes architecture plus execution flow, use `layered_architecture` and add `flow[]` plus `feedbackLoops[]` below the layers.
- Before generating, the internal analysis must settle: core objects, layers, main flow, feedback loops, side paths, and chosen diagram type. Do not skip straight from text extraction to canvas generation.

## Connector Routing Rules

- Connectors must clarify relationships without becoming the main visual noise.
- Prefer orthogonal connectors: horizontal and vertical segments, aligned to the grid or empty gutters.
- Never draw a connector through another module card. If a line would cross a node, reroute through a gutter, move the nodes, or replace the long line with a labeled relationship note.
- Minimize crossings. If more than a few crossings appear, change the layout instead of adding more lines.
- For layered architecture:
  - Adjacent-layer relationships may use orthogonal connectors through the blank gap between layers.
  - Same-layer relationships may use short connectors only between neighboring cards.
  - Long cross-layer relationships should become a `edges[].route = "note"` item or be automatically summarized in a "跨层关系" panel.
  - Do not use diagonal connectors in architecture diagrams unless the diagram is intentionally informal.
- For dense diagrams, use labels, numbered relationship notes, or repeated interface names instead of drawing every possible edge.

## Hard Rules

- Generate a canvas file, not a script note. The output should normally end with `.excalidraw.md`.
- Do not put Excalidraw block references such as `^cardTitle` inside element text.
- Keep the `## Text Elements` section header because Obsidian Excalidraw's parsed format expects it, but leave that section empty. Do not write text entries with `^id` block references there.
- Do not hand-write compressed drawing data. Use the script so LZString compression matches the Obsidian Excalidraw plugin.
- Keep module text short. Excalidraw cards should be scannable visual blocks, not long paragraphs.
- If the user points to an existing canvas they manually adjusted, inspect the current canvas first and preserve its layout, spacing, and existing text unless they explicitly ask for a clean regeneration. Add new information as a separate layer/section instead of overwriting the hand-adjusted canvas wholesale.
- When updating a canvas version, preserve prior-version text that the user expects to remain visible. Do not stack new text on top of old text; place comparison or retained text in separate boxes, rows, or columns.
- Size modules from content, not from a fixed template. Estimate text lines before drawing: table rows and cards with 2-3 lines need at least 72-90 px height; 4-5 lines need at least 110-140 px; dense comparison rows should usually be 90 px or more. Prefer wider boxes and smaller font over squeezed text.
- Keep generous spacing: separate major horizontal bands by at least 90-120 px, keep adjacent cards separated by at least 25-35 px, and leave internal card padding around 16-24 px. For Chinese text, avoid narrow text boxes that force awkward wrapping.
- Inspect connectors before reporting success: no connector should pass through a module background, title text, or body text. Long cross-layer dependencies should be represented as relationship notes.
- Before reporting success, do a visual/layout sanity check in addition to script validation: look for text boxes whose bounding boxes overlap unrelated text or sit outside their background rectangles. If overlap is detected, increase row/card height or move the section before finalizing.
- After writing, verify by reading the script output: it must report `badTextElements=0`, `hasTextElementsIndex=true`, `textIndexChars=0`, `nullArrowheads=0`, and `connectorEdgeIssues=0`.

## Spec Shape

Use the new shape for non-radial diagrams:

```json
{
  "title": "智慧矿山智能体平台 × AIA 体系架构",
  "subtitle": "平台层级、模块关系与 AIA 能力底座",
  "diagram": {
    "type": "layered_architecture",
    "rationale": "产品与技术体系有清晰层级、主流程和反馈闭环，适合分层架构图。"
  },
  "layers": [
    {
      "title": "用户业务层",
      "nodes": [
        {"id": "business", "title": "用户业务系统", "items": ["真实业务需求", "ERP/MES/项目管理"]}
      ]
    }
  ],
  "flow": ["自然语言输入", "任务契约", "AI 总线路由", "智能体执行", "结果验证"],
  "feedbackLoops": [
    {"title": "SkillNet", "items": ["goodcase / badcase", "reference 沉淀"]}
  ]
}
```

Use the legacy radial shape only for true hub-and-spoke diagrams:

```json
{
  "title": "AI 产品经理能力地图",
  "diagram": {"type": "mindmap_radial"},
  "center": {"title": "AI 产品经理", "lines": ["问题定义", "方案判断", "落地推进"]},
  "cards": [
    {"title": "业务洞察", "items": ["业务流程拆解", "场景识别", "价值判断"], "color": "blue"}
  ]
}
```

Read `references/spec-format.md` when the requested diagram needs an exact schema or a different layout type.

## Validation

Run the generator and check that it prints:

- `wrote=<path>`
- `elements=<number>`
- `textElements=<number>`
- `badTextElements=0`
- `hasTextElementsIndex=true`
- `textIndexChars=0`
- `nullArrowheads=0`
- `connectorEdgeIssues=0`

If Obsidian still shows old content, tell the user to close and reopen the canvas or switch between Markdown and Excalidraw view. Do not create a separate `.md` script note as the final answer.
