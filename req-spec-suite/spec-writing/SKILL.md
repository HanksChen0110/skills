---
name: spec-writing
description: Coordinate Chinese specification-writing work across the spec-writing skill suite. Use when the user says `/spec-writing`, mentions `spec-writing`, or wants to write, rewrite, standardize, review, split, or complete a Chinese requirements or specification document from inputs such as Word templates, existing `.docx` specs, PRDs, meeting notes, requirement outlines, review comments, user stories, business rules, interfaces, role permissions, state transitions, acceptance criteria, or chapter- and table-level spec tasks.
---

# Spec Writing Router

Use this skill as the entry point for the `spec-writing` skill pack.

When this skill triggers, do not solve everything from this file alone. First classify the request, then read and use the most relevant child skill or minimal child-skill set below.

## Routing Rule

- If the user asks for a full Chinese requirements specification document, full-document rewrite, or strict template-based standardization, use `gjb438c-req-spec-writer`.
- If the user asks for content from chapter 1 through section `3.1.3`, use `req-spec-pre32-writer`.
- If the user asks for chapter 3, especially section `3.2 CSCI capability requirements`, use `req-spec-ch3-writer`.
- If the user asks for content from section `3.3` through chapter `7`, use `req-spec-tail-writer`.
- If the user asks to review or audit an existing spec for template compliance, completeness, table quality, or delivery readiness, use `req-spec-reviewer`.
- If the user asks for acceptance criteria, verification points, or how to check a requirement, use `acceptance-criteria-writer`.
- If the user asks to extract or formalize business rules, rule statements, calculations, conditions, or exception rules, use `business-rules-writer`.
- If the user asks to turn requirements into a reviewable functional solution or bridge requirements into functional design, use `functional-design-writer`.
- If the user asks to organize interface contracts, field definitions, validation rules, enums, ranges, units, or data mappings, use `interface-data-constraint-writer`.
- If the user asks to define roles, permissions, responsibilities, or access boundaries, use `role-permission-writer`.
- If the user asks to make state transitions, node conditions, exception branches, rollback logic, or recovery rules explicit, use `state-transition-exception-writer`.
- If the user asks to convert requirements into structured Chinese user stories, use `user-story-writer`.

## Input-First Routing

Route from the user's actual input artifacts before routing by abstract task name.

- If the user provides a formal Word template plus a target `.docx`, prioritize a template-aligned spec writer first, usually `gjb438c-req-spec-writer`, and combine with `doc` or `docx` when formatting fidelity matters.
- If the user provides an existing requirements specification and asks to continue or repair only part of it, route by section boundary:
  - `1 ~ 3.1.3` -> `req-spec-pre32-writer`
  - `3.2` or chapter 3 core capability tables -> `req-spec-ch3-writer`
  - `3.3 ~ 7` -> `req-spec-tail-writer`
- If the user provides PRDs, briefs, meeting notes, research notes, or loose requirement fragments rather than a finished spec, first convert the material into clearer intermediate artifacts:
  - user intent and scenarios -> `user-story-writer`
  - policy logic and calculations -> `business-rules-writer`
  - reviewable solution structure -> `functional-design-writer`
  - interfaces and fields -> `interface-data-constraint-writer`
  - roles and access boundaries -> `role-permission-writer`
  - states, rollback, and abnormal branches -> `state-transition-exception-writer`
  - acceptance and verification -> `acceptance-criteria-writer`
  Then route back into the appropriate spec writer.
- If the user provides review feedback, asks for template checking, gap filling, spec review, or a delivery gate, use `req-spec-reviewer` before making further rewrites.

## Fast Intent Map

Use these defaults when the request is short or ambiguous.

- "write the spec" -> `gjb438c-req-spec-writer`
- "write the first half" or "write through 3.1.3" -> `req-spec-pre32-writer`
- "patch 3.2", "patch subsystem capability tables", or "patch chapter 3 tables" -> `req-spec-ch3-writer`
- "write the second half", "finish interfaces", "finish constraints", "finish traceability", or "finish deliverables" -> `req-spec-tail-writer`
- "review this spec" -> `req-spec-reviewer`
- "organize business rules" -> `business-rules-writer`
- "write acceptance criteria" -> `acceptance-criteria-writer`
- "write user stories" -> `user-story-writer`
- "organize state transitions" or "organize exceptions" -> `state-transition-exception-writer`
- "organize roles and permissions" -> `role-permission-writer`
- "organize interfaces and field constraints" -> `interface-data-constraint-writer`
- "turn requirements into functional design" -> `functional-design-writer`

## Child Skills

- `acceptance-criteria-writer`
  Use for acceptance criteria and verification points.
- `business-rules-writer`
  Use for business rules, decision logic, and exception rules.
- `functional-design-writer`
  Use for turning analyzed requirements into functional design notes.
- `gjb438c-req-spec-writer`
  Use for full Chinese requirement and specification documents aligned to the GJB 438C style and strict Word templates.
- `interface-data-constraint-writer`
  Use for interfaces, data constraints, field definitions, and mappings.
- `req-spec-ch3-writer`
  Use for chapter 3, especially section `3.2 CSCI capability requirements`.
- `req-spec-pre32-writer`
  Use for chapter 1 through section `3.1.3`.
- `req-spec-reviewer`
  Use for quality review and template-compliance checking.
- `req-spec-tail-writer`
  Use for section `3.3` through chapter `7`.
- `role-permission-writer`
  Use for roles, permissions, and responsibility boundaries.
- `state-transition-exception-writer`
  Use for state changes, abnormal flows, rollback, and recovery.
- `user-story-writer`
  Use for structured Chinese user stories.

## Combining Skills

- For a full spec from raw materials, use this common sequence:
  `user-story-writer` or `business-rules-writer` or `functional-design-writer` first when needed, then `req-spec-pre32-writer`, then `req-spec-ch3-writer`, then `req-spec-tail-writer`, and finally `req-spec-reviewer`.
- For a Word-based deliverable, combine the selected spec-writing child skill with `doc` or `docx` when the user cares about `.docx` fidelity, formatting, or template conformance.
- For partial requests, read only the child skills needed for that request instead of loading the whole suite.
- If the selected child skill has a local reference file such as `references/需规写作宪法.md`, read it before writing or rewriting content.

## Table And Chapter Repair Rules

When the user is not asking for a new document but for targeted repair, route by the smallest stable unit first.

- If the complaint is about chapter structure, missing sections, or misplaced content, use the chapter writer that owns that span.
- If the complaint is about tables in chapter 3, especially function decomposition, use `req-spec-ch3-writer`.
- If the complaint is about rule wording, exception wording, or role wording inside an existing section, prefer the specialized writer first, then patch the affected chapter.
- If the complaint is about formatting in a Word deliverable, pair the selected spec-writing child skill with `doc` or `docx` instead of solving it only as a writing task.

## Template Discipline

- Treat the user-provided Word template as the single source of truth for fixed chapter names, table organization, and formal wording boundaries.
- Do not invent extra chapter levels, extra tables, or alternative section names unless the user explicitly asks.
- If the user says the titles must match the template exactly, preserve title text literally and vary only body content.
- If the user asks for strict formatting conformity, let `doc` or `docx` own formatting execution and let the chosen spec-writing child skill own content logic.

## Recent Delivery Rules

- In Word deliverables, table captions must stay outside tables. Do not merge `表 X ...` captions into table header rows or into the first cell of any table.
- If a table already contains only header fields in row 1, treat that as correct and do not add caption text into the table.
- Unnumbered inline mini-headings in body text should be upgraded to numbered headings when they function as real subsections. Avoid leaving standalone labels such as `核心功能模块边界` without a section number.
- Keep the document in a true top-down structure: names, roles, subsystems, and data objects introduced later must be introduced earlier in `系统概述` or `需求总述`.
- Four-level headings such as `3.2.3.1 功能分解` must use `黑体`, not `微软雅黑`.
- Body paragraphs in Chinese requirement specs should keep first-line indent and should not silently lose indentation after content rewrites.
- After structural edits, always rebuild and re-check the table of contents so only actual headings appear there. Normal body paragraphs must not leak into the TOC through outline levels.
- Do not fake chapter structure with plain `Normal` paragraphs such as `3.2 CSCI能力需求` or `4 合格性规定`. Full-document specs must use true heading styles from chapter `1` through chapter `7`.
- In pre-`3.2` chapters, first establish the business panorama, then the system insertion point, then the typical sample scenario, then the platform/base and differentiation. Do not jump straight into subsystem self-description.
- When the system empowers only part of a broader business chain, explicitly write the mapping as “业务总层 -> 当前重点环节 -> 系统模块分层”, so the document does not over-claim full business coverage.
- For formal Chinese specs, prefer complete natural paragraphs with stronger information density over many short, checklist-like body lines.

## Default Behavior

- If the user only says `/spec-writing` without enough detail, infer the most likely route from the files and context already provided.
- If multiple child skills are needed, use the minimal set that covers the task.
- Preserve the user's confirmed template structure and fixed terminology.
- Do not invent extra chapters, tables, or frameworks beyond the target template unless the user explicitly asks.
- When in doubt, choose the narrowest child skill that can move the document forward without rewriting unrelated sections.
