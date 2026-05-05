---
name: ai-product-suite
description: "AI产品经理工具箱。覆盖AI产品全生命周期：需求挖掘、用户调研、产品设计、竞品分析、技术选型、数据处理、PRD编写、评估体系、Badcase治理。当用户提到任何AI产品相关工作时，先路由到对应子技能。AI Product Manager toolkit covering the full lifecycle: requirement discovery, user research, product design, competitive analysis, tech selection, data processing, PRD writing, evaluation system, badcase analysis."
---

# AI 产品套件 (AI Product Suite)

## 概述

本套件覆盖 AI 产品全生命周期，包含 9 个专项子技能。使用时根据用户意图路由到对应子技能。

## 工作流全景

```
需求挖掘 → 用户调研 → 需求分析 → 产品设计 → 竞品分析
→ 技术选型 → 数据处理 → PRD编写 → 评估体系 → Badcase治理
```

## 路由表

根据用户意图，读取对应子技能的 SKILL.md 并执行：

| 用户意图关键词 | 子技能 | 路径 |
|--------------|--------|------|
| 需求挖掘、发现需求、需求从哪来、需求池、KANO | 需求挖掘 | `ai-requirement-discovery/SKILL.md` |
| 用户调研、问卷、访谈、验证需求、调研方案 | 用户调研 | `ai-user-research/SKILL.md` |
| 产品设计、XYZ轴、数据飞轮、五阶模型、设计思维 | 产品设计 | `ai-product-design/SKILL.md` |
| 竞品分析、冰山模型、对比XX产品、竞品拆解 | 竞品分析 | `ai-comp-analysis/SKILL.md` |
| 技术选型、RAG还是微调、选模型、Build vs Buy、上下文工程 | 技术选型 | `ai-tech-selection/SKILL.md` |
| 数据处理、数据清洗、分块策略、Embedding、RAG优化、向量库 | 数据处理 | `ai-data-processing/SKILL.md` |
| 写PRD、AI PRD、需求文档、Agent设计、产品规格 | PRD编写 | `ai-prd-assistant/SKILL.md` |
| 评估体系、评测集、RAGAS、LLM评分、A/B测试、模型效果 | 评估体系 | `ai-evaluation-system/SKILL.md` |
| Badcase、bad case、错误分析、模型失败、效果不佳、准召优化 | Badcase治理 | `ai-badcase-analysis/SKILL.md` |

## 路由规则

1. **精确匹配**：用户意图明确命中某个子技能 → 直接读取并执行该子技能
2. **阶段匹配**：用户描述了项目阶段（如"我刚开始做AI产品"）→ 路由到工作流中该阶段对应的子技能
3. **模糊匹配**：用户意图不明确 → 列出相关子技能让用户选择，或根据上下文推断最可能的子技能
4. **多技能联动**：用户需求跨多个阶段 → 按工作流顺序依次执行，每个阶段完成后提示下一步

## 快速启动

当用户说以下内容时，直接路由：

- "帮我做AI产品" → 先执行 `ai-requirement-discovery`，再按工作流推进
- "分析XX竞品" → 执行 `ai-comp-analysis`
- "写一个AI PRD" → 执行 `ai-prd-assistant`
- "AI产品效果不好" → 执行 `ai-badcase-analysis`
- "要不要用RAG" → 执行 `ai-tech-selection`
- "设计评测体系" → 执行 `ai-evaluation-system`
- "做用户调研" → 执行 `ai-user-research`
- "设计数据管道" → 执行 `ai-data-processing`
- "AI产品怎么设计" → 执行 `ai-product-design`

## 子技能目录

所有子技能位于本目录下：

```
ai-product-suite/
├── SKILL.md                    ← 本文件（路由入口）
├── ai-requirement-discovery/   ← 需求挖掘
├── ai-user-research/           ← 用户调研
├── ai-product-design/          ← 产品设计
├── ai-comp-analysis/           ← 竞品分析
├── ai-tech-selection/          ← 技术选型
├── ai-data-processing/         ← 数据处理
├── ai-prd-assistant/           ← PRD编写
├── ai-evaluation-system/       ← 评估体系
└── ai-badcase-analysis/        ← Badcase治理
```
