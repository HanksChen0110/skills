---
name: docx-to-markdown-fidelity
description: Use when converting `.docx` files to Markdown, especially when the user wants heading levels, tables, figure captions, and embedded images preserved for Obsidian or other Markdown note systems. Trigger on requests like "docx to markdown", "save to Obsidian", "keep images", "keep heading levels", or when generic converters flatten headings into bold text or drop media.
---

# DOCX To Markdown Fidelity

## Overview
Convert Word documents to Markdown with higher structural fidelity than generic text extractors. Prefer the bundled PowerShell scripts when the output must keep numbered heading hierarchy, Markdown tables, figure/image references, and an adjacent `.assets/` folder for embedded media.

If the user only needs quick text extraction or is converting non-Word formats such as PDF, PPTX, XLSX, HTML, images, audio, or mixed-format inputs, prefer `markitdown` instead of this skill.

## Workflow
1. Decide whether fidelity matters.
   Use this skill when the user cares about Markdown structure, Obsidian compatibility, or embedded images.
   Do not default to generic converters when the user explicitly wants images and heading levels preserved.
2. If the `.docx` may be open in Word, copy it first with [scripts/copy-locked-docx.ps1](scripts/copy-locked-docx.ps1).
3. Run [scripts/export-docx-markdown.ps1](scripts/export-docx-markdown.ps1) to produce:
   - `<target>.md`
   - `<target>.assets/` with extracted embedded images
4. Verify the result before claiming completion.
   - Read the generated Markdown head to confirm numbered headings became `#` / `##` / `###` / `####`
   - Count `![](` image references in the Markdown
   - Count exported files in the `.assets/` directory
   - These counts should line up when the source document contains embedded images
5. Tell the user what was preserved and what Markdown still cannot mirror exactly.
   - Word cover-page layout, TOC page numbers, merged-cell visuals, and exact pagination do not survive as native Markdown formatting
   - Preserve content and structure, not page-perfect Word rendering

## Commands
Preferred one-shot command:

```powershell
& "C:\Users\40901\.codex\skills\docx-to-markdown-fidelity\scripts\export-docx-markdown.ps1" `
  -InputDocx "G:\path\source.docx" `
  -OutputMarkdown "G:\path\target.md"
```

If finer control is needed:

```powershell
$copied = & ".\scripts\copy-locked-docx.ps1" -Path "G:\path\source.docx"
& ".\scripts\convert-docx-to-markdown.ps1" `
  -InputDocx $copied `
  -OutputMarkdown "G:\path\target.md"
```

## What The Converter Preserves
- Numbered headings such as `1`, `1.2`, `1.2.3`, `1.2.3.4`
- Native Word heading styles such as `Heading 1` to `Heading 6`
- Paragraph order, tables, and figure/table caption text
- Embedded document images extracted to a sibling `.assets/` directory
- Repeated references to the same embedded image without duplicating the file export

## What The Converter Does Not Promise
- Exact Word pagination, line wrapping, or cover-page composition
- Native Markdown support for merged-cell table layout fidelity
- Reconstruction of generated page-number TOCs as semantic Markdown navigation
- OCR of rasterized text inside screenshots or diagrams

## Verification Checklist
- Confirm the target Markdown file exists and is UTF-8 readable
- Confirm the sibling `.assets/` directory exists when the source contains embedded images
- Inspect the top 50-100 lines for real Markdown headings rather than bold-only pseudo-headings
- Search for `![](` in the output and compare with the number of exported image files
- Spot-check at least one table and one figure caption in the generated Markdown

## Common Mistakes
- Running generic converters first and only noticing afterwards that headings collapsed into bold paragraphs
- Overwriting the target Markdown without also updating the sibling `.assets/` directory
- Forgetting that a Word-locked file may need to be copied before zip-based extraction
- Claiming success without checking that image references and exported image counts match

## Scripts
- [scripts/export-docx-markdown.ps1](scripts/export-docx-markdown.ps1)
  - Safe default entrypoint
  - Copies a locked source file to `%TEMP%`
  - Converts the copied `.docx` to Markdown and exports embedded images
- [scripts/copy-locked-docx.ps1](scripts/copy-locked-docx.ps1)
  - Opens a `.docx` with read/share access and writes a temporary copy
- [scripts/convert-docx-to-markdown.ps1](scripts/convert-docx-to-markdown.ps1)
  - Parses OOXML directly from the `.docx` zip
  - Detects heading levels from Word heading styles and numbered heading text
  - Converts tables to Markdown tables
  - Extracts embedded images through document relationships into `.assets/`

Use this skill as the default path for high-fidelity `.docx` to Markdown export on this Windows machine.
