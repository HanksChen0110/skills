---
name: ppt-slide-prompt
description: PPT 生图 Prompt 编写规范。为 Lovart / Nano Banana 等生图工具编写带内嵌文字的 PPT 幻灯片 Prompt，一次生成即用、无需二次叠加文字。触发关键词：PPT生图、幻灯片prompt、slide prompt、生图提示词、Lovart PPT、带文字生图。
---

# PPT Slide Prompt — 带内嵌文字的生图提示词编写规范

> **核心理念**：文字直接写进 Prompt，生成即是成品幻灯片，消灭二次编辑。

## 什么时候用

- 需要为 PPT 演示文稿批量生成配图
- 使用 Lovart · Nano Banana 2 或类似文生图工具
- 希望生成的图片自带标题、标签、说明文字，直接可用
- 需要全套视觉风格统一（色板、字体、构图）

## 核心规则

### 1. 双引号文字嵌入（最重要）

所有需要出现在图片上的文字，必须用**英文双引号** `""` 框定：

```
bold title text "Agent Harness Engineering" at the top center
label text "意图" below the module
caption text "模型出意图，系统出动作" at the bottom center
```

**为什么用双引号**：
- 告诉生图模型"这段是要渲染的文字，不是描述性语句"
- 提高文字渲染准确率，减少模型自由发挥
- 统一约定，方便批量检查和替换

### 2. 文字语言规则（中英文分流）

**默认使用简体中文**，仅以下情况保留英文：

| 保留英文的场景 | 示例 |
|---------------|------|
| AI/技术领域专有术语 | Agent、Harness、Prompt、Schema、LLM、Context Engineering |
| 方法论/框架的正式名称 | Agent Harness Engineering、RAG |
| 约定俗成的英文缩写 | AI PM、API、SaaS |

**其余一律用简体中文**，包括但不限于：
- 标题：`"三层架构"` 而非 `"Three-Layer Architecture"`
- 标签：`"缰绳"` `"监控"` `"风险"` 而非 `"Reins"` `"Monitor"` `"Risk"`
- 说明：`"精准匹配，不过度配置"` 而非 `"Right-size, never over-provision"`
- 混合写法允许：`"Prompt 级联"` `"Schema 闸门"` `"主 Agent"`

**为什么默认中文**：
- 面向中文受众的 PPT，中文可读性远高于全英文标签
- 减少观众认知负担，核心信息一眼可读
- AI 专有术语保留英文，避免翻译歧义（如 Agent ≠ 代理）

### 3. 文字三层级

每张 Slide Prompt 的文字分三个层级，由上到下：

| 层级 | 作用 | 位置 | 字号 | 示例 |
|------|------|------|------|------|
| **标题** | 页面主题 | 顶部居中 | 最大，加粗 | `bold title text "三层架构" at the top center in dark charcoal` |
| **标签** | 标注视觉元素 | 紧贴对应元素 | 中等 | `labeled "路由" beneath it` |
| **说明** | 补充一句话要点 | 底部居中 | 最小 | `caption text "精准匹配，不过度配置" at the bottom center` |

**约束**：
- 标题必须有，标签按需，说明可选
- 单个标签 **≤ 3 个词**（中文或英文均可），保证模型可靠渲染
- 所有文字统一使用 `dark charcoal` 色，`clean sans-serif` 字体
- 文字描述始终包含位置指令（at the top center / below / beneath）

### 3. 风格锚（Style Anchor）

每张 Prompt 末尾追加统一的风格描述，保证全套视觉一致：

```
flat vector illustration, minimalist white background, clean geometric lines,
soft sky blue and warm coral accent colors, professional technology slide design,
clean modern sans-serif typography in dark charcoal color, 16:9 wide composition
```

**风格锚包含六个维度**：
1. **画风**：flat vector illustration（扁平矢量）
2. **背景**：minimalist white background（极简白底）
3. **线条**：clean geometric lines（干净几何线条）
4. **配色**：accent colors（主题色）
5. **用途**：professional technology slide design（专业科技幻灯片）
6. **排版**：typography + composition（字体 + 构图比例）

### 4. 色板约定

推荐使用**双色系**保持克制：

| 角色 | 色值 | 用途 |
|------|------|------|
| 主色 | `#4A90D9` 天空蓝 | 主要图形元素、正面状态 |
| 强调色 | `#FF8C69` 珊瑚橙 | 次要元素、对比高亮 |
| 文字色 | dark charcoal | 所有嵌入文字 |
| 背景 | white | 全页背景 |

若生图色调偏差，在 Prompt 末尾追加强制色板：
```
color palette strictly limited to soft sky blue #4A90D9 and warm coral #FF8C69 on white
```

特殊场景可替换强调色（如红色用于警告、绿色用于治理），但主色与文字色不变。

## Prompt 编写模板

```
A minimalist flat illustration with bold title text "[标题]" at the top center in dark charcoal,
[主体视觉描述：布局、元素、关系、符号],
[标签描述：each labeled "[中文标签]" positioned near its element],
[可选说明：a small caption text "[中文一句话要点]" at the bottom center],
all label text in clean sans-serif dark charcoal,
flat vector illustration, minimalist white background, clean geometric lines,
soft sky blue and warm coral accent colors, professional technology slide design,
clean modern sans-serif typography, 16:9 wide composition
```

## 编写检查清单

每张 Prompt 写完后，过一遍：

- [ ] **双引号**：所有嵌入文字是否都在 `""` 内？
- [ ] **标题存在**：是否有 `bold title text "..." at the top center`？
- [ ] **中英文分流**：非 AI 专业术语是否已用简体中文？AI 术语是否保留英文？
- [ ] **标签精简**：每个标签是否 ≤ 3 词？
- [ ] **位置指令**：每段文字是否有位置描述（top / below / near / beneath）？
- [ ] **风格锚**：末尾是否追加了统一风格描述？
- [ ] **色板一致**：是否使用了约定色板？特殊色是否有理由？
- [ ] **内容准确**：文字内容是否忠实于原文档，无信息遗漏或逻辑错误？
- [ ] **比例声明**：是否包含 `16:9 wide composition`？

## 整套 Prompt 集编写流程

当需要为一篇完整文档生成全套 PPT 生图 Prompt 时：

1. **通读原文档**，提炼每页的主题、视觉意图、关键信息点
2. **规划 Slide 序列**：封面 → 正文（每个核心概念一页）→ 结语
3. **逐张编写**：先写视觉描述，再嵌入文字，最后追加风格锚
4. **交叉校验**：每张 Prompt 的文字内容与原文档逐条比对，确保无遗漏、无曲解
5. **统一审查**：检查全套色板、字体、构图是否一致
6. **先出封面**：用封面确认风格满意后，再批量生成其余

## 反模式（避免）

| 反模式 | 问题 | 正确做法 |
|--------|------|----------|
| 文字不加双引号 | 模型把文字当描述性语句，不渲染到图上 | 所有嵌入文字用 `""` 框定 |
| 标签过长 | 模型渲染失败或文字模糊 | 单标签 ≤ 3 词 |
| 文字无位置指令 | 文字位置随机，布局混乱 | 每段文字附带位置（top / below / near） |
| 风格描述不统一 | 套图风格不一致 | 使用统一风格锚，逐张追加 |
| 先写文字后想视觉 | 视觉为文字服务，构图受限 | 先构思视觉隐喻，再嵌入文字 |
| 用中文嵌入文字 | 生图模型中文渲染能力差 | 嵌入文字统一用英文 |

## 与其他 Skill 的关系

- **lovart-painter**：负责 Lovart 登录、Session 管理、自动化生图操作。本 Skill 负责 Prompt 编写规范，两者配合使用。
- **aippt**：负责基于垫图模板的 PPT 生成管线。本 Skill 是无垫图场景下的纯 Prompt 生图方案。
- **prompt-assistant**：通用提示词工程方法论。本 Skill 是针对"PPT 生图"这一垂直场景的专用规范。
