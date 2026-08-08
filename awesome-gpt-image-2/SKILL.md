---
name: awesome-gpt-image-2
description: |
  Use when the user wants GPT Image 2 prompt ideas, image-generation prompt references,
  visual style examples, category-based image prompt inspiration, or help adapting a prompt
  from the YouMind-OpenLab awesome-gpt-image-2 prompt catalog. This skill is a lightweight
  wrapper around the local prompt library; do not load the full catalog unless needed.
metadata:
  source: https://github.com/YouMind-OpenLab/awesome-gpt-image-2
  short-description: GPT Image 2 prompt catalog search and adaptation
---

# Awesome GPT Image 2 Prompt Library

## Purpose

Use this skill to find, adapt, and compose GPT Image 2 prompts from the local copy of the YouMind OpenLab prompt catalog.

This is not a generation backend. It helps with prompt discovery, prompt rewriting, category matching, and prompt construction.

## Source Files

The original repository content is stored under `references/source/`.

Important files:
- `references/source/README.md` - English catalog and prompt examples.
- `references/source/README_zh.md` - Simplified Chinese catalog and prompt examples.
- `references/source/docs/FAQ.md` - model notes and FAQ.
- `references/source/public/images/` - cover assets from the source repo.

## Workflow

1. Clarify the user's image goal if it is underspecified: subject, use case, style, output format, language/text requirements, and constraints.
2. Search the source catalog with targeted keywords instead of reading it all.
3. Select 1-3 relevant source prompt patterns.
4. Adapt the selected pattern to the user's concrete subject and constraints.
5. Return concise, directly usable prompts. Include variants only when useful.

## Search Guidance

Prefer targeted search terms from these axes:
- Use case: avatar, social media, infographic, YouTube thumbnail, comic, product marketing, ecommerce, game asset, poster, app/web design.
- Style: photography, cinematic, anime, illustration, sketch, comic, 3D render, chibi, isometric, pixel art, oil painting, watercolor, ink, retro, cyberpunk, minimalism.
- Subject: portrait, influencer, character, group, product, food, fashion, vehicle, architecture, landscape, cityscape, diagram, typography, abstract.

Use `README_zh.md` for Chinese prompt-writing tasks, and `README.md` for English prompt-writing tasks.

## Output Rules

- Do not paste large portions of the catalog.
- Do not claim the prompt is guaranteed to work; state practical constraints when relevant.
- If the user asks for GPT Image 2 specifically, preserve text-rendering, composition, and consistency details in the prompt.
- For commercial or branded image requests, include explicit brand-safety and rights constraints when needed.
- For Chinese posters/cards, specify exact Chinese text, typography, layout hierarchy, and avoid vague "Chinese style" phrasing.

## Deliverable Shape

For simple requests:

```text
Prompt:
...
```

For exploratory requests:

```text
方向 1：...
Prompt: ...

方向 2：...
Prompt: ...
```

If a source pattern materially influenced the result, mention the source category or prompt number briefly, without quoting long source text.
