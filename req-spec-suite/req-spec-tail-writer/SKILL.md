---
name: req-spec-tail-writer
description: Generate, rewrite, or standardize the remaining sections of a Chinese requirements specification document from section 3.3 through chapter 7, under a confirmed template structure.
---

# 需规生成器（3.3至7）

用于在 `3.2` 确认后继续生成 `3.3 ~ 7`，包括接口、内部数据、环境、质量、资源、约束、优先级、合格性、可追溯性、注释和交付物。

## 先读文件

- 先读用户提供的正式 `docx` 模板或既有成稿
- 再读：
  - `D:/AIwork/pm-workbench/skills/spec-writing/template-first-req-spec-rules.md`
  - `D:/AIwork/pm-workbench/skills/spec-writing/req-spec-hard-constraints.md`
- 再读本 skill 目录下的 `references/需规写作宪法.md`
- 需要审核时再读：
  - `D:/AIwork/pm-workbench/skills/spec-writing/req-spec-reviewer/SKILL.md`

## 生成要求

- 严格按模板的 `3.3 ~ 7` 结构落位
- 不擅自改表头、改章节顺序、改题注
- 不把尾章写成自由发挥说明文

## 重点约束

- `4 合格性规定` 必须有实际内容
- `5 需求可追溯性` 不能为空
- 如果模板包含 `正向追溯` 和 `反向追溯`，则两节都必须存在
- `6 注释` 不能保留大面积空泛占位
- `7 交付物清单` 必须补齐
- `3.3 ~ 7` 的章节标题必须是 Word 真实标题，不要把 `4 合格性规定`、`5 需求可追溯性`、`6 注释`、`7 交付物清单` 写成普通正文行。
- 图题、表题在尾章中也必须使用独立题注段落，不要退化成普通文本。
- 尾章行文应保持工程交付语气，段落完整、信息密度高，不要写成草稿式碎句。

## 生成后必须自审

至少检查：

- 合格性、追溯性、交付物是否完整
- 尾章表格是否沿用模板结构
- 是否仍残留“本小节无内容”之类的无效占位
- 章节 `3.3 ~ 7` 是否全部能正确进入目录
- 是否存在“正文看似有章节，目录里却没有”的伪标题问题
