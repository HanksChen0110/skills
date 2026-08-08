---
name: personal-showcase-page
description: Create, optimize, iterate, or explain CHL personal showcase pages and AI portfolio packages. Use for personal display webpages, interview portfolio pages, AI works packages, and Markdown presentation scripts.
---

# Personal Showcase Page

Use this skill to help CHL create or refine a personal showcase page for recruiters, interviewers, colleagues, or friends. Keep the work focused on a single-page static HTML portfolio plus a Markdown presentation script.

## Required Context

Before generating or changing output, read these source documents:

- `G:\vibecoding\我的AI作品包\00_作品方向一句话.md`
- `G:\vibecoding\我的AI作品包\01_项目资料.md`
- `G:\vibecoding\我的AI作品包\02_AI协作记录.md`

Use the fixed avatar path whenever a personal photo is needed:

- `G:\vibecoding\我的AI作品包\Image 214.png`

## Workflow

1. Read the required context files.
2. Check whether the input materials are complete enough. Use `references/material-checklist.md`.
3. If required information is missing, stop and ask CHL to complete the missing fields before generating the page.
4. Confirm the HTML output directory if the user did not specify it. Do not choose one silently.
5. Generate or update a static HTML personal showcase page.
6. Generate a Markdown presentation script in `G:\vibecoding\作品讲述稿归档` using the default filename `YYYY-MM-DD-个人展示页作品讲述稿.md` unless the user gives another name.
7. After edits, run practical verification: read back generated files, check key modules, check avatar path, and verify there is no obvious garbled text or missing required section.

For detailed execution steps, use `references/workflow.md`.

## Page Requirements

The personal showcase page must include these modules by default:

- Personal introduction
- Project experience
- Methodology
- Works or demo showcase
- Contact section

Keep the page suitable for recruiters, interviewers, company colleagues, and non-technical friends. The tone should be clear, confident, and human, not stiff or AI-generated.

## Boundaries

Do not build login, payment, database, account systems, order flows, or multi-page systems unless CHL explicitly asks later.

Do not invent personal experience, project outcomes, revenue numbers, contact details, screenshots, or external facts. If data is missing, ask for it.

Do not use placeholder avatars, random portraits, or unrelated images instead of the fixed avatar path.

Do not use a strong AI-flavored purple or purple-blue gradient as the dominant visual style. If a technology feel is needed, prefer restrained professional layouts, readable contrast, and visual details grounded in the portfolio content.

