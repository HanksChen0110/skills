# OpenHarness Baseline

This reference extracts OpenHarness into a benchmark for strong Agent harness design. Do not require every Agent product to copy OpenHarness. Use it as a maturity reference for what a complete harness tends to manage.

## Core Definition

An Agent harness is the infrastructure around an LLM that turns model intelligence into reliable action. The model provides reasoning. The harness provides hands, eyes, memory, execution boundaries, feedback, and governance.

## Baseline Capabilities

### 1. Agent Loop

A strong harness has an explicit observe-think-act-verify loop.

Look for:
- Streaming or structured model response handling.
- Tool-call cycle with result observation.
- Retry/backoff policy for recoverable failures.
- Parallel execution only where task boundaries are clear.
- Token, latency, and cost tracking.

### 2. Harness Toolkit

Tools are not just functions. They are registered, described, selected, executed, normalized, and audited action channels.

Look for:
- Tool registry and schemas.
- File, shell, search, browser, API, and MCP-style adapters where relevant.
- On-demand skill or workflow loading.
- Plugin or extension mechanism.
- Tool result normalization.

### 3. Context and Memory

The harness should manage context as a scarce resource, not dump everything into the prompt.

Look for:
- Project instruction discovery.
- Prompt/context assembly.
- On-demand retrieval and injection.
- Context compression.
- Session resume.
- Persistent memory with source and scope boundaries.

### 4. Governance and Permissions

The harness should make unsafe actions impossible or gated at the system layer.

Look for:
- Permission modes.
- Path-level or command-level rules.
- Approval dialogs or human gates.
- Pre-tool and post-tool hooks.
- Sensitive path, URL, or secret protection.
- Audit logs for high-risk actions.

### 5. Swarm and Task Coordination

Multi-agent features are valuable only when responsibilities, context, and lifecycle are controlled.

Look for:
- Subagent spawning with explicit task ownership.
- Team registry or task lifecycle.
- Background task status and polling.
- Context isolation between agents.
- Handoff and stop conditions.

### 6. Provider and Runtime Workflows

A production harness should treat model/provider setup as a workflow, not raw config.

Look for:
- Provider profiles.
- Auth status checks.
- Model switching boundaries.
- CLI/API/channel entrypoints.
- Dry-run or readiness preview before live execution.

### 7. Execution Boundary

Actions need a controlled environment.

Look for:
- Workspace boundary.
- Sandbox/container/VM when risk requires it.
- Network policy.
- Dependency and secret boundaries.
- Rollback or recoverable state.

### 8. Observability and Evaluation

The harness should prove what happened and whether it worked.

Look for:
- Trace of model calls and tool calls.
- Terminal/browser/file evidence where relevant.
- Test or eval runner.
- Failure classification.
- Regression cases.
- Cost and latency attribution.

## What OpenHarness Suggests For Product Evaluation

Use OpenHarness as a reference for these questions:
- Does the product have a real task loop, or only a chat loop?
- Can it preview risk and readiness before action?
- Are tools governed by system rules, not prompt promises?
- Can long tasks survive context loss or session boundaries?
- Can failures be replayed, classified, and turned into regression cases?
- Can the product evolve through skills/plugins/workflows instead of hardcoded prompt edits?
