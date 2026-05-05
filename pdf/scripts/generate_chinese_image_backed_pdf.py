#!/usr/bin/env python3
"""Generate Chinese-safe, image-backed PDFs on Windows.

Use this template when display fidelity matters more than searchable PDF text,
or when shell encoding corruption makes direct text-based PDF generation unsafe.

Recommended workflow:
1. Copy this script locally.
2. Edit the Chinese strings directly in the UTF-8 file.
3. Run the script from disk, not via shell inline piping.
4. Open the generated probe image before producing the final batch if needed.
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


OUT_DIR = Path.cwd() / "generated-pdfs"
OUT_DIR.mkdir(parents=True, exist_ok=True)

FONT = r"C:\Windows\Fonts\simhei.ttf"
FONT_BOLD = r"C:\Windows\Fonts\simhei.ttf"

PAGE_W, PAGE_H = 2480, 3508
MARGIN = 120
BLACK = (0, 0, 0)
RED = (192, 0, 0)
GRAY = (245, 245, 245)


def font(size: int, bold: bool = False):
    return ImageFont.truetype(FONT_BOLD if bold else FONT, size)


def draw_text(draw: ImageDraw.ImageDraw, xy, content: str, size=32, fill=BLACK, bold=False, anchor=None):
    draw.text(xy, content, font=font(size, bold), fill=fill, anchor=anchor)


def draw_wrap(
    draw: ImageDraw.ImageDraw,
    xy,
    content: str,
    size=28,
    fill=BLACK,
    bold=False,
    max_width=None,
    line_gap=12,
):
    f = font(size, bold)
    x, y = xy
    if not max_width:
        draw.text((x, y), content, font=f, fill=fill)
        return
    lines: list[str] = []
    current = ""
    for ch in content:
        probe = current + ch
        if draw.textlength(probe, font=f) <= max_width or not current:
            current = probe
        else:
            lines.append(current)
            current = ch
    if current:
        lines.append(current)
    for line in lines:
        draw.text((x, y), line, font=f, fill=fill)
        y += size + line_gap


def cell(
    draw: ImageDraw.ImageDraw,
    box,
    content="",
    size=28,
    fill=BLACK,
    bold=False,
    align="center",
    bg=None,
):
    x1, y1, x2, y2 = box
    if bg is not None:
        draw.rectangle(box, fill=bg)
    draw.rectangle(box, outline=BLACK, width=2)
    if align == "center":
        draw.text(((x1 + x2) / 2, (y1 + y2) / 2), content, font=font(size, bold), fill=fill, anchor="mm")
    else:
        draw_wrap(draw, (x1 + 12, y1 + 10), content, size=size, fill=fill, bold=bold, max_width=(x2 - x1 - 24))


def save_pdf(img: Image.Image, path: Path):
    img.convert("RGB").save(path, "PDF", resolution=300.0)


def build_probe(path: Path):
    img = Image.new("RGB", (1800, 900), "white")
    d = ImageDraw.Draw(img)
    draw_text(d, (40, 50), "字体验证：黑体", 28)
    draw_text(d, (40, 150), "中文测试：安全作业票 / 外来人员车辆入厂 / 安全巡检 / 矿山工程项目安全检查表", 72)
    draw_text(d, (40, 300), "测试内容：申请单位、申请时间、车辆牌照、身份证有效期、巡检区域、整改措施", 54)
    draw_text(d, (40, 420), "如果这一张图显示正常，说明本地中文渲染链路是通的。", 48, fill=RED)
    img.save(path)


def build_demo_form(path: Path):
    img = Image.new("RGB", (PAGE_W, PAGE_H), "white")
    d = ImageDraw.Draw(img)
    draw_text(d, (PAGE_W / 2, 100), "中文 PDF 版式模板（示例）", 52, bold=True, anchor="ma")
    draw_text(d, (MARGIN, 170), "用途：用于生成含中文表格、标题、意见栏的稳定显示版 PDF。", 26)

    cols = [MARGIN, 460, 1220, 1620, PAGE_W - MARGIN]
    y = 260
    rows = [y + i * 95 for i in range(4)]
    pairs = [
        ("申请编号", "DEMO2026042401", "申请日期", "2026年04月24日", BLACK, BLACK),
        ("申请单位", "示例矿业有限公司", "申请类型", "测试申请", BLACK, BLACK),
        ("联系人", "张三", "联系电话", "13800138000", BLACK, BLACK),
        ("备注", "本模板可复制后改成你的实际业务表单。", "状态", "示例", RED, RED),
    ]
    for idx, row in enumerate(pairs):
        yy = rows[idx]
        cell(d, (cols[0], yy, cols[1], yy + 95), row[0], 26, BLACK, True)
        cell(d, (cols[1], yy, cols[2], yy + 95), row[1], 24, row[4], False, "left")
        cell(d, (cols[2], yy, cols[3], yy + 95), row[2], 26, BLACK, True)
        cell(d, (cols[3], yy, cols[4], yy + 95), row[3], 24, row[5], False, "left")

    col2 = [MARGIN, 220, 900, 1220, PAGE_W - MARGIN]
    y2 = rows[-1] + 130
    for i, h in enumerate(["序号", "审核项目", "结果", "说明"]):
        cell(d, (col2[i], y2, col2[i + 1], y2 + 85), h, 28, BLACK, True, "center", GRAY)
    checks = [
        ("1", "标题与字段显示", "通过", "中文标题和表格字段能正常显示", BLACK),
        ("2", "红色风险提示", "通过", "可用红字突出失败点或提醒项", RED),
        ("3", "多行文本换行", "通过", "单元格内长中文文本可自动换行", BLACK),
    ]
    y = y2 + 85
    for no, item, result, note, c in checks:
        cell(d, (col2[0], y, col2[1], y + 85), no, 28)
        cell(d, (col2[1], y, col2[2], y + 85), item, 24)
        cell(d, (col2[2], y, col2[3], y + 85), result, 24, c)
        cell(d, (col2[3], y, col2[4], y + 85), note, 24, c, False, "left")
        y += 85

    save_pdf(img, path)


if __name__ == "__main__":
    build_probe(OUT_DIR / "_font_probe.png")
    build_demo_form(OUT_DIR / "demo_chinese_form.pdf")
    print(f"Wrote files to {OUT_DIR}")
