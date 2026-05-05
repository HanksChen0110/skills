---
name: interface-data-constraint-writer
description: Organize interface contracts, field definitions, validation rules, enums, ranges, units, and data mappings from requirement drafts, design notes, or specifications. Use when Codex needs to make data constraints explicit for specs, integration design, review, or development handoff.
---

# 接口与数据约束整理技能
使用本技能把零散需求中的接口口径、字段定义和数据约束整理成统一说明。

## 核心目标

- 明确接口对象、输入输出和字段含义。
- 统一校验规则、枚举口径、长度范围、单位格式和默认值。
- 提前暴露跨系统映射、数据来源和口径冲突。

## 默认内容

- 接口清单
- 字段定义
- 数据类型
- 必填与默认值
- 校验规则
- 枚举与码表
- 映射关系
- 待确认项

## 工作流
1. 读取需求说明、功能设计、接口草稿、表单说明或需规片段。
2. 抽取接口边界、请求参数、返回字段和数据来源。
3. 整理字段含义、类型、取值范围、校验条件和格式约束。
4. 标记跨系统映射关系、口径差异和未确定字段。
5. 输出接口约束说明、字段表或数据校验清单。

## 输出建议

- 接口约束清单
- 字段定义表
- 数据校验规则表
- 枚举与映射说明

## 禁止事项

- 不得只列字段名而不说明业务含义。
- 不得忽略必填条件、格式限制和异常返回口径。
- 不得把临时示例值写成正式取值规则。
