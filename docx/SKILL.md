---
name: docx
description: "Use this skill whenever the user wants to create, read, edit, or manipulate Word documents (.docx files). Triggers include: any mention of 'Word doc', 'word document', '.docx', or requests to produce professional documents with formatting like tables of contents, headings, page numbers, or letterheads. Also use when extracting or reorganizing content from .docx files, inserting or replacing images in documents, performing find-and-replace in Word files, working with tracked changes or comments, or converting content into a polished Word document. If the user asks for a 'report', 'memo', 'letter', 'template', or similar deliverable as a Word or .docx file, use this skill. Do NOT use for PDFs, spreadsheets, Google Docs, or general coding tasks unrelated to document generation."
license: Proprietary. LICENSE.txt has complete terms
---

# DOCX creation, editing, and analysis

## Overview

A .docx file is a ZIP archive containing XML files.

## Quick Reference

| Task | Approach |
|------|----------|
| Read/analyze content | `pandoc` or unpack for raw XML |
| Create new document | Use `docx-js` - see Creating New Documents below |
| Edit existing document | Unpack → edit XML → repack - see Editing Existing Documents below |

### Converting .doc to .docx

Legacy `.doc` files must be converted before editing:

```bash
python scripts/office/soffice.py --headless --convert-to docx document.doc
```

### Reading Content

```bash
# Text extraction with tracked changes
pandoc --track-changes=all document.docx -o output.md

# Raw XML access
python scripts/office/unpack.py document.docx unpacked/
```

### Converting to Images

```bash
python scripts/office/soffice.py --headless --convert-to pdf document.docx
pdftoppm -jpeg -r 150 document.pdf page
```

### Accepting Tracked Changes

To produce a clean document with all tracked changes accepted (requires LibreOffice):

```bash
python scripts/accept_changes.py input.docx output.docx
```

## Formal Chinese Spec Golden Rules

When a `.docx` is a formal Chinese requirements specification or similar delivery document, preserve semantic Word structure instead of only visual similarity.

- Real chapter titles must use true heading styles. Do not type `1.2` / `3.2` / `4 合格性规定` as plain `Normal` paragraphs just because they look right.
- Real figure and table captions must live in dedicated caption paragraphs outside tables and figures. Do not leave `表 X ...` or `图 X ...` as ordinary body text.
- Body text should use the document's real body style such as `Normal Indent`, not one overloaded `Normal` style for headings, captions, and narrative mixed together.
- After editing a spec, re-check that the TOC is driven only by real heading styles. A fake heading disappears from the TOC; a body paragraph with outline level pollutes it.
- Formal specs should prefer fewer but denser natural paragraphs over many short drafting-style lines.

## Formal Spec Layout Heuristics

For Chinese requirement specs, compare and preserve not only fonts and borders, but also style semantics:

- heading style = document structure
- caption style = figure/table titling
- body style = narrative explanation

Practical checks:

- If the document runs through chapters `1 ~ 7`, then chapters `4 ~ 7` must also be true headings, not manually numbered body lines.
- If a user provides a polished benchmark `.docx`, treat it as both a text reference and a semantic-style reference.
- If a document “looks correct” but almost everything is `Normal`, it is not yet a robust delivery document.
- When matching a benchmark `.docx`, do not rely on default Office heading or caption themes. Explicitly inspect or override:
  - heading font family
  - heading size
  - heading color
  - heading italic/bold behavior
  - caption color and italic behavior
  - caption font family and size
  - body first-line indent
  - body font family and size
  - table header alignment
  - sequence column alignment
  - key name/identifier column alignment
- Formal Chinese specs should not inherit blue heading text, colored captions, or italic fourth-level headings from the Office default theme unless the benchmark explicitly uses them.
- If the benchmark uses black non-italic headings and black captions, generated docs must explicitly enforce those exact settings rather than assuming style inheritance will match.
- For formal spec tables, do not treat alignment as a single global setting. Infer alignment by column role:
  - short metadata columns such as `序号/章节号/优先级/版本号/日期` are usually narrow and centered
  - short identifier columns such as `角色/文档标识/功能名称` can be centered when compact, but should switch left once text length starts hurting readability
  - narrative columns such as `功能描述/内容描述/功能说明/用例目标/解释/变化说明` should get the widest width and usually be left aligned
  - `备注` should stay centered only when it contains short tags; use left alignment once it carries explanatory text
- Preserve table-level choices seen in the benchmark:
  - table body columns may use mixed alignments in one table
  - widths should be intentionally redistributed toward heavy-reading columns rather than mechanically equalized
  - avoid forcing vertical-center alignment in multiline body rows unless the benchmark clearly does so
  - keep fixed column widths when the benchmark uses them instead of relying on autofit

---

## Creating New Documents

Generate .docx files with JavaScript, then validate. Install: `npm install -g docx`

### Setup
```javascript
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, ImageRun,
        Header, Footer, AlignmentType, PageOrientation, LevelFormat, ExternalHyperlink,
        InternalHyperlink, Bookmark, FootnoteReferenceRun, PositionalTab,
        PositionalTabAlignment, PositionalTabRelativeTo, PositionalTabLeader,
        TabStopType, TabStopPosition, Column, SectionType,
        TableOfContents, HeadingLevel, BorderStyle, WidthType, ShadingType,
        VerticalAlign, PageNumber, PageBreak } = require('docx');

const doc = new Document({ sections: [{ children: [/* content */] }] });
Packer.toBuffer(doc).then(buffer => fs.writeFileSync("doc.docx", buffer));
```

### Validation
After creating the file, validate it. If validation fails, unpack, fix the XML, and repack.
```bash
python scripts/office/validate.py doc.docx
```

### Page Size

```javascript
// CRITICAL: docx-js defaults to A4, not US Letter
// Always set page size explicitly for consistent results
sections: [{
  properties: {
    page: {
      size: {
        width: 12240,   // 8.5 inches in DXA
        height: 15840   // 11 inches in DXA
      },
      margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } // 1 inch margins
    }
  },
  children: [/* content */]
}]
```

**Common page sizes (DXA units, 1440 DXA = 1 inch):**

| Paper | Width | Height | Content Width (1" margins) |
|-------|-------|--------|---------------------------|
| US Letter | 12,240 | 15,840 | 9,360 |
| A4 (default) | 11,906 | 16,838 | 9,026 |

**Landscape orientation:** docx-js swaps width/height internally, so pass portrait dimensions and let it handle the swap:
```javascript
size: {
  width: 12240,   // Pass SHORT edge as width
  height: 15840,  // Pass LONG edge as height
  orientation: PageOrientation.LANDSCAPE  // docx-js swaps them in the XML
},
// Content width = 15840 - left margin - right margin (uses the long edge)
```

### Styles (Override Built-in Headings)

Use Arial as the default font (universally supported). Keep titles black for readability.

```javascript
const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 24 } } }, // 12pt default
    paragraphStyles: [
      // IMPORTANT: Use exact IDs to override built-in styles
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, font: "Arial" },
        paragraph: { spacing: { before: 240, after: 240 }, outlineLevel: 0 } }, // outlineLevel required for TOC
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, font: "Arial" },
        paragraph: { spacing: { before: 180, after: 180 }, outlineLevel: 1 } },
    ]
  },
  sections: [{
    children: [
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Title")] }),
    ]
  }]
});
```

### Lists (NEVER use unicode bullets)

```javascript
// ❌ WRONG - never manually insert bullet characters
new Paragraph({ children: [new TextRun("• Item")] })  // BAD
new Paragraph({ children: [new TextRun("\u2022 Item")] })  // BAD

// ✅ CORRECT - use numbering config with LevelFormat.BULLET
const doc = new Document({
  numbering: {
    config: [
      { reference: "bullets",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbers",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    ]
  },
  sections: [{
    children: [
      new Paragraph({ numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Bullet item")] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Numbered item")] }),
    ]
  }]
});
```

### Tables

**CRITICAL: Tables need dual widths** - set both `columnWidths` on the table AND `width` on each cell.

```javascript
const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const borders = { top: border, bottom: border, left: border, right: border };

new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [4680, 4680],
  rows: [
    new TableRow({
      children: [
        new TableCell({
          borders,
          width: { size: 4680, type: WidthType.DXA },
          shading: { fill: "D5E8F0", type: ShadingType.CLEAR },
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
          children: [new Paragraph({ children: [new TextRun("Cell")] })]
        })
      ]
    })
  ]
})
```

### Images

```javascript
new Paragraph({
  children: [new ImageRun({
    type: "png", // Required: png, jpg, jpeg, gif, bmp, svg
    data: fs.readFileSync("image.png"),
    transformation: { width: 200, height: 150 },
    altText: { title: "Title", description: "Desc", name: "Name" }
  })]
})
```

### Page Breaks

```javascript
new Paragraph({ children: [new PageBreak()] })
// Or:
new Paragraph({ pageBreakBefore: true, children: [new TextRun("New page")] })
```

### Hyperlinks

```javascript
// External
new Paragraph({
  children: [new ExternalHyperlink({
    children: [new TextRun({ text: "Click here", style: "Hyperlink" })],
    link: "https://example.com",
  })]
})

// Internal (bookmark)
new Paragraph({ heading: HeadingLevel.HEADING_1, children: [
  new Bookmark({ id: "chapter1", children: [new TextRun("Chapter 1")] }),
]})
new Paragraph({ children: [new InternalHyperlink({
  children: [new TextRun({ text: "See Chapter 1", style: "Hyperlink" })],
  anchor: "chapter1",
})]})
```

### Tab Stops

```javascript
new Paragraph({
  children: [new TextRun("Company Name"), new TextRun("\tJanuary 2025")],
  tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
})
```

### Table of Contents

```javascript
new TableOfContents("Table of Contents", { hyperlink: true, headingStyleRange: "1-3" })
```

### Headers/Footers

```javascript
sections: [{
  headers: {
    default: new Header({ children: [new Paragraph({ children: [new TextRun("Header")] })] })
  },
  footers: {
    default: new Footer({ children: [new Paragraph({
      children: [new TextRun("Page "), new TextRun({ children: [PageNumber.CURRENT] })]
    })] })
  },
  children: [/* content */]
}]
```

### Critical Rules for docx-js

- **Set page size explicitly** - defaults to A4; use US Letter (12240 x 15840 DXA) for US documents
- **Never use `\n`** - use separate Paragraph elements
- **Never use unicode bullets** - use `LevelFormat.BULLET` with numbering config
- **PageBreak must be in Paragraph** - standalone creates invalid XML
- **ImageRun requires `type`** - always specify png/jpg/etc
- **Always set table `width` with DXA** - never use `WidthType.PERCENTAGE`
- **Tables need dual widths** - `columnWidths` array AND cell `width`, both must match
- **Use `ShadingType.CLEAR`** - never SOLID for table shading
- **TOC requires HeadingLevel only** - no custom styles on heading paragraphs
- **Override built-in styles** - use exact IDs: "Heading1", "Heading2", etc.
- **Include `outlineLevel`** - required for TOC (0 for H1, 1 for H2, etc.)

---

## Editing Existing Documents

**Follow all 3 steps in order.**

### Step 1: Unpack
```bash
python scripts/office/unpack.py document.docx unpacked/
```

### Step 2: Edit XML

Edit files in `unpacked/word/`. Use **"Claude"** as the author for tracked changes and comments.

**Use the Edit tool directly for string replacement. Do not write Python scripts.**

**Smart quotes for new content:**
```xml
<w:t>Here&#x2019;s a quote: &#x201C;Hello&#x201D;</w:t>
```

**Adding comments:**
```bash
python scripts/comment.py unpacked/ 0 "Comment text"
python scripts/comment.py unpacked/ 1 "Reply text" --parent 0
```

### Step 3: Pack
```bash
python scripts/office/pack.py unpacked/ output.docx --original document.docx
```

## Windows Word COM Workflow

When editing an existing `.docx` on Windows and layout fidelity matters more than XML purity, prefer Word COM automation over OOXML editing.

### Use Word COM when

- The user wants formatting fixed inside the original `.docx`
- The document contains complex tables, merged cells, or template styles
- The task involves Chinese requirement/specification documents where visual layout matters
- The task requires checking what Word actually renders, not just what XML contains

### Recommended workflow

1. Open the document with Word COM in hidden mode.
2. Make targeted edits to the live document object.
3. Save the document.
4. Re-open in read-only mode and verify the exact cells/paragraphs that were changed.
5. For table-heavy work, run whole-document scans instead of checking only the table the user mentioned.

### Word COM patterns that worked well

#### 1. Clear all table shading

For Chinese spec docs, users often mean "white background" even if Word stores it as "no fill". Clear both the cell shading and any style-driven table banding when needed.

Use this approach:

```powershell
for($i=1;$i -le $doc.Tables.Count;$i++){
  $tbl=$doc.Tables.Item($i)
  try{ $tbl.ApplyStyleHeadingRows = $false }catch{}
  try{ $tbl.ApplyStyleLastRow = $false }catch{}
  try{ $tbl.ApplyStyleFirstColumn = $false }catch{}
  try{ $tbl.ApplyStyleLastColumn = $false }catch{}
  try{ $tbl.ApplyStyleRowBands = $false }catch{}
  try{ $tbl.ApplyStyleColumnBands = $false }catch{}
  for($r=1;$r -le $tbl.Rows.Count;$r++){
    for($c=1;$c -le $tbl.Columns.Count;$c++){
      try{
        $cell=$tbl.Cell($r,$c)
        $cell.Shading.Texture = 0
        $cell.Shading.BackgroundPatternColor = 16777215
        $cell.Shading.ForegroundPatternColor = 16777215
      }catch{}
    }
  }
}
```

Then verify by scanning all table cells and reporting any non-white / non-empty shading state.

#### 2. Remove polluted table headers

If section intro paragraphs accidentally get inserted into the first header cell, do not just trust markdown export. Inspect the actual first cell of the affected table in Word.

Typical fix:

- Reset `Cell(1,1).Range.Text` back to `序号`
- Keep the rest of the header cells intact
- Re-check the full first row after saving

This was necessary for cases where intro text was merged into tables like `TABLE 8`, `TABLE 11`, and `TABLE 14`.

#### 3. Remove sparse business rows

When users complain that "a code is sitting alone on one row", scan every business table for rows where only one cell is non-empty.

Use header-based filtering:

- Treat a table as a business table when its headers include fields such as `功能名称/标识`, `子功能名称/标识`, `功能说明`, `功能描述`, `用例（事件）名称/标识`, `用例目标`, or `接口名称/标识`
- For those tables, delete rows from bottom to top when the non-empty cell count is `<= 1`

This catches more cases than manually fixing only the user-mentioned table.

#### 4. Rewrite repeated requirement descriptions

If a requirements table has multiple rows with identical "功能描述" or "功能说明", rewrite each row separately instead of using one generic sentence.

For Chinese requirement/spec documents, prefer descriptions that naturally encode:

- Trigger timing
- Operating context
- Target users/roles
- What the subsystem does
- Why it exists relative to the old manual process
- What result/effect it produces

Do not literally write `when / where / who / what / why / effect`. Fold them into one natural requirement sentence.

#### 5. Normalize Chinese body paragraphs

For正文段落 in Chinese spec docs, a common expected baseline is:

- `宋体`
- `小四` (12pt)
- First-line indent
- 1.5 line spacing
- Avoid extra blank paragraphs between normal body paragraphs

Apply only to non-table body paragraphs. Skip headings, captions like `表 6 ...`, TOC, and empty paragraphs.

### Verification rules for Word COM edits

Never stop after saving. Always verify with one or more of these:

- Dump specific rows/cells from the target tables
- Scan all business tables for sparse rows
- Scan all table cells for shading state
- Re-check the rows the user explicitly complained about

If Word throws RPC errors during `Quit()` or `Close()` after a successful `Save()`, treat that as a shutdown issue, not automatically as edit failure. Re-open the file and verify the actual content before deciding whether the changes were lost.

### Practical guidance for Chinese requirement docs

- Users may refer to "表 4" based on visible captions, while Word table indices differ; confirm by reading both captions and live table contents
- Do not assume one bad table is isolated; users often expect a whole-document cleanup pass
- Prefer fixing the `.docx` directly rather than converting to markdown when the complaint is visual formatting
- When users mention template conformity, preserve chapter structure and table structure instead of creatively adding sections

---

## XML Reference

### Tracked Changes

```xml
<!-- Insertion -->
<w:ins w:id="1" w:author="Claude" w:date="2025-01-01T00:00:00Z">
  <w:r><w:t>inserted text</w:t></w:r>
</w:ins>

<!-- Deletion -->
<w:del w:id="2" w:author="Claude" w:date="2025-01-01T00:00:00Z">
  <w:r><w:delText>deleted text</w:delText></w:r>
</w:del>
```

### Comments

```xml
<w:commentRangeStart w:id="0"/>
<w:r><w:t>commented text</w:t></w:r>
<w:commentRangeEnd w:id="0"/>
<w:r><w:rPr><w:rStyle w:val="CommentReference"/></w:rPr><w:commentReference w:id="0"/></w:r>
```

---

## Dependencies

- **pandoc**: Text extraction
- **docx**: `npm install -g docx` (new documents)
- **LibreOffice**: PDF conversion (auto-configured via `scripts/office/soffice.py`)
- **Poppler**: `pdftoppm` for images
