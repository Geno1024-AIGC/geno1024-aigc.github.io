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
    noProjects: { zh: "还没有收录任何项目。", en: "No projects recorded yet." },
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

const PROJECTS = [
  {
    id: "gits-android",
    name: "gits-android",
    repo: "Geno1024-AIGC/gits-android",
    url: "https://github.com/Geno1024-AIGC/gits-android",
    tags: ["android"],
    lang: "kotlin",
    stack: ["Kotlin 2.4", "Jetpack Compose", "Eclipse JGit", "BouncyCastle", "Gradle"],
    loc: 16700, commits: 106, tests: 216, ci: true, updated: "2026-10-10",
    tagline: {
      zh: "手机上的完整 Git 客户端",
      en: "A full Git client for Android"
    },
    summary: {
      zh: "基于 Eclipse JGit 的 Android Git 客户端。克隆、拉取、暂存、提交、储藏、blame 和 diff 全部在设备上完成，外加一层自己实现的 OpenPGP，用来给提交签名。",
      en: "An Android Git client built on Eclipse JGit. Clone, fetch, stage, commit, stash, blame and diff all happen on-device, plus a hand-rolled OpenPGP layer used to sign commits."
    },
    highlights: [
      { zh: "三个模块：app（Compose 界面）、git-core（683 行核心 API）、openpgp", en: "Three modules: app (Compose UI), git-core (a 683-line core API), and openpgp" },
      { zh: "自建 OpenPGP 层：密钥生成、钥匙串、ASCII armor、分离式签名，不捆绑任何 gpg 二进制", en: "Hand-rolled OpenPGP: keygen, keyrings, ASCII armoring and detached signatures without bundling a GPG binary" },
      { zh: "216 个单元测试覆盖 Git 核心，分布在 30 个测试文件里", en: "216 unit tests over the Git core, spread across 30 test files" },
      { zh: "CI 会核对 APK 签名证书的 SHA-256，对不上就拒绝出包——这正是那种「绿灯但其实签错包」的失败", en: "CI verifies the built APK's signing-cert SHA-256 and refuses to ship on a mismatch — exactly the failure that otherwise looks like a green run" },
      { zh: "约 16,700 行 Kotlin，这一组里最大的 Android 代码库", en: "~16,700 lines of Kotlin — the largest Android codebase in this collection" }
    ]
  },
  {
    id: "opencode-inspire",
    name: "opencode-inspire",
    repo: "Geno1024-AIGC/opencode-inspire",
    url: "https://github.com/Geno1024-AIGC/opencode-inspire",
    tags: ["android"],
    lang: "kotlin",
    stack: ["Kotlin", "Jetpack Compose", "OkHttp 5", "kotlinx.serialization", "Coroutines"],
    loc: 19600, commits: 509, tests: 30, ci: true, updated: "2026-09-28",
    tagline: {
      zh: "手机上的 OpenCode 智能体客户端",
      en: "An Android client for the OpenCode coding agent"
    },
    summary: {
      zh: "连上跑着 opencode serve 的主机，挑一个项目目录，然后像聊天一样和编码智能体对话。自己写的 Markdown 渲染模块，内置 Mermaid 画图。",
      en: "Connect to a host running opencode serve, pick a project directory, and chat with the coding agent. A hand-written Markdown module, with Mermaid bundled for diagrams."
    },
    highlights: [
      { zh: "约 19,600 行 Kotlin、509 次提交，是这一组里迭代最久的项目", en: "~19,600 lines of Kotlin across 509 commits — the most-iterated project here" },
      { zh: "手写的 Markdown 解析模块 + 打包进 assets 的 mermaid，回复里的图表直接渲染", en: "A hand-written Markdown module plus vendored Mermaid renders diagrams straight in replies" },
      { zh: "用量日历、按模型筛选的统计图表，以及可分享的总结卡片", en: "Token-usage calendar, per-model filtered charts, and shareable summary cards" },
      { zh: "唯一有正式 release 工作流的仓库：打 tag 出已签名 APK", en: "The only repo with a real release workflow: tag it, get a keystore-signed APK" },
      { zh: "AGENTS.md 要求每次提交重新生成 tokens.txt，把造这个 App 实际花掉的 AI token 成本编译进 BuildConfig", en: "AGENTS.md mandates regenerating tokens.txt on every commit, compiling the real AI token cost of building the app into BuildConfig" }
    ]
  },
  {
    id: "free-zip",
    name: "free-zip",
    repo: "Geno1024-AIGC/free-zip",
    url: "https://github.com/Geno1024-AIGC/free-zip",
    tags: ["library", "cli"],
    lang: "java",
    stack: ["Java 21", "Kotlin 2.4", "Gradle KTS", "JUnit 5"],
    loc: 4540, commits: 33, tests: 52, ci: true, updated: "2026-10-10",
    tagline: {
      zh: "把 ZIP 的「压缩」和「打包」拆成两件事",
      en: "Splitting ZIP compression from ZIP assembly"
    },
    summary: {
      zh: "自己实现的 ZIP 编解码器，Java 和 Kotlin 各写了一份，类级别一一对应。pack 把每个条目压缩成 .lfh / .data / .cdfh 三件套，assemble 退化成纯字节拷贝——同一份压缩数据可以反复组装成不同的归档。",
      en: "A hand-written ZIP codec, implemented twice — once in Java, once in Kotlin — class for class. pack compresses each entry into an .lfh / .data / .cdfh triple; assemble degenerates to pure byte-copy, so one compressed payload can be re-assembled into many archives."
    },
    highlights: [
      { zh: "直接对着 APPNOTE.TXT 写，每段代码都标注了对应的规范小节", en: "Written straight against APPNOTE.TXT, with the governing section cited in every code block" },
      { zh: "size 子命令不读任何负载就能算出成品的精确 Content-Length", en: "The size subcommand computes an exact Content-Length without reading a single payload byte" },
      { zh: "edit 只改元数据、绝不碰 .data，CRC 和长度天然保持有效", en: "edit mutates metadata as pure functions and never touches .data, so CRCs and sizes stay valid" },
      { zh: "Zip64 支持 auto / always / never；选 never 时宁可硬失败，也不产出打不开的包", en: "Zip64 with auto / always / never — never hard-fails rather than silently writing an unreadable archive" },
      { zh: "Java 和 Kotlin 两边互相组装验证；52 个 JUnit 测试在 CI 里跑，含 Zip64 溢出、超长文件名、重复条目等加固用例", en: "Interop is verified in both directions; 52 JUnit tests run in CI, covering Zip64 overflow, over-long names and duplicate entries" }
    ]
  },
  {
    id: "home-erp",
    name: "home-erp",
    repo: "Geno1024-AIGC/home-erp",
    url: "https://github.com/Geno1024-AIGC/home-erp",
    tags: ["server", "android"],
    lang: "kotlin",
    stack: ["Kotlin", "JDK 25", "Gradle KTS", "零外部依赖"],
    loc: 6450, commits: 107, tests: 4, ci: true, updated: "2026-10-01",
    tagline: {
      zh: "三层结构的自托管家用 ERP",
      en: "A self-hosted household ERP in three tiers"
    },
    summary: {
      zh: "家里的 Star 服务、云端中继 Planet、手机端 Satellite。关键在打通 NAT：Star 主动外连 Planet，Planet 不存数据，只做逐字转发。",
      en: "Star at home, a Planet relay in the cloud, a Satellite on the phone. The point is NAT traversal: Star dials out to Planet, and Planet stores nothing — it just relays verbatim."
    },
    highlights: [
      { zh: "Star 主动外连，家里路由器上不需要开任何入站端口", en: "Star dials out, so no inbound port ever has to be opened on the home router" },
      { zh: "15 个 Gradle 模块跑在裸 JDK 上：数据库、JSON 编解码、HTTP 路由全是手写的", en: "15 Gradle modules on the bare JDK: the append-only-log store, JSON codec and HTTP router are all hand-written" },
      { zh: "零外部依赖——没有数据库、没有 Web 框架、没有前端框架", en: "Zero external dependencies: no database, no web framework, no UI toolkit" },
      { zh: ".gef 特性包格式：原生 UI DSL 与 WebView HTML 两种渲染器并存", en: "The .gef bundle format renders either as a native UI DSL or as HTML inside a WebView" },
      { zh: "每次 CI 发一个滚动 canary：服务器压缩包、APK 和特性包一起发布，保证客户端和服务端同版本", en: "One rolling canary release carries the server zips, APKs and feature bundles together, so client and server stay in lockstep" }
    ]
  },
  {
    id: "port-forwarder",
    name: "port-forwarder",
    repo: "Geno1024-AIGC/port-forwarder",
    url: "https://github.com/Geno1024-AIGC/port-forwarder",
    tags: ["server", "cli", "web"],
    lang: "go",
    stack: ["Go 1.25", "net/http", "golang.org/x/crypto", "embed"],
    loc: 5002, commits: 33, tests: 28, ci: false, updated: "2026-09-09",
    tagline: {
      zh: "带网页控制台的 TCP 端口转发器",
      en: "A TCP port forwarder with a web console"
    },
    summary: {
      zh: "单文件 TCP 转发守护进程，管理界面是内嵌的网页而不是配置文件。除了本地正向转发，还支持基于普通 sshd 的反向转发。",
      en: "A single-binary TCP forwarding daemon whose management surface is an embedded web UI instead of a config file. Local relaying, plus reverse forwarding over stock sshd."
    },
    highlights: [
      { zh: "两种模式：本地 TCP 中继，以及等价于 ssh -R 的反向转发", en: "Two modes in one tool: a local TCP relay and an ssh -R-equivalent reverse forward" },
      { zh: "凭据与规则分开存（一份 SSH 登录可支撑多条规则），文件权限 0600", en: "Credentials are stored apart from rules — one SSH login backs many rules — both files at 0600" },
      { zh: "支持密码 / ssh-agent / 私钥三种认证，并有「探测登录」接口在保存规则前先试一次", en: "Password, ssh-agent or private-key auth, plus a probe endpoint that tests a login before the rule is saved" },
      { zh: "README 没写的还有自建中继：server / client 子命令走自定义的换行分隔 JSON 控制协议，按需建立数据连接", en: "Beyond the README: server / client subcommands relay over a custom newline-delimited JSON control protocol with on-demand data connections" },
      { zh: "28 个 Go 测试，其中包含一个跑在进程内的 SSH 测试服务器", en: "28 Go tests, including a real SSH test server running in-process" }
    ]
  },
  {
    id: "pdf-extractor",
    name: "pdf-extractor",
    repo: "Geno1024-AIGC/pdf-extractor",
    url: "https://github.com/Geno1024-AIGC/pdf-extractor",
    tags: ["desktop", "tooling"],
    lang: "cpp",
    stack: ["C++17", "Qt 5 Widgets", "zlib", "CMake"],
    loc: 5140, commits: 48, tests: 1, ci: true, updated: "2026-10-07",
    tagline: {
      zh: "PDF 内部结构浏览器与提取器",
      en: "A PDF internals browser and extractor"
    },
    summary: {
      zh: "C++ / Qt5 写的 PDF 解析工具。刻意不做渲染器——它是一个检查器：把每个对象摊开给你看。",
      en: "A PDF parsing tool in C++/Qt5. Deliberately not a renderer: it is an inspector that lays every object out for you."
    },
    highlights: [
      { zh: "每个对象都有六个页签：结构树、解码文本、十六进制、图像、原始内容算子、字体", en: "Six tabs per object: structure tree, decoded text, hex dump, images, raw content operators, fonts" },
      { zh: "手写的 CFF / Type1C / CIDFontType0C 字体解析器，能反汇编每个字形的 Type 2 charstring 程序", en: "A hand-written CFF / Type1C / CIDFontType0C font parser that disassembles each glyph's Type 2 charstring program" },
      { zh: "解 FlateDecode（含 Predictor）、ASCII85、ASCIIHex、RunLength、LZW；图像流按原字节透传", en: "Unpacks FlateDecode (with Predictor), ASCII85, ASCIIHex, RunLength and LZW; image streams pass through as raw bytes" },
      { zh: "7 个 CLI 子命令，加中英双语界面、拖放打开、最近文件", en: "Seven CLI subcommands, plus a bilingual 中/English UI, drag-and-drop and recent files" },
      { zh: "Windows 打包会递归遍历 PE 导入表补齐 zlib / ICU / freetype，然后在没有 MinGW 的 cmd 里跑一遍，证明确实自包含", en: "Windows packaging recursively walks PE imports to bundle zlib, ICU and freetype, then runs the exe under cmd — which has no MinGW — to prove it's self-contained" }
    ]
  },
  {
    id: "qrcode-step-reader",
    name: "qrcode-step-reader",
    repo: "Geno1024-AIGC/qrcode-step-reader",
    url: "https://github.com/Geno1024-AIGC/qrcode-step-reader",
    tags: ["android", "desktop"],
    lang: "kotlin",
    stack: ["Kotlin Multiplatform", "Compose Multiplatform", "CameraX", "ZXing (仅测试)"],
    loc: 4118, commits: 5, tests: 5, ci: false, updated: "2026-08-16",
    tagline: {
      zh: "把二维码的解码过程动画化",
      en: "Animating how a QR code actually decodes"
    },
    summary: {
      zh: "读到二维码之后，它把整个解码过程分阶段回放：取样 → 二值化 → 校正 → 格式信息 → 去掩码 → 读位 → 分块 → Reed–Solomon 校验 → 文本。每一步下面写的都是真实的中间值，不是泛泛的说明。",
      en: "Once it reads the QR code, it replays the whole decode stage by stage — capture, binarize, rectify, format info, unmask, read bits, split, Reed–Solomon, text. Each caption shows the real intermediate values, not generic prose."
    },
    highlights: [
      { zh: "解码器从零手写：定位图形交叉校验、透视校正、格式信息 BCH 解码、8 种数据掩码、GF(256) 上带真实伴随式计算的 Reed–Solomon", en: "Written from scratch: finder-pattern cross-checks, perspective rectification, format-info BCH decoding, all 8 data masks, Reed–Solomon over GF(256) with real syndrome computation" },
      { zh: "解码器返回的是一条时间线而不是一个字符串：每一阶段都带完整的模块矩阵和单元格角色标注", en: "The decoder returns a timeline, not a string: each stage carries the full module grid plus cell roles, so the UI can scrub the pipeline" },
      { zh: "掩码公式直接写进双语字幕，例如 ((y·x) % 3 + (x + y) % 2) % 2 == 0", en: "Even the mask formulas appear in the bilingual captions, e.g. ((y·x) % 3 + (x + y) % 2) % 2 == 0" },
      { zh: "拿 ZXing 生成的测试图做交叉验证（ZXing 只出现在测试依赖里，解码器本身不依赖它）", en: "Cross-validated against ZXing-generated test images — ZXing appears only as a test dependency, the decoder itself does not use it" },
      { zh: "一套 Compose Multiplatform 代码同时服务 Android 相机与桌面文件选择器，打包成 Deb / Rpm / AppImage", en: "One Compose Multiplatform codebase serving Android CameraX and the desktop file picker, packaged as Deb / Rpm / AppImage" }
    ]
  },
  {
    id: "qqfm",
    name: "qqfm",
    repo: "Geno1024-AIGC/qqfm",
    url: "https://github.com/Geno1024-AIGC/qqfm",
    tags: ["android"],
    lang: "kotlin",
    stack: ["Kotlin", "Jetpack Compose", "Gradle KTS", "零第三方库"],
    loc: 3573, commits: 25, tests: 0, ci: true, updated: "2026-10-10",
    tagline: {
      zh: "QQ 缓存图片的相册",
      en: "A gallery for images cached inside Tencent QQ"
    },
    summary: {
      zh: "浏览、查看、批量删除腾讯 QQ 私有目录里缓存的图片。因为 /Android/data 在 Android 11 以后读不到，所有文件操作都走 root shell。",
      en: "Browse, view and bulk-delete the images Tencent QQ caches in its private directory. Because /Android/data is unreadable on Android 11+, every file operation goes through a root shell."
    },
    highlights: [
      { zh: "用 find -print0 | xargs -0 stat 流式扫描约 16.5 万个文件，并落一份 TSV 索引，重开就秒进", en: "Streams find -print0 | xargs -0 stat across ~165k files with an on-disk TSV index, so relaunching is instant" },
      { zh: "删一张图要连带 QQ 生成的 3–4 个同名变体，但只统计真实存在的那几个", en: "Deleting one image expands to QQ's 3–4 sibling variants — but only the files that actually existed get counted" },
      { zh: "内置更新器走 4 个可选镜像，但版本元数据永远从 api.github.com 读，镜像没法谎报版本", en: "The in-app updater pulls through 4 selectable mirrors, while release metadata is always read from api.github.com so a mirror can't spoof a version" },
      { zh: "12 种 APK 安装失败码各自对应一条明确的 UI 提示，而不是一句「安装失败」", en: "Twelve distinct install-failure codes each map to their own UI message, instead of one generic 'install failed'" },
      { zh: "零第三方库，连 JSON 解析器都是自己写的；因为每次读文件都要 fork su，用 Semaphore(4) 限制并发", en: "Zero third-party libraries — even the JSON parser is hand-rolled; a Semaphore(4) caps concurrency because every read forks su" }
    ]
  },
  {
    id: "picture-frame-android",
    name: "picture-frame-android",
    repo: "Geno1024-AIGC/picture-frame-android",
    url: "https://github.com/Geno1024-AIGC/picture-frame-android",
    tags: ["android"],
    lang: "kotlin",
    stack: ["Kotlin", "Jetpack Compose", "Material 3", "Gradle KTS"],
    loc: 3360, commits: 32, tests: 28, ci: true, updated: "2026-09-26",
    tagline: {
      zh: "给照片加相框",
      en: "Photo framing for Android"
    },
    summary: {
      zh: "7 种相框样式、可调背景、渐变、比例和留白，导出 JPEG / PNG 进相册。预览和导出走的是同一套渲染代码。",
      en: "Seven frame styles with adjustable backgrounds, gradients, aspect ratios and margins, exported to JPEG / PNG. The preview and the export share one rendering path."
    },
    highlights: [
      { zh: "「预览不是导出的近似——它就是导出，只是画得小一点」", en: "\"The preview is not an approximation of the export — it is the export, drawn smaller.\"" },
      { zh: "自己实现的可分离盒式模糊和叠加矩形阴影，保证输出不随 Android 版本漂移", en: "A hand-rolled separable box blur and stacked-rectangle shadows, chosen so output doesn't change between Android versions" },
      { zh: "README 里写下了 canary 更新的威胁模型：清单被投毒也只能让更新失败，装不上别人的包——因为 Android 拒绝不同签名的更新", en: "The README reasons through the canary-updater threat model: a poisoned manifest can only fail the update, never install a foreign APK, because Android refuses a differently-signed update" },
      { zh: "CI 真的跑 testDebugUnitTest 和 lintDebug 并当门禁用，不是只 assemble 一下", en: "CI actually runs testDebugUnitTest and lintDebug as gates, rather than just assembling" },
      { zh: "7 个一键预设：拍立得、暗夜、虚化、暖阳、双线、留白、白边", en: "Seven one-tap presets: 拍立得, 暗夜, 虚化, 暖阳, 双线, 留白, 白边" }
    ]
  },
  {
    id: "adbd-tcp",
    name: "adbd-tcp",
    repo: "Geno1024-AIGC/adbd-tcp",
    url: "https://github.com/Geno1024-AIGC/adbd-tcp",
    tags: ["android", "tooling"],
    lang: "java",
    stack: ["Java", "Android Platform APIs", "Gradle KTS", "零依赖"],
    loc: 214, commits: 10, tests: 0, ci: true, updated: "2026-08-30",
    tagline: {
      zh: "让手机开启无线 ADB，从此不用插数据线",
      en: "Wireless ADB for a rooted phone, no cable required"
    },
    summary: {
      zh: "一个极小的 Android 应用：用 root 设置 service.adb.tcp.port，再用 setprop ctl.start / ctl.stop 控制 adbd 服务，把手机变成可以无线连接的 ADB 设备。",
      en: "A tiny rooted-Android utility: it sets service.adb.tcp.port and drives the adbd service via setprop ctl.start / ctl.stop, turning the phone into a wireless-debuggable ADB target."
    },
    highlights: [
      { zh: "零依赖：不用 AndroidX、不用任何 UI 框架，一个 Activity 加一个布局就完了", en: "Zero dependencies: no AndroidX, no UI toolkit — one Activity, one layout" },
      { zh: "146 行的 MainActivity，所有 su -c 调用都放在后台线程上", en: "A 146-line MainActivity; every su -c call runs on a worker thread" },
      { zh: "实时读回 service.adb.tcp.port 与 init.svc.adbd 的状态，端口号持久化到 SharedPreferences", en: "Reads back the live status of both the port property and the service; the port is persisted in SharedPreferences" },
      { zh: "GitHub Actions 每次 push 构建一个 892 KB 的 debug APK 并传成 artifact", en: "GitHub Actions builds an 892 KB debug APK on every push and uploads it as an artifact" }
    ]
  },
  {
    id: "nodejs-step-executor",
    name: "nodejs-step-executor",
    repo: "Geno1024-AIGC/nodejs-step-executor",
    url: "https://github.com/Geno1024-AIGC/nodejs-step-executor",
    tags: ["web", "tooling"],
    lang: "js",
    stack: ["Vanilla JS", "acorn", "无构建步骤"],
    loc: 1596, commits: 8, tests: 0, ci: false, updated: "2026-08-30",
    tagline: {
      zh: "浏览器里的 JavaScript 单步调试器",
      en: "A step debugger for JavaScript that lives in the browser"
    },
    summary: {
      zh: "双击一个 HTML 文件就能用的 JS 单步调试器。acorn 负责解析，一个手写的 AST 解释器负责逐句执行——没有 Node 进程，没有 CDP，断点、调用栈和作用域变量全在页面里。",
      en: "A step debugger for JavaScript that runs entirely client-side. acorn parses; a hand-written AST interpreter executes statement by statement. No Node process, no CDP, no server — breakpoints, call stack and scope variables all live in the page."
    },
    highlights: [
      { zh: "异步协程解释器：每个 AST 节点都是 await 的，这才使得「在任意语句处暂停」成为可能", en: "An async coroutine interpreter — every node is awaited, which is what makes pausing at an arbitrary statement possible" },
      { zh: "return / break / continue 靠抛哨兵对象跨 await 传递，不会被吞掉", en: "return / break / continue propagate as thrown sentinel objects, safe across await boundaries" },
      { zh: "重写了 map / filter / forEach / reduce / some / every / find / findIndex / sort，回调能单步进去", en: "Reimplemented map / filter / forEach / reduce / some / every / find / findIndex / sort so callbacks are steppable" },
      { zh: "内置 _opCount 指令上限，脚本跑飞时报错，而不是把标签页卡死", en: "A built-in _opCount cap errors out on a pathological script instead of freezing the tab" },
      { zh: "3 个文件、无构建、acorn 本地打包，可离线使用；先前后端版本用 CDP + WebSocket，后来重写成了纯前端", en: "Three files, no build step, acorn bundled locally so it works offline; it started as a CDP + WebSocket backend and was rewritten to be purely client-side" }
    ]
  },
  {
    id: "proxied-crawler",
    name: "proxied-crawler",
    repo: "Geno1024-AIGC/proxied-crawler",
    url: "https://github.com/Geno1024-AIGC/proxied-crawler",
    tags: ["server", "tooling"],
    lang: "go",
    stack: ["Go 1.22", "纯标准库", "crypto/x509", "embed"],
    loc: 1429, commits: 11, tests: 0, ci: false, updated: "2026-08-10",
    tagline: {
      zh: "抓取网页响应体的中间人代理",
      en: "A man-in-the-middle proxy that captures response bodies"
    },
    summary: {
      zh: "把系统代理指向它，HTTP 响应体会按 URL 结构落盘。HTTPS 通过自签根 CA 加按域名现场签发的叶证书来解密。",
      en: "Point your proxy settings at it and every HTTP response body lands on disk, keyed by URL. HTTPS works by MITM-ing the CONNECT tunnel with leaf certificates issued on the fly from a locally generated root CA."
    },
    highlights: [
      { zh: "纯 Go 标准库，go.mod 里一行 require 都没有", en: "Pure Go standard library — zero require lines in go.mod" },
      { zh: "首次运行自动生成根 CA，按域名现场签发叶证书", en: "Generates a root CA on first run and issues per-host leaf certificates on the fly" },
      { zh: "chunked 与 Content-Length 两种响应都处理，回写客户端时统一改写成定长", en: "Handles both Content-Length and chunked responses, rewriting them to fixed-length on the way back to the client" },
      { zh: "内嵌 GUI：实时请求 / 字节 / 错误统计、可折叠的结果树、文件预览", en: "An embedded GUI: live request / byte / error counters, a collapsible result tree, and file preview" },
      { zh: "诚实的边界写在 README 里：整包响应缓存在内存里，只监听回环地址", en: "Honest limits, written down: responses are buffered whole in memory, and it binds loopback only" }
    ]
  },
  {
    id: "scheduled-backup",
    name: "scheduled-backup",
    repo: "Geno1024-AIGC/scheduled-backup",
    url: "https://github.com/Geno1024-AIGC/scheduled-backup",
    tags: ["desktop"],
    lang: "cpp",
    stack: ["C++17", "Qt 6 Widgets", "CMake", "系统 git"],
    loc: 2907, commits: 10, tests: 0, ci: false, updated: "2026-08-13",
    tagline: {
      zh: "把任意文件夹变成定时 Git 备份",
      en: "Turn any folder into a scheduled Git backup"
    },
    summary: {
      zh: "常驻系统托盘的 Qt 小工具，按间隔执行 git add → commit → push 到一个私有的 GitHub 或 Gitee 仓库。首次配置由向导弹导完成。",
      en: "A tray-resident Qt client that runs git add → commit → push on an interval to a private GitHub or Gitee repo. A wizard handles first-run setup."
    },
    highlights: [
      { zh: "向导弹导：选平台 → 一键注册 → 建 PAT → 自动创建私有仓库 → 生成 .gitignore → 首次推送", en: "A wizard: pick a platform, one-click signup, mint a PAT, auto-create the private repo, write .gitignore, first push" },
      { zh: "直接 shell out 到系统的 git，token 留在本地凭据文件里，永远不会进备份内容", en: "Shells out to the system git; the token stays in a local credentials file and never enters the backup itself" },
      { zh: "历史页签：待提交变更、commit 日志、每个 commit 的文件列表", en: "A history tab: pending changes, commit log, and per-commit file lists" },
      { zh: "提交信息按改动大小分级：{Init} / [Update] / (Fix)", en: "Commit messages graded by magnitude: {Init} / [Update] / (Fix)" },
      { zh: "README 认真写了没有 root 权限的 Linux 上打包 Qt 6 的真实路径，以及静态 Qt 和 AppImage 单文件两条路", en: "The README documents the real no-root Qt 6 packaging path on Linux, plus the static-Qt and AppImage single-file routes" }
    ]
  },
  {
    id: "toolbox",
    name: "toolbox",
    repo: "Geno1024-AIGC/toolbox",
    url: "https://github.com/Geno1024-AIGC/toolbox",
    tags: ["desktop", "cli", "tooling"],
    lang: "cpp",
    stack: ["C++17", "Qt 6 Widgets", "CMake", "原生 JS 前端"],
    loc: 2028, commits: 10, tests: 0, ci: false, updated: "2026-09-28",
    tagline: {
      zh: "给这堆项目做的统一启动器",
      en: "A launcher that ties the whole pile together"
    },
    summary: {
      zh: "一个 JSON 清单对应一个工具，把旁边这十几个仓库变成一个统一的启停面板。同一个核心库同时驱动 Qt 桌面 GUI 和 toolboxd 无头服务。",
      en: "One JSON manifest per tool turns the sibling repositories into a single start/stop control panel. One core library drives both the Qt desktop GUI and the headless toolboxd server."
    },
    highlights: [
      { zh: "注册一个新工具只需要往 manifests/ 里丢一个 JSON 文件，不用改代码", en: "Registering a tool is one JSON file in manifests/ — no code changes" },
      { zh: "在 QTcpServer 上手写了约 150 行的 HTTP/1.1 服务器：请求解析、MIME 映射、静态资源与 Markdown 文档", en: "A ~150-line HTTP/1.1 server written directly on QTcpServer: request parsing, MIME mapping, static and Markdown serving" },
      { zh: "五种工具类型：service / webapp / desktop / android / document", en: "Five tool types: service, webapp, desktop, android, document" },
      { zh: "进程五态（Stopped / Starting / Running / Detached / Failed）、实时 PID、滚动日志、异步 TCP 健康探测", en: "Five process states (Stopped / Starting / Running / Detached / Failed), live PID, rolling log tail, async TCP health probes" },
      { zh: "自带一份 AGENTS.md，把提交信息规范写成 AI 代理也能照做的约定", en: "Ships an AGENTS.md that states the commit conventions as rules an AI agent can follow" }
    ]
  },
  {
    id: "whwd",
    name: "whwd",
    repo: "Geno1024-AIGC/whwd",
    url: "https://github.com/Geno1024-AIGC/whwd",
    tags: ["desktop", "cli"],
    lang: "c",
    stack: ["C11", "Win32", "SetupAPI", "CMake", "GPL-3.0"],
    loc: 1410, commits: 31, tests: 0, ci: true, updated: "2026-09-24",
    tagline: {
      zh: "Windows 上的 mhwd",
      en: "mhwd, for Windows"
    },
    summary: {
      zh: "纯 C11 Win32 写的硬件检测与驱动更新工具，命令行和参数刻意对齐 Manjaro 的 mhwd。不依赖 .NET。",
      en: "A hardware detection and driver updater in pure C11 Win32, deliberately mirroring Manjaro's mhwd in both CLI shape and philosophy. No .NET."
    },
    highlights: [
      { zh: "用 SetupAPI 枚举设备，输出 HWID、名称、驱动版本、日期、提供商和实例 ID", en: "Enumerates devices via SetupAPI, reporting HWID, name, driver version, date, provider and instance id" },
      { zh: "通过 ntdll!RtlGetVersion 探测系统特性，绕过被应用清单撒谎的 OS 版本", en: "Probes features through ntdll!RtlGetVersion, bypassing the OS version an application manifest lied about" },
      { zh: "通过 Windows Update 的 IUpdateSearcher 列出驱动，源适配器藏在统一的 C 接口后面", en: "Lists drivers through Windows Update's IUpdateSearcher, with source adapters behind a uniform C interface" },
      { zh: "x86 上用 v141_xp 工具集仍能编译出支持 Windows XP SP3 的版本，Win7 SP1 及以上则是另一套目标", en: "An x86 build still targets Windows XP SP3 via the v141_xp toolset, with Win7 SP1 and above as the other target" },
      { zh: "JSON 是 CLI 和 GUI 之间的契约：命令行和 Win32 ListView 界面跑的是同一套核心代码", en: "JSON is the contract between CLI and GUI: the console tool and the Win32 ListView front end run identical core code" }
    ]
  },
  {
    id: "task-roulette",
    name: "task-roulette",
    repo: "Geno1024-AIGC/task-roulette",
    url: "https://github.com/Geno1024-AIGC/task-roulette",
    tags: ["cli", "web"],
    lang: "go",
    stack: ["Go 1.22", "纯标准库", "go:embed"],
    loc: 927, commits: 17, tests: 2, ci: true, updated: "2026-08-16",
    tagline: {
      zh: "每天帮你选一个项目",
      en: "Picks one project for you, every day"
    },
    summary: {
      zh: "约 900 行、零依赖的 Go 工具。用 sha256(日期) % 项目数 决定今天做哪个——同一天在任何机器上都是同一个结果，不需要服务器参与。",
      en: "A ~900-line, zero-dependency Go tool. sha256(date) % len(projects) decides today's pick — the same day yields the same answer on any machine, with no server involved."
    },
    highlights: [
      { zh: "选择是纯确定性的：同一天、同一批项目，永远是同一个结果", en: "Selection is purely deterministic: same day, same project list, same answer" },
      { zh: "零依赖：net/http + go:embed + crypto/sha256，Linux / Windows / macOS 一个文件", en: "Zero dependencies: net/http + go:embed + crypto/sha256; one binary for Linux, Windows and macOS" },
      { zh: "内嵌网页 UI，同一局域网的手机上也能打开", en: "An embedded web UI, reachable from your phone on the same LAN" },
      { zh: "想换就 reroll，覆写会写进当日文件", en: "Reroll if you disagree — the override is written to a per-day file" },
      { zh: "默认端口 29810 来自字符 \"tr\" 的两个 ASCII 码", en: "The default port 29810 comes from the ASCII bytes of \"tr\"" }
    ]
  }
];
