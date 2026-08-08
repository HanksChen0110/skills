#!/usr/bin/env python3
"""Validate gx-zhks skill structure, routing guardrails, tokens, and registrations."""

from __future__ import annotations

import re
import sys
from pathlib import Path

import yaml


SKILL_ROOT = Path(__file__).resolve().parents[1]
SKILL_MD = SKILL_ROOT / "SKILL.md"
OPENAI_YAML = SKILL_ROOT / "agents" / "openai.yaml"
REFERENCES = SKILL_ROOT / "references"

REQUIRED_REFERENCES = (
    "teal-theme.md",
    "teal-components.md",
    "ai-copilot-pattern.md",
    "teal-platform-mapping.md",
    "visual-craft.md",
    "tokens.md",
    "components.md",
    "page-patterns.md",
    "platform-mapping.md",
)

REQUIRED_TOKENS = {
    "--brand": "#1ba2a0",
    "--page": "#eef3f2",
    "--page-alt": "#f6f9f8",
    "--card": "#ffffff",
    "--divider": "#dde6e4",
    "--text": "#1f3a36",
    "--text-secondary": "#4a6b65",
    "--text-muted": "#8ca39d",
    "--status-red": "#e6524e",
    "--status-orange": "#f5a623",
    "--status-yellow": "#f5d423",
    "--status-green": "#2fbf71",
}

EXTERNAL_SOURCES = (
    Path(r"G:\CHLobsidian\40_知识库\观想\开发知识与标准\设计规范 — 青绿矿山主题（跨技术栈通用 · 单主题）.md"),
    Path(r"G:\AI_products\gx_tkplatform"),
    Path(r"G:\AI_products\gx_tkplatform\kcfx"),
)

RUNTIME_REGISTRATIONS = (
    Path(r"C:\Users\admin\.codex\skills\gx-zhks-frontend-design"),
    Path(r"C:\Users\admin\.claude\skills\gx-zhks-frontend-design"),
)


def frontmatter(path: Path) -> dict:
    content = path.read_text(encoding="utf-8")
    match = re.match(r"^---\r?\n(.*?)\r?\n---", content, re.DOTALL)
    if not match:
        raise ValueError(f"{path}: invalid YAML frontmatter")
    data = yaml.safe_load(match.group(1))
    if not isinstance(data, dict):
        raise ValueError(f"{path}: frontmatter must be a mapping")
    return data


def main() -> int:
    failures: list[str] = []
    checks = 0

    for path in (SKILL_MD, OPENAI_YAML):
        checks += 1
        if not path.is_file():
            failures.append(f"missing file: {path}")

    for name in REQUIRED_REFERENCES:
        checks += 1
        if not (REFERENCES / name).is_file():
            failures.append(f"missing reference: {name}")

    if SKILL_MD.is_file():
        checks += 1
        try:
            data = frontmatter(SKILL_MD)
            allowed = {"name", "description", "license", "allowed-tools", "metadata"}
            unexpected = set(data) - allowed
            if unexpected:
                failures.append(
                    "unsupported SKILL.md frontmatter keys: "
                    + ", ".join(sorted(unexpected))
                )
            if data.get("name") != "gx-zhks-frontend-design":
                failures.append("SKILL.md name does not match directory")
            if not isinstance(data.get("metadata", {}).get("version"), str):
                failures.append("metadata.version must be a quoted string")
        except (ValueError, yaml.YAMLError) as exc:
            failures.append(str(exc))

        skill_text = SKILL_MD.read_text(encoding="utf-8")
        routing_markers = (
            "If both groups appear",
            "Capability terms never override or infer the visual route",
            "A / 默认 / proceed / 随便 / 继续 / 新版",
            "Keep the selected route for the current task",
        )
        for marker in routing_markers:
            checks += 1
            if marker not in skill_text:
                failures.append(f"missing routing guardrail: {marker}")

    if OPENAI_YAML.is_file():
        checks += 1
        try:
            openai_data = yaml.safe_load(OPENAI_YAML.read_text(encoding="utf-8"))
            prompt = openai_data["interface"]["default_prompt"]
            if "ask me to choose" not in prompt:
                failures.append("Codex default_prompt does not preserve route choice")
            if openai_data.get("policy", {}).get("allow_implicit_invocation") is not True:
                failures.append("Codex implicit invocation is not enabled")
        except (KeyError, TypeError, yaml.YAMLError) as exc:
            failures.append(f"invalid agents/openai.yaml: {exc}")

    theme_path = REFERENCES / "teal-theme.md"
    if theme_path.is_file():
        theme_text = theme_path.read_text(encoding="utf-8").lower()
        for token, value in REQUIRED_TOKENS.items():
            checks += 1
            pattern = rf"{re.escape(token)}\s*:\s*{re.escape(value)}"
            if not re.search(pattern, theme_text):
                failures.append(f"token mismatch or missing: {token} = {value}")

    platform_path = REFERENCES / "teal-platform-mapping.md"
    if platform_path.is_file():
        checks += 1
        if "## Visual Verification Gate" not in platform_path.read_text(
            encoding="utf-8"
        ):
            failures.append("visual verification gate is missing")

    for source in EXTERNAL_SOURCES:
        checks += 1
        if not source.exists():
            failures.append(f"external source unavailable: {source}")

    expected = SKILL_ROOT.resolve()
    for registration in RUNTIME_REGISTRATIONS:
        checks += 1
        if not registration.exists():
            failures.append(f"runtime registration missing: {registration}")
            continue
        if registration.resolve() != expected:
            failures.append(
                f"runtime registration does not target source: {registration}"
            )

    if failures:
        print(f"FAIL: {len(failures)} issue(s) across {checks} checks")
        for failure in failures:
            print(f"- {failure}")
        return 1

    print(f"PASS: {checks} checks")
    print(f"source: {expected}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
