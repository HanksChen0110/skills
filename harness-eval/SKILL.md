---
name: harness-eval
description: Use when evaluating an Agent product or proposed Agent product for harness maturity, including MVP readiness, mid-stage improvement direction, full-form harness completeness, OpenHarness-style benchmark comparison, AI PM self-checks, PRD/design review, and recommendations for making an Agent product more usable, reliable, governable, and evolvable.
metadata:
  short-description: Evaluate Agent harness maturity
---

# Harness Eval

Use this skill to evaluate whether an Agent product has enough harness design to move from demo to usable product. The goal is not to reward feature quantity. The goal is to judge whether the Agent has a reliable operating wrapper: task contract, context, tools, state, execution boundary, evaluation, observability, and governance.

## Inputs

Ask only for missing information that materially changes the assessment. Prefer using available docs, code, PRDs, screenshots, traces, or product descriptions first.

Minimum useful inputs:
- Product type and target users.
- Current stage: idea, MVP, mid-stage product, or mature product.
- Main Agent workflows and success criteria.
- Tool/API/data access, memory/state design, and human review points.
- Available evidence: code paths, logs, traces, eval cases, PRD sections, screenshots, or demo scripts.

If the user has not chosen a target stage, infer it from the product state and mark the inference.

## References

Load only what is needed:
- Read `references/maturity_model.md` for stage gates, nine-layer scoring, and scoring rules.
- Read `references/openharness_baseline.md` when the user asks to benchmark against OpenHarness or when you need an example of a strong Agent harness.
- Read `references/report_template.md` before producing the final report.

## Workflow

1. Define the evaluation target:
   - Identify the Agent product type, target workflow, user, risk level, and target stage.
   - Separate model capability from harness capability.
   - State assumptions and missing evidence.

2. Gather evidence:
   - Prefer concrete artifacts over claims.
   - Map evidence to the nine layers in `maturity_model.md`.
   - If evidence is absent, mark `待确认`; do not score it as passed.

3. Score the harness:
   - Apply the stage gate first: MVP, mid-stage, or full-form.
   - Then score each layer from 0 to 3 with evidence.
   - A product cannot pass a stage gate if a required item has no evidence.

4. Diagnose gaps:
   - Identify missing loops: task loop, context loop, tool loop, evaluation loop.
   - Distinguish between critical blockers and optimization opportunities.
   - Avoid recommending platform-scale work for an MVP unless it blocks real use.

5. Recommend changes:
   - Use `Now / Next / Later`.
   - For each recommendation, include what to change, why it matters, and what evidence would prove it improved.
   - Prefer small harness improvements over broad refactors.

## Output Rules

Use the structure in `references/report_template.md`.

Always include:
- Current stage verdict: `通过`, `部分通过`, or `未通过`.
- Evidence-based nine-layer score.
- Missing loops.
- `Now / Next / Later` recommendations.
- AI PM conclusion: the single most important harness improvement and why.

Do not:
- Treat a chatbot UI as a complete Agent harness.
- Treat a tool list as tool governance.
- Treat prompt rules as permission control.
- Treat "the Agent says it is done" as verification.
- Copy OpenHarness feature names as mandatory product requirements.
