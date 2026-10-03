# Comet 开工确认

保留 OpenSpec 和 Comet Classic 的状态机。open 阶段先澄清，design 阶段结束、任何实现/测试/审查之前，对当前 proposal、design、delta spec、tasks 与项目 AGENTS.md/CLAUDE.md 做一次一致性检查。借鉴 Spec Kit clarify 的少量关键问题和只读 analyze 的矛盾检查，不安装第二套框架。

向用户展示：目标、非目标、范围、适用规则及来源、已确认/推断/待用户决定、关键未知项、可验收场景、任务类型、验证命令和本次预算。规则冲突或影响实现的未知项未解决时停下。现有 Comet 产物确认继续保留；笼统的“推荐决定已预授权”不能替代对具体规格版本的确认。

Bundle 试点使用 `comet-gstack-quality-gates/scripts/workflow-policy.mjs snapshot` 取得规格和项目规则摘要。用户明确确认当前版本后，将摘要、用户原话和上述内容写入 `confirmed-brief.json`，调用 `approve <confirmed-brief.json>`；进入 build、verify 或 archive 前调用 `check`。默认预算 45 分钟，最多 1 轮自动返工，单条测试命令 10 分钟。时间或返工到限，保存证据与短交接后停止；续跑需要新预算确认。

范围、验收场景或适用规则实质变更后，先改 OpenSpec 再重新确认。任务复选框完成状态不算规格变更。普通 change 只审当前完整 diff 一次；高风险才有独立第二审。build 跑受影响检查，verify 按批准场景最终验证，相同代码/规格/命令的有效通过结果不重复。文档任务不运行网页 QA；网页任务只读检查批准场景和受影响页面，广泛全站探索由用户另行发起。QA 只报告问题，修复回 build 定向执行。项目 AGENTS.md 要求完整回归时照做，或先请用户调整规则。
