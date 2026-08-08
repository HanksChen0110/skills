# Excalidraw Canvas Spec

Use this JSON shape as the input to `scripts/generate_excalidraw_canvas.js`.

## Diagram Selection

Always choose the layout from the source structure before writing JSON.

| `diagram.type` | Use for | Do not use for |
|---|---|---|
| `layered_architecture` | Product architecture, technical architecture, capability stacks, platform hierarchy, architecture plus feedback loops | Loose idea maps with no layers |
| `swimlane_flow` | Cross-role workflows, approval flows, task execution across systems | Static module catalogs |
| `timeline` | Roadmaps, release phases, historical evolution | Architecture relationships |
| `comparison_matrix` | Option comparison, before/after, capability contrast | Process flow |
| `topology_map` | Systems, services, integrations, dependency networks | Ordered workflows |
| `mindmap_radial` | One central concept with independent surrounding branches | Product architecture, platform layers, workflows |

For "智慧矿山智能体平台 × AIA" style diagrams, choose `layered_architecture`: the content has platform layers, AIA infrastructure layers, a main execution flow, and feedback loops. It is not a radial mind map.

## Common Fields

- `title`: required canvas title.
- `subtitle`: optional short explanation below the title.
- `diagram.type`: required for all new specs. Supported values are listed above.
- `diagram.rationale`: optional short reason for the chosen layout.
- `theme.background`: optional canvas background color.
- `layout`: optional layout tuning object.
- `note`: optional short closing insight.

## Connector Rules

- Prefer orthogonal connectors with horizontal and vertical segments.
- Keep connectors in gutters between layers or in short spaces between neighboring cards.
- Avoid diagonal lines in architecture diagrams.
- Do not route connectors through module cards or text.
- If an edge spans multiple layers or would cross unrelated modules, mark it as `{"route": "note"}` or let the generator summarize it in the "跨层关系" panel.
- Use fewer edges when the diagram is dense. Relationship notes are better than a tangle of long lines.

## `layered_architecture`

Use for architecture diagrams and capability stacks.

```json
{
  "title": "智慧矿山智能体平台 × AIA 体系架构",
  "subtitle": "平台层级、模块关系与 AIA 能力底座",
  "diagram": {
    "type": "layered_architecture",
    "rationale": "该内容有明确平台层、AIA能力层、主流程和反馈闭环。"
  },
  "layers": [
    {
      "title": "用户业务层",
      "subtitle": "真实业务入口",
      "color": "blue",
      "nodes": [
        {
          "id": "business",
          "title": "用户业务系统",
          "items": ["矿山业务需求", "ERP/MES/项目管理", "安全管理"]
        }
      ]
    }
  ],
  "edges": [
    {"from": "business", "to": "ontology", "label": "业务对象/规则接入", "route": "note"}
  ],
  "flow": ["自然语言输入", "任务契约", "AI 总线路由", "智能体执行", "结果验证"],
  "feedbackLoops": [
    {"title": "SkillNet", "items": ["goodcase / badcase", "reference 沉淀"]}
  ],
  "note": "动态本体不是知识库，AI 总线也不是整个平台。"
}
```

Layer fields:

- `layers[].title`: layer label.
- `layers[].subtitle`: optional layer explanation.
- `layers[].color`: optional palette key.
- `layers[].nodes[]`: cards in the layer.
- `nodes[].id`: stable identifier used by `edges`.
- `nodes[].title`: card title.
- `nodes[].items`: 1-4 short lines.
- `nodes[].color`: optional palette key.
- `edges[]`: optional cross-node arrows.
  - `from`: source node `id`.
  - `to`: target node `id`.
  - `label`: optional short connector label.
  - `route`: optional. Use `"note"` for long cross-layer relationships that should not become a crossing line.
- `flow[]`: optional bottom main process.
- `feedbackLoops[]`: optional bottom feedback or side-channel blocks.

## `swimlane_flow`

Use for workflows across roles or systems.

```json
{
  "title": "申报材料审核流程",
  "diagram": {"type": "swimlane_flow"},
  "lanes": [
    {
      "title": "用户",
      "steps": ["上传材料", "确认任务契约", "标记反馈"]
    },
    {
      "title": "智能体平台",
      "steps": ["追问缺失信息", "调用智能审核", "输出结果卡"]
    }
  ]
}
```

## `timeline`

Use for roadmaps and phase sequences.

```json
{
  "title": "平台迭代路线图",
  "diagram": {"type": "timeline"},
  "events": [
    {"title": "MVP", "items": ["统一工作台", "三类核心剧本"]},
    {"title": "V1", "items": ["更多智能体", "更多业务底座"]}
  ]
}
```

## `comparison_matrix`

Use for structured comparisons.

```json
{
  "title": "智能体平台 vs AI 总线",
  "diagram": {"type": "comparison_matrix"},
  "columns": [{"title": "智能体平台"}, {"title": "AI 总线"}],
  "rows": [
    {"title": "定位", "cells": ["业务人员入口", "能力调度与审核"]},
    {"title": "边界", "cells": ["不训练模型", "不替代业务界面"]}
  ]
}
```

## `topology_map`

Use for integration maps. `x` and `y` are optional grid coordinates.

```json
{
  "title": "系统集成拓扑",
  "diagram": {"type": "topology_map"},
  "nodes": [
    {"id": "platform", "title": "智能体平台", "x": 1, "y": 1},
    {"id": "erp", "title": "ERP", "x": 0, "y": 0}
  ],
  "edges": [{"from": "platform", "to": "erp"}]
}
```

## `mindmap_radial`

Use only for true hub-and-spoke maps. The legacy `center + cards + flow` shape is still supported.

```json
{
  "title": "AI 产品经理能力地图",
  "diagram": {"type": "mindmap_radial"},
  "center": {"title": "AI 产品经理", "lines": ["问题定义", "方案判断", "落地推进"]},
  "cards": [
    {"title": "业务洞察", "items": ["业务流程拆解", "场景识别", "价值判断"], "color": "blue"}
  ],
  "flow": ["场景判断", "产品方案", "评估迭代"]
}
```

## Rules

- Keep text concise. Cards are visual modules, not paragraph containers.
- Avoid block-reference syntax like `^abc` in all visible strings.
- Keep the generated `## Text Elements` section empty; do not add Markdown text entries or block references to it.
- Use Chinese strings directly in UTF-8 JSON.
- If more than 6-8 modules appear in one layer, split the layer or merge small modules.
- For architecture diagrams, show layers and directional relationships before adding decorative details.

## Command

```bash
node <skill-dir>/scripts/generate_excalidraw_canvas.js --vault G:/CHLobsidian --spec spec.json --output "Excalidraw/主题.excalidraw.md"
```
