---
name: ai-tech-selection
description: "AI产品技术选型方法论指导。帮助判断是否需要AI、选择架构方案(RAG/微调/Agent)、模型选型、Build vs Buy决策、上下文工程设计。当用户说「AI技术选型」「用RAG还是微调」「选什么模型」「Build还是Buy」「技术架构」「上下文工程」时使用。AI product tech selection methodology. Use when deciding AI architecture (RAG vs fine-tuning vs Agent), model selection, Build vs Buy decisions, or context engineering design."
---

# AI产品技术选型

> 工作流位置：需求挖掘 → 用户调研 → 需求分析 → 竞品分析 → **技术选型** → 数据处理 → AI PRD → 评估体系 → Badcase治理

## 核心思想

> 大模型本质还是工具，和传统NLP、规则匹配等是平权的。根据场景因地制宜，不要为了用大模型而用大模型。

## 四步选型流程

```
Step 1: 判断是否需要AI/大模型（7维度评估）
Step 2: 选择AI架构方案（API/RAG/微调/Agent）
Step 3: 技术架构设计（基础设施+模型+数据+业务流程）
Step 4: 具体模型选型（公司属性/能力/成本/版权）
```

## RAG vs 微调速查

| 维度 | 优先RAG | 优先微调 |
|------|---------|---------|
| 知识更新 | 频繁更新 | 相对稳定 |
| 可追溯 | 需要引用来源 | 不需要 |
| 数据量 | 不足以微调 | >1000条高质量 |
| 上线速度 | 快速MVP | 可等待 |
| 风格要求 | 通用即可 | 需特定风格 |

## Build vs Buy 决策

```
数据是否敏感？
  是 → 本地部署成本可接受？→ 是=Build / 否=脱敏后Buy
  否 → 验证期(MVP)？→ 是=Buy / 否=评估长期TCO再决定
```

## 上下文工程四维度

| 维度 | 内容 |
|------|------|
| 静态上下文 | 角色设定、业务准则、安全护栏 |
| 动态上下文 | 实时用户意图、任务进度、会话历史 |
| 知识上下文 | RAG引入的私有知识 |
| 过程上下文 | 中间推理日志 |

## 与工程师沟通清单

1. 延迟要求是多少？
2. 冷启动需要什么数据量？
3. 并发上限是多少？
4. 外部API数据是否被用于训练？
5. 微调和RAG实现周期各多少？
6. 兜底机制是什么？

## 输出物

- 技术选型方案文档
- Build vs Buy 决策矩阵
- 模型评测报告

## 何时读取参考资料

需要完整方法论、模型对比、Agent范式或评测网站列表时 → 读取 `references/methodology.md`
