---
name: state-transition-exception-writer
description: Write state transitions, node conditions, exception branches, rollback logic, and recovery rules from requirements, process drafts, or functional design. Use when Codex needs to make state machines and abnormal flows explicit before detailed design, test design, or formal specs.
---

# 状态流转与异常设计技能
使用本技能把需求、流程或功能设计中的状态变化与异常处理整理成结构化说明。

## 核心目标

- 显性化状态定义、状态迁移条件和触发动作。
- 区分正常主流程、分支流程、异常中断和回退恢复。
- 为业务规则、验收标准、测试用例和需规文档提供可引用输入。

## 默认内容

- 状态对象
- 初始状态与终止状态
- 触发事件
- 进入条件
- 迁移结果
- 异常分支
- 回退与补偿
- 待确认项

## 工作流
1. 读取需求分析、功能设计、流程图草稿或历史需规片段。
2. 抽取状态节点、触发动作、判断条件和异常场景。
3. 拆分正常流转、并发分支、中断路径和恢复路径。
4. 标记缺失的前置条件、超时规则、失败处理和人工干预点。
5. 输出状态流转说明、异常处理表或状态机草稿。

## 输出建议

- 状态流转表
- 异常处理清单
- 回退与补偿说明
- 待确认问题列表

## 禁止事项

- 不得把页面跳转顺序误写成业务状态机。
- 不得省略触发条件、失败条件和恢复条件。
- 不得把技术实现细节冒充业务状态定义。
