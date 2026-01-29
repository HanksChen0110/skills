# Claude Code Skills 目录

这是你的自定义 Claude Code skills 存储目录。

## 目录设置

### 符号链接配置

Claude Code 默认从 `~/.claude/skills` 读取 skills。通过创建符号链接，可以让 Claude 从这个目录读取 skills，同时保持统一的存储位置。

**设置步骤：**

1. **以管理员身份运行** [setup_symlink.bat](setup_symlink.bat)
   - 右键点击 `setup_symlink.bat`
   - 选择"以管理员身份运行"
   - 这将创建从 `C:\Users\admin\.claude\skills` 到 `G:\BaiduSyncdisk\skills` 的符号链接

2. **验证链接**
   ```powershell
   Get-Item $env:USERPROFILE\.claude\skills
   ```
   应该显示这是一个指向 `G:\BaiduSyncdisk\skills` 的符号链接

### 手动设置（如果脚本失败）

如果自动脚本无法运行，可以手动创建符号链接：

**PowerShell（管理员权限）：**
```powershell
# 删除旧的 skills 目录（如果存在且不是符号链接）
Remove-Item "$env:USERPROFILE\.claude\skills" -Recurse -Force

# 创建符号链接
New-Item -ItemType SymbolicLink -Path "$env:USERPROFILE\.claude\skills" -Target "G:\BaiduSyncdisk\skills"
```

**命令提示符（管理员权限）：**
```cmd
rmdir /s /q "%USERPROFILE%\.claude\skills"
mklink /D "%USERPROFILE%\.claude\skills" "G:\BaiduSyncdisk\skills"
```

## 安装新 Skill

### 方法 1: 使用 install_skill.py（推荐）

```bash
cd G:\BaiduSyncdisk\tools\skill-creator\scripts
python install_skill.py /path/to/your-skill
```

这个脚本会：
- 验证 skill 结构
- 复制 skill 到 `G:\BaiduSyncdisk\skills`
- 显示安装详情

### 方法 2: 手动复制

直接将 skill 文件夹复制到这个目录：

```bash
cp -r /path/to/your-skill G:\BaiduSyncdisk\skills/
```

### 方法 3: 解压 .skill 文件

如果有 `.skill` 文件（zip 格式）：

```bash
cd G:\BaiduSyncdisk\skills
unzip /path/to/your-skill.skill
```

## 已安装的 Skills

当前已安装的 skills 列表（按类型分类）：

### 🛠️ 开发工具
- **skill-creator** - Skill 创建和管理工具
- **skill-seekers** - 从文档/GitHub/PDF 创建 skills
- **markitdown** - 文件格式转 Markdown
- **agent-builder** - AI Agent 搭建助手

### 📦 产品相关
- **ai-prd-assistant** - AI 产品需求文档助手
- **ai-product-design** - AI 产品设计助手
- **product-assistant** - 产品助手

### ✍️ 内容创作
- **ai-video-creator** - AI 视频创作助手
- **mp-writing-assistant** - 公众号写作助手
- **writing-assistant** - 通用写作助手
- **design-assistant** - 设计助手

### 💼 职业发展
- **interview-assistant** - 面试准备助手
- **job-hunting-assistant** - 求职助手

### 🧠 个人成长
- **cognitive-growth** - 认知与成长助手
- **prompt-assistant** - 提示词工程助手
- **aboutme** - 个人身份信息

## 创建新 Skill

使用 skill-creator 工具创建新 skill：

```bash
cd G:\BaiduSyncdisk\tools\skill-creator\scripts

# 初始化新 skill
python init_skill.py my-new-skill --path G:\BaiduSyncdisk\skills --resources scripts,references

# 编辑 SKILL.md 和添加资源文件...

# 验证 skill
python quick_validate.py G:\BaiduSyncdisk\skills\my-new-skill

# 安装（如果在其他位置开发）
python install_skill.py /path/to/my-new-skill
```

## 目录结构

每个 skill 应该具有以下结构：

```
skill-name/
├── SKILL.md              # 必需：skill 定义文件
├── LICENSE              # 可选：许可证
├── scripts/             # 可选：可执行脚本
│   └── *.py
├── references/          # 可选：参考文档
│   └── *.md
└── assets/              # 可选：资源文件
    └── *
```

## 备份与同步

由于这个目录位于 `G:\BaiduSyncdisk\`，你的 skills 会自动通过百度云同步备份。

**优点：**
- ✅ 自动备份到云端
- ✅ 多设备同步
- ✅ 版本历史（通过云服务）
- ✅ 统一管理所有 skills

## 故障排除

### Skill 未显示在 Claude Code 中

1. 检查符号链接是否正确：
   ```powershell
   Get-Item $env:USERPROFILE\.claude\skills
   ```

2. 重启 Claude Code / VSCode

3. 验证 skill 结构：
   ```bash
   python G:\BaiduSyncdisk\tools\skill-creator\scripts\quick_validate.py G:\BaiduSyncdisk\skills\skill-name
   ```

### 符号链接创建失败

- 确保以管理员权限运行
- 确保目标路径正确且存在
- Windows 10/11 默认支持符号链接

### Skill 验证失败

- 确保 SKILL.md 存在
- 检查 YAML frontmatter 格式
- 使用 quick_validate.py 查看详细错误

## 相关工具

- **skill-creator**: `G:\BaiduSyncdisk\tools\skill-creator\`
- **install_skill.py**: `G:\BaiduSyncdisk\tools\skill-creator\scripts\install_skill.py`
- **package_skill.py**: `G:\BaiduSyncdisk\tools\skill-creator\scripts\package_skill.py`
- **quick_validate.py**: `G:\BaiduSyncdisk\tools\skill-creator\scripts\quick_validate.py`
