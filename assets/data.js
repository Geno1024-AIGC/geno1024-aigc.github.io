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
    ]},
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
    ]},
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
    ]},
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
    ]},
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
    ]},
];
