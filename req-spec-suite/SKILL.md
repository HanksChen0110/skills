---
name: req-spec-suite
description: "需规写作工具箱。覆盖需求规约全生命周期：需求分析、用户故事、功能设计、业务规则、角色权限、状态流转、接口约束、验收标准、需规编写（GJB438C/分章节）、需规审查、需求变更。当用户提到任何需规/需求规格/规格说明相关工作时，路由到对应子技能。Requirements specification toolkit covering the full lifecycle: requirement analysis, user stories, functional design, business rules, role permissions, state transitions, interface constraints, acceptance criteria, spec writing (GJB438C/chapter-based), spec review, requirement changes."
---

# 需规写作套件 (Req Spec Suite)

## 概述

本套件覆盖需求规约全生命周期，包含 14 个专项子技能。使用时根据用户意图路由到对应子技能。

## 路由入口

**直接读取并执行 `spec-writing/SKILL.md`**，它包含完整的路由规则、输入优先路由、快速意图映射、组合技能指南和交付规范。

`spec-writing` 是本套件的核心路由器，所有路由逻辑已在那里维护，不重复定义。

## 子技能目录

```
req-spec-suite/
├── SKILL.md                        ← 本文件（入口，委托给 spec-writing）
├── spec-writing/                   ← 核心路由器（所有路由逻辑在此）
├── requirement-analysis/           ← 需求分析（Kano + 5W1H）
├── acceptance-criteria-writer/     ← 验收标准
├── business-rules-writer/          ← 业务规则
├── functional-design-writer/       ← 功能设计
├── interface-data-constraint-writer/ ← 接口数据约束
├── role-permission-writer/         ← 角色权限
├── state-transition-exception-writer/ ← 状态转换异常
├── gjb438c-req-spec-writer/        ← GJB438C完整写手
├── req-spec-pre32-writer/          ← 写到3.1.3
├── req-spec-ch3-writer/            ← 写第3章3.2
├── req-spec-tail-writer/           ← 写3.3到第7章
├── req-spec-reviewer/              ← 需规审查
└── req-change-workflow/            ← 需求变更流程
```

## 快速启动

- "写需规" → 读取 `spec-writing/SKILL.md` → 路由到 `gjb438c-req-spec-writer`
- "审查需规" → 读取 `spec-writing/SKILL.md` → 路由到 `req-spec-reviewer`
- "整理业务规则" → 读取 `spec-writing/SKILL.md` → 路由到 `business-rules-writer`
- "写验收标准" → 读取 `spec-writing/SKILL.md` → 路由到 `acceptance-criteria-writer`
