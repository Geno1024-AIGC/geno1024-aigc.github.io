/* Site data. Bilingual: every user-facing string carries { zh, en }. */

const SITE = {
  org: "Geno1024-AIGC",
  github: "https://github.com/Geno1024-AIGC",
  hero: {
    kicker: { zh: "Vibe-coded", en: "Vibe-coded" },
    title: { zh: "从零写出来的东西", en: "Things written from scratch" },
    subtitle: {
      zh: "一个 AI 辅助编程的个人项目集合。Android 应用、Go 服务、Qt / C++ 桌面工具，以及几个手写的编解码器和解释器。没有模板，全部从零搭。",
      en: "A personal collection of AI-assisted projects. Android apps, Go services, Qt and C++ desktop tools, plus a few hand-written codecs and interpreters. No scaffolding — everything built up from nothing."
    }
  },
  about: {
    title: { zh: "关于", en: "About" },
    lead: {
      zh: "这些项目大多是给自己用的工具：手机上没现成 app 就写一个，某个格式没工具能看就自己解析一个。换来的是一堆「刚好够用、而且完全知道它为什么这样写」的代码。",
      en: "Most of these are tools built for myself: when no app existed on Android, I wrote one; when no tool could open a format, I wrote the parser. What I got in return is a pile of code that is just good enough — and that I understand line by line."
    },
    principles: [
      {
        zh: "从规范写起，不从库开始",
        en: "Start from the spec, not from a library",
        body: {
          zh: "ZIP、PDF、二维码、ZIP64、CFF 字体——凡是手上有一份规范的地方，都直接对着规范的小节号写代码。每个类名尽量取自规范里的术语。",
          en: "ZIP, PDF, QR, Zip64, CFF fonts — whenever a specification exists, the code is written straight against its section numbers, with class names borrowed from its vocabulary."
        }
      },
      {
        zh: "能用但不装作能用",
        en: "Works, but doesn't pretend to",
        body: {
          zh: "每个项目的 README 都有一节「已知限制」。模拟的解释器就说自己是模拟的，纯内存缓冲就说清楚整包缓存在内存里。",
          en: "Every README carries a limitations section. The simulated interpreter says it is simulated; the in-memory buffer says the response is held whole in memory."
        }
      },
      {
        zh: "自己算出来的才算数",
        en: "Only what you computed yourself counts",
        body: {
          zh: "手机上的二维码解码器要和 ZXing 交叉验证过才敢发；AXF 格式让三种语言互相校验字节；APK 的签名证书要在 CI 里核对指纹。",
          en: "The on-device QR decoder is cross-checked against ZXing before shipping; the AXF format makes three languages verify each other's bytes; APK signing certificates are fingerprint-checked in CI."
        }
      },
      {
        zh: "把过程留在仓库里",
        en: "Leave the process in the repo",
        body: {
          zh: "构建脚本和 CI 文件里塞满了「为什么这么绕」的注释：为什么不能用 GraalVM 构建、为什么要递归遍历 PE 导入表、为什么 manifest 要从 api.github.com 读。",
          en: "Build scripts and CI files are full of comments explaining the workaround: why not to build under GraalVM, why the PE import table is walked recursively, why release metadata must be read from api.github.com."
        }
      }
    ],
    notesTitle: { zh: "几点说明", en: "A few notes" },
    notes: [
      {
        zh: "统计数字来自 2026-10 的仓库快照（代码行数不含 vendor 代码和生成物）。",
        en: "Figures come from an October 2026 snapshot of the repositories (line counts exclude vendored and generated code)."
      },
      {
        zh: "版本号普遍是 0.1.x：意味着能跑、但接口还可能变。",
        en: "Versions are mostly 0.1.x: it runs, but the interface may still change."
      },
      {
        zh: "项目基本是一次性冲刺做出来的，日期集中在 2026 年 8–10 月。",
        en: "Most projects came out of single focused sprints, concentrated between August and October 2026."
      }
    ]
  },
  stats: {
    projects: { zh: "个项目", en: "projects" },
    loc: { zh: "行手写代码", en: "lines of hand-written code" },
    commits: { zh: "次提交", en: "commits" },
    tests: { zh: "个自动化测试", en: "automated tests" },
    ci: { zh: "个项目接了 CI", en: "projects wired to CI" }
  },
  ui: {
    projects: { zh: "项目", en: "Projects" },
    about: { zh: "关于", en: "About" },
    search: { zh: "搜索项目、标签、技术栈…", en: "Search projects, tags, stacks…" },
    all: { zh: "全部", en: "All" },
    clear: { zh: "清除筛选", en: "Clear" },
    sort: { zh: "排序", en: "Sort" },
    sortUpdated: { zh: "最近更新", en: "Recently updated" },
    sortLoc: { zh: "代码量", en: "Code size" },
    sortCommits: { zh: "提交数", en: "Commit count" },
    sortName: { zh: "名称", en: "Name" },
    showing: { zh: "共 {n} 个项目", en: "{n} projects" },
    empty: { zh: "没有匹配的项目。换个关键词，或者清掉筛选试试。", en: "Nothing matched. Try a different keyword, or clear the filters." },
    highlights: { zh: "实现要点", en: "Highlights" },
    stack: { zh: "技术栈", en: "Stack" },
    summary: { zh: "这是什么", en: "What it is" },
    metrics: { zh: "工程指标", en: "Engineering" },
    lines: { zh: "代码行数", en: "Lines" },
    commits: { zh: "提交", en: "Commits" },
    tests: { zh: "测试", en: "Tests" },
    ci: { zh: "持续集成", en: "CI" },
    updated: { zh: "最后更新", en: "Updated" },
    tags: { zh: "标签", en: "Tags" },
    viewRepo: { zh: "查看仓库", en: "View repository" },
    back: { zh: "返回全部项目", en: "Back to all projects" },
    prev: { zh: "上一个", en: "Previous" },
    next: { zh: "下一个", en: "Next" },
    yes: { zh: "有", en: "Yes" },
    no: { zh: "无", en: "No" },
    footer: {
      zh: "用 AI 代理辅助编程的项目集合 · 大部分为个人自用工具",
      en: "A collection of AI-agent-assisted projects · mostly personal tools"
    }
  }
};

const TAGS = {
  android: { zh: "Android", en: "Android" },
  desktop: { zh: "桌面", en: "Desktop" },
  server: { zh: "服务", en: "Server" },
  cli: { zh: "命令行", en: "CLI" },
  web: { zh: "Web", en: "Web" },
  library: { zh: "库 / 协议", en: "Library / spec" },
  tooling: { zh: "工具", en: "Tooling" }
};

const LANGS = {
  kotlin: "Kotlin", java: "Java", go: "Go", cpp: "C++", c: "C", js: "JavaScript"
};

const PROJECTS = [];
