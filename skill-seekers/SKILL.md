---
name: skill-seekers
description: Automatically convert documentation websites, GitHub repositories, and PDFs into Claude AI skills. Use when you need to create a skill from documentation sources (websites, repos, PDFs), combine multiple sources, detect conflicts between docs and code, or package skills for Claude. Triggers include "create skill from", "scrape documentation", "convert docs to skill", "analyze GitHub repo for skill".
---

# Skill Seekers

Automatically transform documentation websites, GitHub repositories, and PDF files into production-ready Claude AI skills in minutes.

## Overview

Skill Seeker automates the entire process of creating Claude skills from external sources. Instead of manually reading and summarizing documentation, it scrapes, analyzes, organizes, and packages content into ready-to-use skills.

## Core Capabilities

### 1. Multi-Source Scraping

Skill Seekers can scrape from three main sources:

**Documentation Websites:**
- Universal scraper works with any documentation site
- Automatic llms.txt detection (10x faster when available)
- Smart categorization by topic
- Code language detection (Python, JavaScript, C++, GDScript, etc.)

**GitHub Repositories:**
- Deep code analysis with AST parsing
- API extraction (functions, classes, methods with types)
- Repository metadata (README, file tree, languages)
- Issues & PRs with labels and milestones
- CHANGELOG & release history

**PDF Files:**
- Text, code, and image extraction
- OCR for scanned documents
- Password-protected PDF support
- Table extraction
- Parallel processing for speed

### 2. Unified Multi-Source Skills (v2.0.0+)

**NEW:** Combine multiple sources in a single skill:
- Mix documentation + GitHub code + PDFs
- Automatic conflict detection between docs and implementation
- Intelligent merging (rule-based or AI-powered)
- Documentation gap analysis
- Side-by-side comparison with warnings

### 3. AI Enhancement

**LOCAL Enhancement (No API Costs):**
- Uses Claude Code Max for free enhancement
- Transforms basic templates into comprehensive guides
- Extracts best examples and key concepts
- Takes ~60 seconds per skill

### 4. Performance Features

- **Async Mode**: 2-3x faster scraping with `--async` flag
- **Large Documentation**: Handles 10K-40K+ page docs with intelligent splitting
- **Router/Hub Skills**: Intelligent routing to specialized sub-skills
- **Checkpoint/Resume**: Never lose progress on long scrapes
- **Caching System**: Scrape once, rebuild instantly

## Installation

**From PyPI (Recommended):**
```bash
pip install skill-seekers
```

**From Source:**
```bash
cd G:\BaiduSyncdisk\tools\Skill_Seekers
pip install -e .
```

## Basic Usage

### Quick Start - Single Source

**Using Presets:**
```bash
# Use one of 8+ ready-to-use presets
skill-seekers scrape --config configs/godot.json
skill-seekers scrape --config configs/react.json
skill-seekers scrape --config configs/django.json
skill-seekers scrape --config configs/fastapi.json
```

**Interactive Mode:**
```bash
skill-seekers scrape --interactive
```

**Quick Command:**
```bash
skill-seekers scrape --name react --url https://react.dev/
```

### Unified Multi-Source Skills

**Combine Documentation + GitHub:**
```bash
# Detects conflicts between docs and actual code
skill-seekers unified --config configs/react_unified.json
skill-seekers unified --config configs/django_unified.json
skill-seekers unified --config configs/fastapi_unified.json
```

### Enhancement & Packaging

**Enhance with AI (Local):**
```bash
# FREE - uses Claude Code Max, no API key needed
skill-seekers enhance output/godot/
```

**Package for Claude:**
```bash
skill-seekers package output/godot/
# Creates godot.zip ready to upload to Claude
```

## Complete Workflow

**Recommended workflow for creating a new skill:**

```bash
# 1. Install dependencies (once)
pip install skill-seekers

# 2. Scrape with local enhancement
skill-seekers scrape --config configs/react.json --enhance-local
# Takes 15-30 minutes (scraping) + 60 seconds (enhancement)

# 3. Package
skill-seekers package output/react/

# 4. Upload react.zip to Claude and use!
```

**Alternative - Enhance After Scraping:**
```bash
# Scrape only
skill-seekers scrape --config configs/react.json

# Enhance later
skill-seekers enhance output/react/

# Package
skill-seekers package output/react/
```

## Configuration Files

**Available Presets (configs/ directory):**

Single-source configs:
- `godot.json` - Godot Engine documentation
- `react.json` - React documentation
- `vue.json` - Vue.js documentation
- `django.json` - Django documentation
- `fastapi.json` - FastAPI documentation
- And 9+ more presets

Unified multi-source configs:
- `react_unified.json` - React docs + GitHub
- `django_unified.json` - Django docs + GitHub
- `fastapi_unified.json` - FastAPI docs + GitHub
- `godot_unified.json` - Godot docs + GitHub

**Custom Config Structure:**
```json
{
  "name": "myframework",
  "base_url": "https://docs.myframework.com/",
  "content_selector": "article",
  "max_pages": 100,
  "categories": {
    "guides": "guide|tutorial",
    "api": "api|reference",
    "examples": "example|sample"
  }
}
```

## MCP Integration

**Skill Seekers includes 9 MCP tools for Claude Code:**

- `mcp__skill-seeker__list_configs` - List available presets
- `mcp__skill-seeker__generate_config` - Create config for any docs site
- `mcp__skill-seeker__validate_config` - Validate config structure
- `mcp__skill-seeker__estimate_pages` - Estimate page count before scraping
- `mcp__skill-seeker__scrape_docs` - Scrape and build skill
- `mcp__skill-seeker__package_skill` - Package into .zip (auto-upload)
- `mcp__skill-seeker__upload_skill` - Upload to Claude
- `mcp__skill-seeker__split_config` - Split large documentation
- `mcp__skill-seeker__generate_router` - Generate router/hub skills

**Setup:**
```bash
cd G:\BaiduSyncdisk\tools\Skill_Seekers
./setup_mcp.sh
```

See `docs/MCP_SETUP.md` for detailed instructions.

## Advanced Features

### Using Existing Data (Fast Rebuild)

After first scrape, rebuild instantly:
```bash
skill-seekers scrape --config configs/godot.json --skip-scrape
```

Or when prompted:
```
✓ Found existing data: 245 pages
Use existing data? (y/n): y
```

### Test with Small Pages First

Edit config to limit pages:
```json
{
  "max_pages": 20  // Test with just 20 pages
}
```

### Async Mode for Speed

```bash
skill-seekers scrape --config configs/react.json --async
# 2-3x faster than synchronous mode
```

### Conflict Detection

When using unified configs, conflicts are automatically detected:
- Documentation vs actual code API signatures
- Outdated examples in documentation
- Undocumented features in code
- Type mismatches

Results show side-by-side comparison with ⚠️ warnings.

## Output Structure

```
output/
├── framework_data/          # Raw scraped data (reusable!)
│   ├── pages.json
│   └── metadata.json
└── framework/               # The skill
    ├── SKILL.md            # Enhanced with code examples
    └── references/         # Organized by category
        ├── guides.md
        ├── api.md
        └── examples.md
```

## Tips & Best Practices

1. **Start with presets** - Use existing configs as templates
2. **Test small first** - Set `max_pages: 20` for initial testing
3. **Use caching** - Scrape once, rebuild multiple times
4. **Enable enhancement** - Local AI enhancement is free and valuable
5. **Try unified mode** - Catch discrepancies between docs and code
6. **Use async mode** - 2-3x faster for large documentation sets

## Troubleshooting

**Dependencies missing:**
```bash
pip install requests beautifulsoup4
```

**Scraping fails:**
- Check `content_selector` in config matches actual site structure
- Try `--max-pages 5` for testing
- Check network connectivity

**Enhancement fails:**
- Ensure Claude Code Max is available
- Check output directory permissions

**See also:**
- `TROUBLESHOOTING.md` - Comprehensive troubleshooting guide
- `BULLETPROOF_QUICKSTART.md` - Beginner-friendly guide
- `README.md` - Complete documentation

## Project Information

**Location:** G:\BaiduSyncdisk\tools\Skill_Seekers
**Version:** v2.1.1
**License:** MIT
**Python:** 3.10+
**Tests:** 427 passing
**PyPI:** https://pypi.org/project/skill-seekers/

## Resources

### Documentation Files

- `README.md` - Complete project documentation
- `QUICKSTART.md` - Quick start guide
- `BULLETPROOF_QUICKSTART.md` - Beginner guide
- `TROUBLESHOOTING.md` - Common issues and solutions
- `CLAUDE.md` - Claude Code guidance
- `docs/MCP_SETUP.md` - MCP server setup

### Configuration Files

All preset configs are in `configs/` directory - copy and customize as needed.

### Example Workflows

See `QUICKSTART.md` for complete workflow examples and best practices.
