---
name: obsidian-notes
description: "Obsidian 笔记管理助手。当用户说「保存笔记」「记笔记」「创建笔记」「记录到Obsidian」「写入Obsidian」「保存到Obsidian」「capture note」「save note」时使用。根据笔记内容自动判断存放位置，应用 Vault 内的模板，创建格式规范的 Obsidian 笔记。Use when saving notes to Obsidian vault, creating documentation, capturing knowledge, or logging any information. This skill determines the correct location and applies the appropriate template from the vault."
---

# Obsidian Notes

## Overview
Save notes to user's Obsidian vault by selecting the appropriate location and template. Templates are read dynamically from the vault itself.

> **来源**: 改编自 [gajewsky/dotfiles - obsidian-notes](https://github.com/gajewsky/dotfiles/tree/main/dot_claude/skills/obsidian-notes)，适配用户本地 Vault 结构。

## Vault Location
The vault is at `G:\CHLobsidian\` (identified by the `.obsidian/` subdirectory).

## Vault Structure
```
G:\CHLobsidian\
├── I - 收集箱/       # Quick captures, unsorted notes, daily captures (default for new files)
├── A - 行动笔记/     # Action notes, TODOs, execution items
├── P - 项目笔记/     # Active projects with defined outcomes (e.g., 公众号文章/)
├── K - 主题笔记/     # Topic-based knowledge notes (e.g., AI人工智能/, 职业规划/)
├── N - 概念笔记/     # Concept notes, atomic ideas, definitions
├── 图片收纳/         # Image assets
└── skills/           # Skills (system-level, not for user notes)
```

## Location Decision Tree
1. **Quick capture or unsorted?** → `I - 收集箱/`
2. **Action item or TODO?** → `A - 行动笔记/`
3. **Active project with a defined end goal?** → `P - 项目笔记/[project-name]/`
4. **Topic-based knowledge or reference?** → `K - 主题笔记/[topic]/`
5. **Atomic concept or definition?** → `N - 概念笔记/`

## Template Discovery
Check for templates within the vault:
1. Look for a `Templates/` or `模板/` directory in the vault
2. List all `.md` files in that directory
3. Match note type to template filename/frontmatter
4. If no match, use minimal frontmatter

## Creating Notes
1. **Determine location** — Use the decision tree to pick the right folder/subfolder
2. **Browse existing structure** — List subdirectories of the target folder to find the best match
3. **Find template** — Check if a template directory exists and match type
4. **Apply template** — Replace placeholders:
   - `{{date}}` → Current date (YYYY-MM-DD)
   - `{{title}}` → Note title
   - `{{time}}` → Current time (HH:MM)
5. **Write file** — Save to determined location

## File Naming
- **Date-based** (diary, daily captures, inbox): `YYYY-MM-DD.md`
- **Book/article**: `Title - Author.md`
- **People**: `First Last.md`
- **General notes**: `Descriptive Title.md` (sentence case)
- **Attachments**: stored in `图片收纳/`

## Minimal Frontmatter
When no template matches, use:

```yaml
---
type: note
created: {{date}}
---
```

## Examples

### Quick capture
User: "保存这个关于重构的想法"

Location: `I - 收集箱/重构想法.md`
Template: Minimal frontmatter

### Project note
User: "创建公众号文章笔记"

1. Browse `P - 项目笔记/` to find existing structure
2. Location: `P - 项目笔记/公众号文章/[title].md`
3. Apply matching template or minimal frontmatter

### Topic knowledge
User: "保存这篇关于 RAG 的笔记"

1. Browse `K - 主题笔记/` to find existing structure (e.g., `AI人工智能/`)
2. Location: `K - 主题笔记/AI人工智能/RAG 检索增强生成.md`
3. Apply minimal frontmatter with topic-relevant tags

### Concept note
User: "记录 Prompt Engineering 的概念"

Location: `N - 概念笔记/Prompt Engineering.md`
Template: Minimal frontmatter

## Notes
- Always include YAML frontmatter with at least `type` and `created`
- Use wikilinks `[[]]` for internal links (Obsidian convention)
- Create subfolders as needed within directories
- The vault uses **简体中文** as primary language, with English for technical terms
- 专业术语首次出现时标注英文原词 (e.g., "检索增强生成 (RAG)")
- Always browse existing directory structure before creating to avoid duplicates
