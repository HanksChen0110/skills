# AGENTS

<skills_system priority="1">

## Available Skills

<!-- SKILLS_TABLE_START -->
<usage>
When users ask you to perform tasks, check if any of the available skills below can help complete the task more effectively. Skills provide specialized capabilities and domain knowledge.

How to use skills:
- Invoke: Bash("openskills read <skill-name>")
- The skill content will load with detailed instructions on how to complete the task
- Base directory provided in output for resolving bundled resources (references/, scripts/, assets/)

Usage notes:
- Only use skills listed in <available_skills> below
- Do not invoke a skill that is already loaded in your context
- Each skill invocation is stateless
</usage>

<available_skills>

<skill>
<name>agency-checklist</name>
<description>"自主性（Agency）激发与检查清单。当用户说「激发自主性」「检查自主性」「提高自主性」「自主性检查」「我该主动做什么」「如何掌控人生」「跳出思维惯性」时使用。提供自主性五大核心洞见、三特征识别法、实践方法论和检查清单。帮助用户识别何时需要激发自主性，并提供行动策略让思考总能多一层。Agency activation and self-check toolkit. Use when user wants to activate agency, check their agency level, improve proactiveness, or break out of mental conformity. Provides 5 core insights about agency, 3-trait recognition method, practice methodology and checklist."</description>
<location>global</location>
</skill>

<skill>
<name>agent-builder</name>
<description>帮助搭建AI Agent的技能助手。当用户说「搭建Agent」「创建Agent」「Agent搭建」「智能体搭建」「设计AI系统」时使用。提供Agent核心哲学、四要素、六大核心要素、工作流搭建心法、RAG详解、Prompt工程等完整方法论。适用于AI Agent开发、智能体构建、工作流设计、自主AI系统开发。</description>
<location>global</location>
</skill>

<skill>
<name>ai-badcase-analysis</name>
<description>"[AI产品Badcase分析指导] [AI Product Badcase Analysis Guide] 帮助用户系统化分析、定位和解决AI产品中的badcase问题。提供从现状评估、问题分析到解决方案的全流程方法论支持、思维引导和checklist。适用于：(1) AI产品出现预测错误或效果不佳时 (2) 需要系统化分析模型失败案例时 (3) 优化算法效果但不知从何入手时 (4) 需要建立badcase分析工作流程时。本技能提供指导性建议和方法论，不直接处理badcase数据。"</description>
<location>global</location>
</skill>

<skill>
<name>ai-comp-analysis</name>
<description>当用户说「做AI产品竞品分析」时，使用AI产品冰山分析模型深度拆解竞品核心竞争力。通过能力边界测试、工作流反推、数据策略分析，从静态构成到动态流程全面评估AI产品。适用场景：产品规划、技术选型、市场研究、功能设计、投资决策。When user says "做AI产品竞品分析" or similar expressions, use AI Product Iceberg Model to deeply analyze competitor core capabilities. Through capability boundary testing, workflow reverse-engineering, and data strategy analysis, comprehensively evaluate AI products from static composition to dynamic processes. Use cases: product planning, technical selection, market research, feature design, investment decisions.</description>
<location>global</location>
</skill>

<skill>
<name>ai-prd-assistant</name>
<description>帮助编写AI产品需求文档(PRD)。当用户说「写AI PRD」「AI产品需求文档」「AI PRD方法论」「优化AI PRD」时使用。提供AI产品PRD的核心方法论，包括嵌入型AI与Agent型AI的设计差异、7个核心结构、不确定性处理、边界定义、评测方法、PRD局限性、最小可行PRD框架。适用于AI产品规划、需求文档编写、产品设计决策。AI PRD writing assistant. Use when users need to write or optimize AI product requirement documents. Provides methodology for embedded AI vs Agent AI, 7 core structures, uncertainty handling, boundary definition, evaluation methods, PRD limitations, and minimum viable PRD framework.</description>
<location>global</location>
</skill>

<skill>
<name>ai-product-design</name>
<description>帮助进行AI产品设计的技能助手。当用户说「AI产品设计」「设计AI产品」「产品设计思维」时使用。提供AI原生产品三维范式（XYZ轴）、动态五阶模型、数据闭环与数据飞轮、防偏误手册等完整方法论。适用于AI产品规划、产品设计决策、用户体验设计。</description>
<location>global</location>
</skill>

<skill>
<name>ai-video-creator</name>
<description>帮助进行AI视频创作相关工作的技能助手。当用户说「AI视频」「视频创作」「AI视频制作」时使用。提供AI视频创作全流程、推荐工具、创作技巧、常见问题解答等完整方法论。适用于AI视频制作、视频创作、内容创作。</description>
<location>global</location>
</skill>

<skill>
<name>aippt</name>
<description>AIPPT - 基于模板定制化生成 PPT。垫图约束风格 → 提示词替换内容 → AI 生图 → 打包 PPTX。</description>
<location>global</location>
</skill>

<skill>
<name>cognitive-growth</name>
<description>帮助进行认知与成长相关工作的技能助手。当用户说「认知成长」「自我提升」「学习方法」「认知方法论」时使用。提供认知本质、学习方法、工作流心法、三大核心能力、底层逻辑相通之处等完整方法论。适用于学习方法、认知提升、问题解决能力培养。</description>
<location>global</location>
</skill>

<skill>
<name>decision-checklist</name>
<description>基于《思考，快与慢》的认知偏差检查清单和决策指导。适用于：重要决策、避免认知陷阱、系统化决策支持。触发场景：(1) 做出重要的个人或职业决策 (2) 评估选项和替代方案 (3) 避免常见决策陷阱 (4) 系统化决策审查和验证。Cognitive bias checklist and decision-making guidance based on "Thinking, Fast and Slow" by Daniel Kahneman. Use when user needs to make important life decisions, wants to avoid cognitive biases, or requires systematic decision-making support.</description>
<location>global</location>
</skill>

<skill>
<name>design-assistant</name>
<description>帮助进行设计相关工作的技能助手。当用户说「做设计」「设计工作」「设计理论」时使用。提供设计四要素（对比、重复、对齐、亲密性）的核心原则和应用方法。适用于视觉设计、界面设计、排版设计。</description>
<location>global</location>
</skill>

<skill>
<name>markitdown</name>
<description>Convert various file formats to Markdown for LLM consumption and text analysis. Use when you need to convert documents (PDF, Word, PowerPoint, Excel), images (with OCR), audio (with transcription), HTML, or other files to Markdown format. Triggers include "convert to markdown", "extract text from", "parse document", "OCR image", "transcribe audio".</description>
<location>global</location>
</skill>

<skill>
<name>media-writer</name>
<description>Create platform-native content that resonates with each community's culture. Use when adapting technical content for WeChat, Hacker News, Reddit, Medium, Twitter/X, Dev.to, or LinkedIn. Transforms generic writing into content that feels written BY that community, not AT them.</description>
<location>global</location>
</skill>

<skill>
<name>mp-writing-assistant</name>
<description>帮助进行公众号写作的技能助手。当用户说「写公众号文章」「公众号写作」时使用。提供公众号文章写作的完整流程，包括选题、大纲、正文、标题、排版等环节，以及公众号特有的排版规范和增强技巧。适用于公众号文章创作、内容写作、新媒体写作。</description>
<location>global</location>
</skill>

<skill>
<name>pdf</name>
<description>Comprehensive PDF manipulation toolkit for extracting text and tables, creating new PDFs, merging/splitting documents, and handling forms. When Claude needs to fill in a PDF form or programmatically process, generate, or analyze PDF documents at scale.</description>
<location>global</location>
</skill>

<skill>
<name>problem-solving-sop</name>
<description>泛化的问题发现、分析、解决与复盘 SOP。基于产品经理思维、矛盾论及系统思考，提供一套从识别位差到沉淀认知的标准化问题处理流程。适用于：(1) 识别复杂系统中的核心矛盾 (2) 建立高不确定性下的分析模型 (3) 实施模块化与迭代式的解决方案 (4) 沉淀认知飞轮。</description>
<location>global</location>
</skill>

<skill>
<name>product-assistant</name>
<description>帮助进行产品经理工作的技能助手。当用户说「做产品」「产品经理」「产品工作」时使用。提供产品机会评估十问模型、产品定义五层模型框架、MVP策略、PMF验证、用户研究等完整方法论。适用于产品规划、需求分析、产品设计、用户研究。</description>
<location>global</location>
</skill>

<skill>
<name>product-design-checklist</name>
<description>基于《思考，快与慢》的产品设计认知偏差检查清单。适用于：产品设计、功能设计、用户体验设计、避免认知陷阱。触发场景：(1) 设计新产品或功能 (2) 评估设计决策 (3) 用户研究和测试 (4) 产品策略和规划 (5) 避免常见设计认知偏差。Cognitive bias checklist for product design based on "Thinking, Fast and Slow" by Daniel Kahneman. Use when designing products, features, or user experiences to avoid cognitive traps.</description>
<location>global</location>
</skill>

<skill>
<name>prompt-assistant</name>
<description>提示词工程方法论与优化实践。当用户需要编写、优化、迭代提示词时使用。提供RTF结构化框架、16种提示词工程方式、动词优化策略、鲁棒性构建方法。适用于：编写新提示词、优化现有提示词、结构化提示词设计、提示词迭代改进、Few-shot示例设计、提示词质量评估。触发关键词：写提示词、优化提示词、提示词工程、结构化提示词、RTF提示词、提示词优化、Few-shot、思维链、提示词迭代。</description>
<location>global</location>
</skill>

<skill>
<name>skill-creator</name>
<description>Guide for creating effective skills. This skill should be used when users want to create a new skill (or update an existing skill) that extends Codex's capabilities with specialized knowledge, workflows, or tool integrations.</description>
<location>global</location>
</skill>

<skill>
<name>skill-judge</name>
<description>Evaluate Agent Skill design quality against official specifications and best practices. Use when reviewing, auditing, or improving SKILL.md files and skill packages. Provides multi-dimensional scoring and actionable improvement suggestions.</description>
<location>global</location>
</skill>

<skill>
<name>skill-seekers</name>
<description>Automatically convert documentation websites, GitHub repositories, and PDFs into Claude AI skills. Use when you need to create a skill from documentation sources (websites, repos, PDFs), combine multiple sources, detect conflicts between docs and code, or package skills for Claude. Triggers include "create skill from", "scrape documentation", "convert docs to skill", "analyze GitHub repo for skill".</description>
<location>global</location>
</skill>

<skill>
<name>ticktick-task-manager</name>
<description>"滴答清单任务管理器。通过自然语言创建、查询、同步滴答清单任务。支持四象限分类（重要紧急/重要不紧急/不重要紧急/不重要不紧急），自动同步到Obsidian Markdown文件。触发词：记任务、创建任务、添加任务、新任务、滴答清单、任务管理、同步任务、查看任务。"</description>
<location>global</location>
</skill>

<skill>
<name>vibe-coding</name>
<description>Transform an AI agent into a tasteful, disciplined development partner. Not just a code generator, but a collaborator with professional standards, transparent decision-making, and craftsmanship. Use for any development task - building features, fixing bugs, designing systems, refactoring. The human provides vision and decisions. The agent provides execution with taste and discipline.</description>
<location>global</location>
</skill>

<skill>
<name>writing-assistant</name>
<description>帮助进行文章写作的技能助手。当用户说「写文章」「写作」「写内容」「检查草稿」「诊断数据」时使用。提供写作五步法：选题→大纲→正文→标题→排版。涵盖选题原则、大纲构建、正文写作技巧、标题优化、排版规范。包含检查清单评分机制（≥80%发布，60-79%优化，<60%重做）和一票否决机制。适用于文章创作、内容写作、公众号文章撰写、自媒体写作。</description>
<location>global</location>
</skill>

<skill>
<name>frontend-design</name>
<description>Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, artifacts, posters, or applications (examples include websites, landing pages, dashboards, React components, HTML/CSS layouts, or when styling/beautifying any web UI). Generates creative, polished code and UI design that avoids generic AI aesthetics.</description>
<location>global</location>
</skill>

<skill>
<name>github-to-skills</name>
<description>Automated factory for converting GitHub repositories into specialized AI skills. Use this skill when the user provides a GitHub URL and wants to "package", "wrap", or "create a skill" from it. It automatically fetches repository details, latest commit hashes, and generates a standardized skill structure with enhanced metadata suitable for lifecycle management.</description>
<location>global</location>
</skill>

<skill>
<name>log-viewer</name>
<description>|</description>
<location>global</location>
</skill>

<skill>
<name>lovart-painter</name>
<description>利用 Lovart 会员权益进行专业生图的专家</description>
<location>global</location>
</skill>

<skill>
<name>skill-evolution-manager</name>
<description>专门用于在对话结束时，根据用户反馈和对话内容总结优化并迭代现有 Skills 的核心工具。它通过吸取对话中的“精华”（如成功的解决方案、失败的教训、特定的代码规范）来持续演进 Skills 库。</description>
<location>global</location>
</skill>

<skill>
<name>skill-launcher</name>
<description>启动/重启 SkillLauncher 快捷启动器</description>
<location>global</location>
</skill>

<skill>
<name>skill-manager</name>
<description>Lifecycle manager for GitHub-based skills. Use this to batch scan your skills directory, check for updates on GitHub, and perform guided upgrades of your skill wrappers.</description>
<location>global</location>
</skill>

<skill>
<name>thought-mining</name>
<description>思维挖掘助手 - 通过对话帮助用户把脑子里的零散想法倒出来、记录下来、整理成文章。覆盖从思维挖掘到成稿的完整流程。</description>
<location>global</location>
</skill>

<skill>
<name>web-design-guidelines</name>
<description>Review UI code for Web Interface Guidelines compliance. Use when asked to "review my UI", "check accessibility", "audit design", "review UX", or "check my site against best practices".</description>
<location>global</location>
</skill>

<skill>
<name>剪口播</name>
<description>口播视频转录和口误识别。生成审查稿和删除任务清单。触发词：剪口播、处理视频、识别口误</description>
<location>global</location>
</skill>

<skill>
<name>剪辑</name>
<description>执行视频剪辑。根据确认的删除任务执行FFmpeg剪辑，循环直到零口误，生成字幕。触发词：执行剪辑、开始剪、确认剪辑</description>
<location>global</location>
</skill>

<skill>
<name>字幕</name>
<description>字幕生成与烧录。转录→词典纠错→审核→烧录。触发词：加字幕、生成字幕、字幕</description>
<location>global</location>
</skill>

<skill>
<name>安装</name>
<description>环境准备。安装依赖、下载模型、验证环境。触发词：安装、环境准备、初始化</description>
<location>global</location>
</skill>

<skill>
<name>自更新</name>
<description>自更新 skills。记录用户反馈，更新方法论和规则。触发词：更新规则、记录反馈、改进skill</description>
<location>global</location>
</skill>

<skill>
<name>image-assistant</name>
<description>配图助手 - 把文章/模块内容转成统一风格、少字高可读的 16:9 信息图提示词；先定“需要几张图+每张讲什么”，再压缩文案与隐喻，最后输出可直接复制的生图提示词并迭代。</description>
<location>global</location>
</skill>

<skill>
<name>prd-doc-writer</name>
<description>Write and iteratively refine PRD/需求文档 with a story-driven structure and strict staged confirmations. Use when the user asks to 梳理/撰写/完善 PRD、需求文档、用户故事、验收标准。</description>
<location>global</location>
</skill>

<skill>
<name>req-change-workflow</name>
<description>Standardize requirement/feature changes in an existing codebase by turning "改需求/需求变更/调整交互/改功能/重构流程" into a repeatable loop: clarify, baseline, impact, design, implement, validate, and document.</description>
<location>global</location>
</skill>

</available_skills>
<!-- SKILLS_TABLE_END -->

</skills_system>
