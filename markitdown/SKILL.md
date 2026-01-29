---
name: markitdown
description: Convert various file formats to Markdown for LLM consumption and text analysis. Use when you need to convert documents (PDF, Word, PowerPoint, Excel), images (with OCR), audio (with transcription), HTML, or other files to Markdown format. Triggers include "convert to markdown", "extract text from", "parse document", "OCR image", "transcribe audio".
---

# MarkItDown

A lightweight Python utility for converting various files to Markdown, specifically designed for LLM consumption and text analysis pipelines.

## Overview

MarkItDown converts diverse file formats to clean, structured Markdown while preserving important document structure (headings, lists, tables, links, etc.). Built by the Microsoft AutoGen Team, it's optimized for AI workflows rather than human-readable document conversion.

**Key Philosophy:** Mainstream LLMs like GPT-4o natively "speak" Markdown and are trained on vast amounts of Markdown-formatted text. Markdown is also highly token-efficient, making it ideal for LLM processing.

## Supported File Formats

### Documents
- **PDF** - Full text extraction with structure preservation
- **PowerPoint** (.pptx) - Slides, text, tables, with optional LLM-based image descriptions
- **Word** (.docx) - Documents with formatting, tables, lists
- **Excel** (.xlsx, .xls) - Spreadsheets as Markdown tables
- **Outlook** (.msg) - Email messages

### Media
- **Images** (JPG, PNG, etc.)
  - EXIF metadata extraction
  - OCR text extraction
  - Optional LLM-based image descriptions

- **Audio** (WAV, MP3)
  - EXIF metadata extraction
  - Speech-to-text transcription

### Web & Text Formats
- **HTML** - Web pages to Markdown
- **CSV** - Comma-separated values as tables
- **JSON** - Structured data
- **XML** - Markup language data
- **YouTube URLs** - Video transcription
- **EPubs** - Electronic books

### Archives
- **ZIP files** - Iterates over and converts contents

## Installation

**From PyPI (Recommended):**
```bash
# Install with all features
pip install 'markitdown[all]'

# Install with specific features only
pip install 'markitdown[pdf,docx,pptx]'
```

**From Source:**
```bash
cd G:\BaiduSyncdisk\tools\markitdown
pip install -e 'packages/markitdown[all]'
```

**Prerequisites:** Python 3.10 or higher

### Optional Dependencies

Install only the features you need:

```bash
# All features
pip install 'markitdown[all]'

# Specific formats
pip install 'markitdown[pdf]'              # PDF files
pip install 'markitdown[pptx]'             # PowerPoint files
pip install 'markitdown[docx]'             # Word files
pip install 'markitdown[xlsx]'             # Excel files (new)
pip install 'markitdown[xls]'              # Excel files (legacy)
pip install 'markitdown[outlook]'          # Outlook messages
pip install 'markitdown[audio-transcription]'      # Audio files
pip install 'markitdown[youtube-transcription]'    # YouTube videos
pip install 'markitdown[az-doc-intel]'     # Azure Document Intelligence

# Combine multiple
pip install 'markitdown[pdf,docx,pptx,xlsx]'
```

## Usage

### Command Line Interface

**Basic Conversion:**
```bash
# Convert to stdout
markitdown path-to-file.pdf

# Redirect to file
markitdown path-to-file.pdf > document.md

# Specify output file
markitdown path-to-file.pdf -o document.md

# Pipe content
cat path-to-file.pdf | markitdown
```

**With Plugins:**
```bash
# List installed plugins
markitdown --list-plugins

# Use with plugins enabled
markitdown --use-plugins path-to-file.pdf
```

**Azure Document Intelligence:**
```bash
markitdown path-to-file.pdf -o document.md -d -e "<document_intelligence_endpoint>"
```

### Python API

**Basic Usage:**
```python
from markitdown import MarkItDown

# Initialize (plugins disabled by default)
md = MarkItDown(enable_plugins=False)

# Convert a file
result = md.convert("test.xlsx")
print(result.text_content)
```

**With Azure Document Intelligence:**
```python
from markitdown import MarkItDown

md = MarkItDown(docintel_endpoint="<document_intelligence_endpoint>")
result = md.convert("test.pdf")
print(result.text_content)
```

**With LLM Image Descriptions:**
```python
from markitdown import MarkItDown
from openai import OpenAI

client = OpenAI()
md = MarkItDown(
    llm_client=client,
    llm_model="gpt-4o",
    llm_prompt="optional custom prompt"
)
result = md.convert("example.jpg")
print(result.text_content)
```

**Convert from Stream (v0.1.0+):**
```python
from markitdown import MarkItDown
import io

md = MarkItDown()

# Binary file-like object required (breaking change from v0.0.1)
with open("document.pdf", "rb") as f:
    result = md.convert_stream(f, file_extension=".pdf")
    print(result.text_content)

# Or with BytesIO
data = io.BytesIO(pdf_bytes)
result = md.convert_stream(data, file_extension=".pdf")
```

### Docker Usage

```bash
# Build image
docker build -t markitdown:latest .

# Run conversion
docker run --rm -i markitdown:latest < ~/your-file.pdf > output.md
```

## MCP Server Integration

MarkItDown includes an MCP (Model Context Protocol) server for integration with LLM applications like Claude Desktop.

**Install MCP Server:**
```bash
pip install markitdown-mcp
```

**Run STDIO Server (default):**
```bash
markitdown-mcp
```

**Run HTTP/SSE Server:**
```bash
markitdown-mcp --http --host 127.0.0.1 --port 3001
```

**MCP Tool Available:**
- `convert_to_markdown(uri)` - Accepts `http:`, `https:`, `file:`, or `data:` URIs

**Claude Desktop Configuration:**

Add to `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "markitdown": {
      "command": "docker",
      "args": [
        "run",
        "--rm",
        "-i",
        "markitdown-mcp:latest"
      ]
    }
  }
}
```

With directory mount:
```json
{
  "mcpServers": {
    "markitdown": {
      "command": "docker",
      "args": [
        "run",
        "--rm",
        "-i",
        "-v",
        "/home/user/data:/workdir",
        "markitdown-mcp:latest"
      ]
    }
  }
}
```

## Plugin System

MarkItDown supports 3rd-party plugins for custom file format conversions.

**Find Plugins:**
Search GitHub for `#markitdown-plugin`

**Enable Plugins:**
```bash
markitdown --use-plugins path-to-file.pdf
```

```python
md = MarkItDown(enable_plugins=True)
```

**Develop Plugins:**
See `packages/markitdown-sample-plugin` for examples and documentation.

## Common Use Cases

### Convert PDF Documentation
```bash
markitdown technical-manual.pdf -o manual.md
```

### Extract Tables from Excel
```python
from markitdown import MarkItDown

md = MarkItDown()
result = md.convert("data.xlsx")
# Tables are converted to Markdown table format
print(result.text_content)
```

### OCR Scanned Images
```python
from markitdown import MarkItDown

md = MarkItDown()
result = md.convert("scanned-document.jpg")
# OCR text extraction
print(result.text_content)
```

### Transcribe Audio
```bash
# Install audio dependencies first
pip install 'markitdown[audio-transcription]'

markitdown interview.mp3 -o transcript.md
```

### Get YouTube Transcription
```bash
# Install YouTube dependencies first
pip install 'markitdown[youtube-transcription]'

markitdown "https://www.youtube.com/watch?v=..." -o transcript.md
```

### Process ZIP Archives
```python
from markitdown import MarkItDown

md = MarkItDown()
result = md.convert("documents.zip")
# Iterates over all files in ZIP and converts each
print(result.text_content)
```

### Enhanced Image Understanding with LLM
```python
from markitdown import MarkItDown
from openai import OpenAI

client = OpenAI()
md = MarkItDown(
    llm_client=client,
    llm_model="gpt-4o",
    llm_prompt="Describe this image in detail for documentation purposes"
)

result = md.convert("diagram.png")
print(result.text_content)
```

## Breaking Changes (v0.0.1 → v0.1.0)

**Important updates to note:**

1. **Optional Dependencies:** Now organized into feature groups
   - Use `pip install 'markitdown[all]'` for backward compatibility
   - Or install specific features: `[pdf]`, `[docx]`, `[pptx]`, etc.

2. **convert_stream() Change:** Now requires **binary** file-like objects
   - ✅ Use: `open(file, 'rb')`, `io.BytesIO`
   - ❌ Old: `io.StringIO` (no longer supported)

3. **DocumentConverter Interface:** Reads from streams, not file paths
   - No temporary files created anymore
   - Plugin developers need to update custom converters
   - CLI and MarkItDown class users unaffected

## Best Practices

1. **Choose the Right Dependencies:** Install only what you need to minimize package size
2. **Use Streams for Large Files:** Use `convert_stream()` for better memory management
3. **Enable LLM Descriptions Selectively:** Only for images/PPTX where descriptions add value
4. **Cache Conversions:** Store converted Markdown to avoid repeated processing
5. **Structure Matters:** MarkItDown preserves structure - ideal for technical documentation
6. **Token Efficiency:** Markdown format is highly token-efficient for LLM processing

## Project Information

**Location:** G:\BaiduSyncdisk\tools\markitdown
**Developer:** Microsoft AutoGen Team
**License:** MIT
**Python:** 3.10+
**PyPI:** https://pypi.org/project/markitdown/
**GitHub:** https://github.com/microsoft/markitdown

## Packages

The project includes multiple packages:

1. **markitdown** - Main conversion library
2. **markitdown-mcp** - MCP server for Claude Desktop integration
3. **markitdown-sample-plugin** - Plugin development example

## Resources

### Documentation
- **README.md** - Complete project documentation
- **SUPPORT.md** - Support and help resources
- **SECURITY.md** - Security policy and reporting
- **CODE_OF_CONDUCT.md** - Community guidelines
- **packages/markitdown-mcp/README.md** - MCP server documentation

### Development
- **Dockerfile** - Container configuration
- **.devcontainer/** - VS Code dev container setup
- **packages/markitdown-sample-plugin/** - Plugin development guide

## Troubleshooting

**Missing Dependencies:**
```bash
# Install all optional dependencies
pip install 'markitdown[all]'
```

**Binary Stream Error (v0.1.0+):**
```python
# ❌ Wrong - StringIO not supported
with open("file.pdf", "r") as f:
    result = md.convert_stream(f, file_extension=".pdf")

# ✅ Correct - use binary mode
with open("file.pdf", "rb") as f:
    result = md.convert_stream(f, file_extension=".pdf")
```

**Plugin Not Found:**
```bash
# List available plugins
markitdown --list-plugins

# Search for plugins on GitHub
# Use hashtag: #markitdown-plugin
```

**Azure Document Intelligence Setup:**
See: https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/how-to-guides/create-document-intelligence-resource

## Contributing

Find issues and PRs to contribute:
- [All Issues](https://github.com/microsoft/markitdown/issues)
- [Issues Open for Contribution](https://github.com/microsoft/markitdown/issues?q=is%3Aissue+is%3Aopen+label%3A%22open+for+contribution%22)
- [PRs Open for Review](https://github.com/microsoft/markitdown/pulls?q=is%3Apr+is%3Aopen+label%3A%22open+for+reviewing%22)

**Run Tests:**
```bash
cd packages/markitdown
pip install hatch
hatch shell
hatch test
```

**Pre-commit Checks:**
```bash
pre-commit run --all-files
```
