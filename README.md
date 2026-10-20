# Geno1024-AIGC

一个用 AI 写成的项目合集站点。**0% 人工代码**——人只提要求和验收，代码一行都不写。

A showcase site for 16 projects written entirely by AI. Nothing here was typed by a human.

**在线访问：<https://geno1024-aigc.github.io>**

## 收录内容

16 个项目，合计：

| 指标 | 数值 |
| --- | --- |
| 代码行数 | 78,994 |
| 提交数 | 1,058 |
| 自动化测试 | 369 |
| 接入 CI | 10 / 16 |
| AI Token 消耗 | 2.07B |

类型覆盖 Android 应用、Go 服务、Qt / C++ 桌面工具，以及几个从零实现的编解码器和解释器：ZIP、PDF、二维码、ZIP64、CFF 字体，还有一个纯前端的 JavaScript 单步调试器。

## 站点结构

纯静态站点，没有前端框架，没有构建依赖，只靠一个 Python 脚本把 JSON 渲染成 HTML：

| 路径 | 作用 |
| --- | --- |
| `src/data.json` | 站点文案与 16 个项目记录，双语 |
| `src/tokens.json` | 各项目的 AI token 用量（输入 / 输出 / 推理 / 缓存读 / 缓存写 / 非缓存 / 合计） |
| `scripts/collect_tokens.py` | 从本机 OpenCode 数据库采集 token 用量 |
| `build.py` | 生成 `index.html`、`about.html` 和 `p/<id>.html` |
| `assets/style.css` | 深色主题样式 |
| `assets/app.js` | 语言切换、搜索、标签筛选、排序 |

页面是生成出来的，不是前端渲染的：中文写在元素文本里，英文存在 `data-en` 属性中，切换语言时替换 `textContent`。关掉 JavaScript 也能看到中文版。

## 重新构建

```bash
python3 build.py               # 重新采集 token，并生成全部页面
python3 build.py --no-collect  # 复用已提交的 src/tokens.json
```

生成器只依赖 Python 标准库。

## 已知取舍

- 技术栈标签里的中文（如「零依赖」「纯标准库」）不参与语言切换，中英文下都显示原文。
- 语言偏好存在 `localStorage`，同一个站点下所有页面共享。

## 提交规范

沿用各项目仓库的约定，格式为 `<括号><动作><括号> <模块>: <英文摘要>`，其中括号表示改动量：`{}` 大、`[]` 中、`()` 小。

```
{Add} site: Add the detail view with metrics and highlights
[Update] site: Say the CI metric is wired rather than merely there
(Typo) site: Replace corner brackets and straight quotes with curly quotes
```
