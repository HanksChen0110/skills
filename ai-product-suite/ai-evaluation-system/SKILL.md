---
name: ai-evaluation-system
description: "AI产品评估体系构建指导。帮助设计评测集、三层指标体系、选择评估方法(RAGAS/LLM-as-Judge/人工)、A/B测试、MAP最小可接受性能。当用户说「AI评估」「评测体系」「RAGAS」「LLM评分」「A/B测试」「评测集」「模型效果评估」时使用。AI product evaluation system guide. Use when building test sets, designing metrics (business/product/model layers), choosing evaluation methods (RAGAS/LLM-as-Judge/human), or running A/B tests."
---

# AI产品评估体系

> 工作流位置：需求挖掘 → 用户调研 → 需求分析 → 竞品分析 → 技术选型 → 数据处理 → AI PRD → **评估体系** → Badcase治理

## 核心目标

将业务目标转化为可量化的测试集和评分标准，才能比较调优效果。

## 评估全景

```
评测集构建 → 三层指标体系 → 评估方法选择
→ 结果分析 → 优化方向 → Badcase治理
```

## 三层指标体系

**顶层-业务指标**：留存率、付费转化率、DAU/MAU、人工替代率、NPS

**中层-产品体验指标**：
- 任务型：任务完成率、独立解决率、转人工率
- 内容型：用户采纳率、内容质量评分
- 通用：CSAT(1-5分)、用户点踩率

**底层-模型效果指标**：
| 指标 | 含义 |
|------|------|
| Precision | 预测正确的比例 |
| Recall | 找到的相关内容比例 |
| Faithfulness | 回答是否基于文档，有无幻觉 |
| Answer Relevancy | 是否回答了用户的问题 |
| Context Precision | 检索到的chunk中多少相关 |

## 评估方法速查

| 方法 | 特点 | 适用 |
|------|------|------|
| RAGAS | RAG专用，无需人工标注 | RAG系统自动评估 |
| LLM-as-Judge | 大模型打分(0-5分) | 批量评测 |
| 人工评估 | 可靠但成本高 | 高风险场景兜底 |

## LLM-as-Judge 评分标准

```
0分：无结果
1分：文不对题
2分：理解问题但有大量无关信息
3分：回答不够全面，仅部分要点
4分：回答较全面，约80%要点
5分：全面、言简意赅、无不相关内容
```

## MAP（最小可接受性能）

```
1. 调研用户对失败的容忍底线
2. 设定业务指标最低阈值（如满意度≥3.5/5.0）
3. 设定模型指标最低阈值（如准确率≥85%）
4. 低于MAP → 需人机协作兜底
```

## 评估结果→优化方向

```
忠实度低(幻觉) → 优化RAG检索/加强Prompt约束
相关性低(答非所问) → 优化意图识别/Query理解
召回率低(找不到) → 优化分块策略/换Embedding模型
准确率高但召回低(过于保守) → 调低置信度阈值
```

## 输出物

- 评测集（含ground_truth）
- 指标体系文档
- 基线评估报告
- A/B测试方案

## 何时读取参考资料

需要完整评测集构建方法、RAGAS详细原理、Prompt模板或A/B测试设计时 → 读取 `references/methodology.md`
