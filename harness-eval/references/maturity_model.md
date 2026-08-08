# Harness Maturity Model

Use a double-axis evaluation:
- Stage gate: MVP, mid-stage, full-form.
- Capability score: nine harness layers scored from 0 to 3.

## Scoring Rules

Score only from evidence.

- `0`: absent or purely prompt-level claim.
- `1`: ad hoc implementation, works in narrow demos, weak evidence.
- `2`: productized for the target workflow, with repeatable behavior and some evidence.
- `3`: governed, observable, recoverable, and reusable across workflows or teams.
- `待确认`: no evidence. A required stage-gate item with `待确认` cannot pass.

Verdict:
- `通过`: all required gate items have evidence and no critical blocker exists.
- `部分通过`: core path works, but one or more required items are weak or incomplete.
- `未通过`: no reliable closed loop, no evidence, or critical safety/verification gap.

## Stage Gates

### MVP 最小闭环

MVP should prove the Agent can complete one valuable workflow safely and verifiably.

Required:
- Clear task spec: input, output, acceptance criteria, and delivery location.
- Basic plan-execute-verify loop.
- Tool/API access limited to the workflow.
- Basic permission or human review for high-risk actions.
- Trace or run record for every meaningful task.
- Result verification beyond the Agent's own claim.
- Failure capture: failed runs can become bad cases or regression cases.

Do not require:
- Multi-agent orchestration.
- Full memory governance.
- Enterprise RBAC.
- Large eval platform.

### 产品中期闭环

Mid-stage should support repeated use, iteration, and diagnosis.

Required:
- Multiple workflow variants with clear routing.
- Context selection and compression policy.
- Tool registry, schemas, permissions, and result normalization.
- Session/task state tracking.
- Evaluation cases and regression checks for common workflows.
- Trace, cost, latency, and failure classification.
- Human handoff and escalation path.
- Change process for skills/prompts/tools.

### 完整形态闭环

Full-form harness should be governable at organization or platform level.

Required:
- Policy engine or equivalent governance layer.
- Role/data/action permissions.
- Memory/state lifecycle management.
- Sandbox or execution isolation for risky actions.
- Observability with replay and audit.
- Continuous eval and regression gates.
- Multi-agent coordination with ownership, handoff, and stop conditions.
- Provider/runtime/channel management.
- Incident response and deprecation/offboarding path.

## Nine Capability Layers

### 1. Interaction Layer

Question: Can the system turn user intent into an executable task contract?

Evidence:
- Intent capture.
- Task spec builder.
- Output contract.
- Clarification policy.
- Human review points.
- Channel adapters.

### 2. Context Layer

Question: Does the Agent see the right context at the right time?

Evidence:
- System prompt manager.
- Project instruction loader.
- Retrieval router.
- Memory injector.
- Tool schema selector.
- Context compressor.
- Context isolator.
- Context rehydrator.

### 3. Tool Layer

Question: Are tools governed action channels instead of a loose function list?

Evidence:
- Tool registry.
- Tool schemas.
- MCP/API adapters.
- File/browser/shell/code tools where relevant.
- Tool permission policy.
- Tool result normalizer.

### 4. Memory / State Layer

Question: Are task state and reusable memory separated and recoverable?

Evidence:
- Session state.
- Task state.
- Artifact store.
- Long-term memory.
- User preference store.
- Progress file or handoff state.
- Snapshot/recovery.

### 5. Orchestration Layer

Question: Can the system route and advance work reliably?

Evidence:
- ReAct or planner-executor loop.
- Router for model/tool/subflow selection.
- Retry policy.
- Stop condition.
- Budget controller.
- Parallel execution with boundaries.
- Subagent dispatcher if needed.

### 6. Execution / Sandbox Layer

Question: Are real-world actions bounded and recoverable?

Evidence:
- Workspace boundary.
- Filesystem/network policy.
- Secret boundary.
- Command allowlist/denylist.
- Dependency policy.
- Rollback/snapshot.
- Approval gate.

### 7. Evaluation / Feedback Layer

Question: Can the system prove the task was completed?

Evidence:
- Unit/integration tests where applicable.
- Schema validator.
- Golden cases.
- LLM-as-judge or critic where useful.
- Human review.
- Regression suite.
- Failure classifier.

### 8. Observability Layer

Question: Can a failure be explained and replayed?

Evidence:
- Trace.
- Model/tool spans.
- Token/cost metrics.
- Latency metrics.
- Tool logs.
- Terminal/browser/file evidence.
- Artifact timeline.
- Replay.

### 9. Governance / Safety Layer

Question: Can the product be used in an organization without relying on trust?

Evidence:
- Policy engine.
- RBAC or action scopes.
- PII/sensitive data detection.
- Audit log.
- Approval workflow.
- Rate limit.
- Action risk classifier.
- Compliance rules.
- Incident response.

## Missing Loop Diagnosis

Task loop:
`Task Spec -> Plan -> Execute -> Verify -> Deliver -> Record`

Context loop:
`Discover -> Select -> Inject -> Compress -> Persist -> Rehydrate`

Tool loop:
`Register -> Select -> Authorize -> Execute -> Normalize Result -> Audit`

Evaluation loop:
`Rubric -> Test/Judge -> Failure Classification -> Regression Set -> Harness Update`

If a product lacks the task loop, it is not MVP-ready. If it lacks the evaluation loop, it cannot self-improve.
