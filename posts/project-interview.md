---
title: 项目面试追问手册 · 易传
date: 2026-11-12
description: 以易传项目为主线的面试追问手册：架构与三条核心链路、上传下载预览的可靠性设计、性能与安全取舍、数字口径校准与压力面
---
# 项目面试追问手册 · 易传

> 依据：简历中的项目经历 + 当前仓库真实代码（不是编的答案）。
> 用法：第 0 节先理解项目；第 1-7 节按简历 7 条主线过；第 8 节校准数字口径；第 9 节做压力面；第 12 节考前速记。
> 标记：★★★ 必背（大概率问）｜★★ 加分（答上拉开差距）｜★ 了解（能说清即可）。
> 回答结构：一句话结论 → 项目里的做法 → 一个坑或取舍 → 收尾。不要背成长篇。

## 0. 先建立理解：这个项目到底在解决什么

### 0.0 时间不够怎么用这份文档

- **今晚 2 小时**：背熟 0.1 / 0.2；看第 2 节 Q1-Q5（上传、下载、超时、取消）；记第 8 节的口径表。
- **明天 2 小时**：看第 1、3、4 节；用第 9 节挑 5 题自问自答，卡住的回到对应 Q。
- **面试前 30 分钟**：只看第 12 节一页速记。
- **不要逐字背**：每个答案只记“结论 + 一个数字 + 一个坑”，剩下用自己的话说。

### 0.1 30 秒介绍（必须背到脱口而出）

> 易传是一个零后端的跨设备文档中转站。它把 GitHub 上一个独立的公开仓库当作文件存储，前端是 Vue 3 + Vite，部署在 GitHub Pages。访客不用登录就能浏览、预览、下载；管理台填一个只授权数据仓库的 PAT，就能上传、覆盖、删除。因为没有服务器，我把重点放在三件事上：上传下载的可靠性（XHR 真实进度、三级下载回退、可取消）、预览的性能与安全（解析库动态导入、DOMPurify 清洗）、以及用 Vitest 和 CI 门禁把核心逻辑锁住。目前 6 个测试文件 110 个用例，`src/lib` 行覆盖率 97.75%。

### 0.2 90 秒版（在 30 秒版上补三个数字 + 一个取舍）

- 数字：110 个用例；行覆盖率 97.75%、分支 92.09%；首屏 JS 142KB，xlsx 414KB、mammoth 291KB、purify 28KB 都是按需加载的独立 chunk。
- 取舍：下载优先走第三方镜像换弱网速度，但镜像请求刻意不带 token；用 localStorage 存 PAT 换零后端，但接受 XSS 风险，用最小权限令牌 + DOMPurify 缓解。
- 一句话总结：**这个项目的难点不是 CRUD，而是把不可控的第三方 API 包装成一条可用的传输链路。**

### 0.3 一张图看懂架构

```text
浏览器（Vue 3 静态站点，部署在 GitHub Pages）
  ├─ 读：GET  /repos/{owner}/{repo}/contents/{dir}     匿名，60 次/小时/IP
  ├─ 写：PUT/DELETE contents + Bearer PAT              仅数据仓库，5000 次/小时
  ├─ 下载：ghfast 镜像 → Contents API raw → download_url
  └─ 预览：动态 import mammoth / xlsx + DOMPurify 清洗

数据仓库（Public，files/）  ← 唯一存储，上传不触发网站构建
代码仓库 → GitHub Actions（test:coverage → build）→ GitHub Pages
```

### 0.4 三条核心链路（理解比背答案重要）

**上传**

1. `canWrite()` 检查 owner / repo / token，没有就打开设置页。
2. `isAcceptedDocument` 过滤扩展名，`sanitizeFilename` 清洗文件名。
3. `getEntry` 查同名文件：存在则弹确认框，并记下 `sha` 用于覆盖。
4. `FileReader.readAsDataURL` 转 base64，去掉前缀。
5. `XMLHttpRequest` PUT 到 Contents API，`upload.onprogress` 更新百分比。
6. 成功 toast + `reload()` 强制刷新列表；多文件串行执行。

**下载**

1. 先查 Cache Storage，命中直接返回 blob。
2. 镜像：`ghfast.top + rawUrl`，12 秒超时。
3. Contents API raw：带 token，`Accept: application/vnd.github.raw`。
4. `download_url` 官方直链：最后兜底。
5. 任意一级成功 → 流式读取 blob（读流时回调进度）→ 写入缓存并清理同路径旧 sha。
6. `saveBlob` 创建 Object URL，触发 `<a download>`，2 秒后 `revokeObjectURL`。

**预览**

1. `isPreviewable` 判断格式，不支持的直接提示下载。
2. 复用下载链路拿 blob，可取消、有进度。
3. TXT / MD / CSV → `decodeText`；DOCX → mammoth；XLS/XLSX → SheetJS；PDF → blob URL + iframe。
4. DOCX / XLSX 转出的 HTML 必须经 DOMPurify 才允许 `v-html`。
5. 关闭弹窗 `cleanup()`：abort 请求、revoke PDF URL、清空 HTML 和 workbook。

### 0.5 代码地图（被问“在哪实现的”时别慌）

| 职责 | 文件 | 关键函数 |
| --- | --- | --- |
| GitHub API、上传下载、缓存、错误映射 | `github.js` | `listFiles` / `uploadFile` / `downloadFile` / `deleteEntry` |
| 仓库配置、localStorage、URL 识别 | `config.js` | `saveConfig` / `detectRepoFromUrl` / `canWrite` |
| 扩展名、分类、白名单 | `filetypes.js` | `isAcceptedDocument` / `isPreviewable` |
| 文本解码 | `text.js` | `decodeText` |
| 格式化 | `format.js` | `formatSize` / `formatDate` / `formatSpeed` |
| 列表状态、下载、删除 | `useFileList.js` | 模块级单例 + 60 秒缓存 + token |
| 搜索、排序、分类 | `useFileFilter.js` | `visibleFiles` / `displayGroups` |
| 上传队列 | `UploadZone.vue` | `handleFiles` / `uploadOne` / `cancelUpload` |
| 预览 | `PreviewDialog.vue` | `load` / `renderSheet` / `cleanup` |

### 0.6 简历 7 条主线 → 面试官最可能问什么

| 简历条目 | 最可能追问 |
| --- | --- |
| 架构设计（分仓、PAT、匿名读） | 为什么不用后端？token 安全吗？为什么必须 Public？ |
| 文件传输（XHR、三级回退、取消） | 为什么不用 fetch？12 秒超时超的是什么？取消怎么实现？ |
| 性能与缓存（动态 import、Cache Storage） | 首屏省了多少？缓存键为什么带 sha？旧版本怎么清？ |
| 在线预览（DOMPurify、GBK） | v-html 前做了什么？GBK 怎么判断？快速切换怎么防竞态？ |
| 状态管理（单例、60 秒、token） | 为什么不用 Pinia？慢请求覆盖怎么防？模块单例有什么坑？ |
| 工程化与质量（Vitest、CI） | 110 个用例怎么分布？XHR 怎么 mock？覆盖率能说明什么？ |
| 代码质量（1009 → 225） | 怎么拆的？收益是什么？怎么证明行为没变？ |

### 0.7 简历技能 × 本项目：哪些能举例，哪些不能（重要）

这份表是防“背串”的。面试官问“这个技术你在项目里怎么用的”，只能答表里“能举例”的部分。

| 简历技能 | 本项目实际情况 | 面试怎么说 |
| --- | --- | --- |
| 闭包 / 原型链 / this / 事件循环 | 用了闭包（composable、模块单例）、Promise 异步编排，但没有手写复杂题 | 八股按《专业技能面试追问》背；项目里举“模块级状态 + Promise.all”即可 |
| 事件委托 | **没用手写事件委托**，列表交互是 Vue 模板事件 | 不要说“项目里用了委托”；说“原理我懂，这个项目交给 Vue 组件事件更直接” |
| localStorage | 用了：配置和 token | 可举例，注意说清“只存配置，不存文件” |
| IndexedDB | **没用**，文件缓存用的是 Cache Storage | 不要混；问存储对比按技能文档答，项目例子说 Cache Storage |
| rAF | **没用**，进度条是 CSS transition + 百分比驱动 | 不要硬说用了；动画题按技能文档答 |
| Flex / Grid / 响应式 | 用了：Flex 列表、Grid 设置表单、640/560/520 断点、390px 验证 | 可举例 |
| 语义化 / 表单校验 | 用了语义标签；设置页是手写正则校验 + 原生 form submit，**没用 checkValidity/reportValidity** | 说“手写校验 + 正则”，不要编原生约束 API |
| Element Plus | **项目没装**，组件全是手写 | 千万别说项目用了；如果别处真用过再举例，没有就承认“这个项目手写，Element Plus 是了解层面” |
| Pinia | **没用**，用模块级 composable 单例 | 可答“状态规模小，模块单例够了；Pinia 的适用场景我了解” |
| SCSS | **没用**，原生 CSS + CSS 变量 + scoped | 不要说项目用 SCSS；口径按技能文档统一 |
| Axios | **没用**，fetch + XHR | 可答“原生够用，少一个依赖” |
| 防抖 / 节流 | **没用**，搜索是即时过滤，数据量小 | 不要硬举例；按技能文档答原理 |
| Web Worker | **没用**，mammoth/xlsx 在主线程解析 | 可答“这是已知优化点”，反而显得有判断 |
| TypeScript | **没用**，纯 JS | 不要说用了 TS |
| 组件测试 / E2E | **没做**，只有 6 个 lib 单测 + `pnpm preview` 手工冒烟 | 诚实说“下一阶段计划 Playwright”，不要编 |
| 自动重试 | **没有自动重试**：下载是“回退”，上传失败是手动“重试” | 说清“回退 ≠ 重试”，别混 |
| 真实 GitHub 写入测试 | **没做**，单测全部 mock，真实写入靠手工冒烟 | 诚实说“单测不碰网络” |

## 1. 架构设计（简历第 1 条）

### Q1 ★★★ 为什么把代码仓库和文件仓库分开？

**结论：让“写文件”和“发版”解耦。**

- 如果文件放代码仓库，每次上传都是一次 commit，会触发 GitHub Pages 重新构建；文件越多构建越慢，代码历史也被文件提交污染。
- 分开后：代码仓库只放源码，数据仓库只放文件；上传只写数据仓库，不触发网站构建，代码仓库保持干净。
- 配置上：`src/site-config.js` 指向数据仓库；设置页的 localStorage 只覆盖当前浏览器；fork 后改一行即可切换。
- 兜底：部署工作流仍保留 `paths-ignore: files/**`，万一有人把文件放回代码仓库，也不会触发构建。

**追问：为什么不用 submodule 或 Git LFS？**
submodule 仍挂在代码仓库上，LFS 需要额度和客户端支持；这里只需要“公开可读的文件目录”，独立仓库最简单。

**追问：数据仓库公开，隐私怎么办？**
项目定位是临时中转非敏感文档。敏感文件不该用这个方案；这属于架构边界，不是没考虑到。

### Q2 ★★★ 为什么不用后端、OSS 或 Supabase？

**结论：项目的约束是“零服务器、零成本、跨设备”，GitHub 仓库刚好提供公开读 + token 写 + 版本历史。**

- 后端方案要服务器、域名、存储、鉴权，成本和运维都不符合“临时传文件”的定位。
- OSS 需要账号和密钥，密钥放前端同样有安全问题，还要处理 CORS 和费用。
- GitHub Contents API 自带 CORS、sha 版本、公开读，是最小可行方案。
- 代价：单文件大小受限、base64 膨胀约 1/3、匿名限流、依赖第三方可用性。

**追问：如果要做成产品，你会怎么改？**
加一层轻后端 / BFF 隐藏 token，文件走对象存储，前端只拿短期签名 URL；同时补用户体系和权限。

### Q3 ★★★ 读匿名、写鉴权具体怎么实现？

- 读：`listFiles` / `getEntry` / `downloadFile` 不带 Authorization；公开仓库匿名可读。
- 写：只有 `uploadFile` / `deleteEntry` 需要 token；`requestHeaders` 在有 token 时加 `Authorization: Bearer ...`。
- token 只存 localStorage，不进源码、构建产物、日志。
- 下载镜像请求刻意不带 token，只带 `Accept: */*`，避免把令牌泄露给第三方镜像。

**追问：怎么验证 token 有效？**
设置页“测试连接”先 `fetchRepo` 拿仓库信息；私有仓库会给警告。真正写入失败时按 401/403 映射成“令牌无效”或“权限不足”。

### Q4 ★★★ PAT 放 localStorage，安全吗？

**结论：不是“安全”，是“在零后端约束下的可控风险”。**

- 风险比普通网站小：站点代码只有自己能改，Vue 默认转义，唯一的 `v-html` 入口是 DOMPurify 清洗后的 DOCX/XLSX 预览，也没有引入第三方脚本。
- 但仍不是零，现实路径有四条：① 预览别人给的 DOCX/XLSX 时，解析库漏洞或 DOMPurify 绕过都能在站点源执行脚本，直接读 localStorage；② npm 依赖被投毒同理；③ **GitHub Pages 的 `username.github.io` 是所有项目页共享的源，localStorage 按 origin 隔离、不按路径隔离**——同账号下其他 Pages 站点一旦被注入脚本，也能读到 `txt-relay:config:v1` 里的 token（键名可枚举，改名没用）；④ 浏览器扩展、本机恶意软件不受同源策略限制。
- 缓解：fine-grained PAT 只授权数据仓库、只给 `Contents: Read and write`、设置过期；预览 HTML 全部 DOMPurify；不引入第三方脚本；错误信息不回显 token。
- 效果：token 泄露后攻击者最多改/删数据仓库文件，碰不到其他仓库；但这是“降低影响面”，不是“不会发生”。
- 边界：这是个人工具，不是多租户产品。生产级应该用后端代理或 OAuth，token 不下发浏览器。

**追问：为什么不用 HttpOnly Cookie？**
纯静态站点没有服务端来 `Set-Cookie`；GitHub API 也只认 Authorization header。

**追问：DOMPurify 能防住 token 被盗吗？**
不能。它只清洗预览 HTML；token 安全靠最小权限、缩短过期时间、减少 XSS 面。

### Q5 ★★ 为什么数据仓库必须 Public？

- 匿名访客要能列表和下载；私有仓库每个访客都要 token，违背“换台电脑打开就能用”。
- GitHub Pages 对私有仓库需要付费账户。
- 代价：文件公开可读，所以定位是非敏感临时文件。

### Q6 ★★ 配置优先级？fork 后怎么工作？

1. `site-config.js` 的 owner/repo：构建时写入，所有访客默认。
2. localStorage 覆盖：只对当前浏览器生效。
3. GitHub Pages URL 自动识别：`username.github.io/repo`。

代码里 `siteRepo` 优先于 `detected`；localStorage 在模块初始化时覆盖 `config`。fork 后改 `site-config` 一行即可；只在设置页改，别的访客看不到。

**追问：为什么不用 `import.meta.env`？**
也能做，但 `site-config.js` 是仓库内可见的单一配置点，fork 后改一处即可；env 还要配 `.env` 和构建环境变量，对贡献者不直观。

### Q7 ★★ 为什么用 hash 路由？`base: './'` 解决什么？

- GitHub Pages 是静态托管，没有服务端 rewrite；history 模式刷新 `/manage` 会 404。hash 模式把路由放在 `#` 后，刷新不会打到服务端。
- `base: './'` 让资源用相对路径，部署在 `/upload_files/` 子路径也能正确加载。

**追问：history 模式能不能做？**
可以，用 404.html 复制 index.html 的 hack，或配置服务器 fallback；这里选简单可靠。

### Q8 ★ 上传文件会触发网站重新构建吗？

- 数据仓库独立后不会；代码仓库的 workflow 还保留 `paths-ignore: files/**` 作为历史兜底。
- Pages 部署只在代码仓库 push 时触发。

### Q9 ★★ 这个架构的边界在哪？

- 单文件大小：Contents API + base64，适合文档，不适合大文件/视频。
- 限流：匿名 60 次/小时/IP；列表 60 秒缓存，一次 2 个请求。
- 安全：文件公开、token 在浏览器。
- 一致性：列表最多滞后 60 秒。
- 依赖：镜像和 GitHub 的可用性。

**收尾**：这些边界我在 README 的“已知限制”里都写了，不是等面试官问才想起来的。

## 2. 文件传输（简历第 2 条）

### Q1 ★★★ 上传为什么用 XHR 而不是 fetch？

**结论：为了真实上传进度。**

- fetch 没有稳定的上传进度（Request stream 需要 `duplex: 'half'`，兼容性差）；XHR 的 `upload.onprogress` 直接给 `loaded` / `total`。
- XHR 还有 `timeout`、`abort`，错误事件清晰。
- 代价：回调式，代码比 fetch 长；我们用 Promise 包了一层，并统一抛 `AbortError`。

**追问：fetch 完全不能做进度吗？**
下载可以用 `response.body.getReader()` 读流；上传要用 ReadableStream + duplex，Safari 等支持不完整。

### Q2 ★★★ 上传进度怎么算？100% 之后为什么还等？

- `percent = loaded / total`；`total` 不可计算时显示不确定态。
- 100% 只代表浏览器把请求体发完，GitHub 还要接收、创建 commit，所以文案改成“等待仓库确认…”。
- 这是“传输进度”，不是“处理进度”。

### Q3 ★★★ 下载三级回退怎么实现？为什么是这个顺序？

**顺序：公共镜像（快）→ Contents API raw（稳）→ `download_url` 官方直链（兜底）。**

- 镜像 URL = `MIRROR_PREFIX + rawUrl`；`rawUrl` 优先 `item.download_url`，否则拼 `raw.githubusercontent.com`。
- 每一级网络异常或非 2xx 就 `continue`；`AbortError` 直接抛出，不继续。
- 只有镜像设 12 秒超时；API 和直链不设，避免大文件被误杀。
- 全部失败：用最后一个非 2xx 响应做状态映射，否则给通用网络错误。

**追问：为什么镜像放第一？**
国内直连 raw 慢；镜像通常更快。镜像挂了会自动回退，最坏多等 12 秒。

**追问：镜像安全吗？**
只用于公开文件，不带 token；第三方服务有可用性和隐私风险，README 已注明。

### Q4 ★★★ “12 秒首字节超时”具体超时的是什么？（口径校准）

- 代码里 `fetchWithFirstByteTimeout` 用 `setTimeout + AbortController`；fetch 在**收到响应头**时就 resolve，所以定时器实际覆盖的是“等响应头”的阶段。
- 严格说：**12 秒内没拿到响应头就回退，不是 body 首字节。**
- body 流式读取阶段靠外部 signal 继续监听，用户取消仍然能中断。

**面试怎么说**：
“12 秒内没有建立有效响应就回退；实现上是响应头阶段超时，body 阶段由外部 signal 控制。”

**追问：为什么不在 body 阶段也计时？**
大文件下载总时长不可控，按总时长会误杀；首包超时只解决“连接卡死”。

### Q5 ★★★ 取消怎么做的？上传和下载有什么区别？

- 共用 `AbortController`；下载把 `signal` 传给 fetch，fetch 在 body 读取阶段也会 reject `AbortError`。
- 上传把 signal 的 abort 事件转成 `xhr.abort()`；另设 10 分钟兜底超时（`xhr.timeout`），避免连接卡死时无限等待；请求结束移除监听，避免泄漏。
- 下载成功后，外部 signal 的监听会保留到 body 读完，确保流式读取阶段还能取消；signal 本身随这次请求丢弃，不会跨请求累积。
- UI 区分：用户取消 → info「已取消下载/上传」；超时/失败 → error。
- 预览弹窗关闭时 `cleanup()` 里 `loadController.abort()`，避免关闭后还更新状态。

**追问：取消后服务端还会执行吗？**
请求已发出时 GitHub 可能已经处理；取消只是前端不再等待，上传可能已经产生 commit。这是“取消等待”，不是“回滚”。

**追问：为什么上传在 base64 转换阶段取消不立刻生效？**
`FileReader` 没有接 abort；转换完成后检查 `signal` 再决定是否发送。这是已知限制，可以改用 `FileReader.abort` 或分片读取改进。

### Q6 ★★ 上传为什么串行？并发会怎样？

- `for...of + await`，一次一个。
- 原因：GitHub 每次 PUT 都是对同一分支的一次 commit；并发写同一分支容易 409 冲突，也避免瞬时打满限流。
- 代价：多文件总时长线性增加；可以改成有限并发 + 队列，但要处理同分支冲突。

**追问：一定要并发怎么办？**
并发发多个 PUT 仍会争同一分支，后提交的容易 409；更稳的是用 Git Data API 创建多个 blob，再一次性建 tree / commit，只产生一次提交。代价是代码复杂很多，所以当前没做。

### Q7 ★★ 同名覆盖怎么判断？`sha` 是什么？

- 上传前 `getEntry(path)`：存在则 confirm 覆盖，并把 `existing.sha` 传给 PUT；不存在则不带 sha 创建。
- `sha` 是 Git blob 的哈希，更新时必须提供当前 sha，否则 409/422。
- 删除同样需要 sha：DELETE body 里带 `item.sha`，列表项里已经有，不需要额外请求。
- 竞态：check 和 PUT 之间别人改了文件，PUT 会失败；错误映射提示“操作冲突，请刷新文件列表后重试”。

**追问：两个标签页同时上传同名文件？**
后提交的会 409；目前要求手动刷新重试，没有自动重试。

### Q8 ★★ 大文件怎么办？为什么不做分片 / 断点续传？

- 当前不适合：base64 膨胀 1/3、Contents API 单文件限制、全量读进内存。
- 分片要 Git Data API（blobs → tree → commit）或对象存储的分片上传；断点续传还要记录分片状态，复杂度远超“临时文档”定位。
- 诚实说：这是明确的范围裁剪，不是没想到。

### Q9 ★★ 文件名怎么清洗？

- 去路径（防目录穿越）、替换 `<>:"|?*` 和控制字符、去前导点、trim、空名回退 `file.txt`、超长保留扩展名截到 160。
- 仍然不处理 Windows 保留名（CON/PRN）和尾部点；GitHub 能存，但本地下载可能异常，属于已知边界。

### Q10 ★★ base64 的代价？

- `FileReader.readAsDataURL` 得到 data URL，去掉前缀；内存里同时有原 File、base64 字符串、请求体字符串，峰值至少是原文件的 2 倍（base64 本身就膨胀约 1/3）。
- 只适合几 MB 的文档；大文件会卡主线程、占内存。

### Q11 ★★ 第一次打开、目录还不存在时怎么处理？

- `listFiles` 遇到 404 不直接报错：先查一次仓库信息。
- 如果配置的分支不是默认分支，并且该分支也 404，说明分支写错了，给出明确提示：“分支 X 不存在，该仓库默认分支是 Y，请修改设置。”
- 否则说明只是目录还没创建（还没上传过文件），返回空数组，页面显示空状态。
- 只有 404 才会多这次请求，正常路径不会。

**追问：为什么要区分？**
只提示“找不到仓库”会让用户以为是仓库配错；实际最常见的错误是分支名写错。多一次请求换取可操作的错误提示。

### Q12 ★★ GitHub 返回 401 / 403 / 404 / 409 / 422 分别怎么提示？

- 401：令牌无效或过期 → 引导去「仓库设置」更新 PAT。
- 403：先看响应 message 是否包含 `rate limit`；是则提示“调用过于频繁，填令牌可提高额度”；否则提示“令牌缺少该仓库 Contents 读写权限”。
- 404：仓库、分支或路径不存在，也可能是令牌没有该仓库权限 → 提示检查设置。
- 409 / 422：更新时 `sha` 过期或并发冲突 → 提示刷新列表后重试。
- 其他：优先用 GitHub 返回的 message，否则给 `HTTP xxx`。

**追问：为什么 403 要单独判断？**
403 既可能是限流，也可能是权限不足，用户需要不同的解决动作。用 message 里的 `rate limit` 区分。

**追问：为什么请求都带 `cache: 'no-store'`？**
列表和文件内容要最新，不能让浏览器 HTTP 缓存返回旧响应；应用层缓存（60 秒列表缓存、Cache Storage 文件缓存）由我们自己控制，两层不要混。

### Q13 ★★ 下载的 Object URL 为什么 2 秒后才 revoke？

- `URL.createObjectURL(blob)` 生成临时 URL，`<a download>` 点击后浏览器异步开始下载；立即 revoke 在部分浏览器会让下载中断。
- 2 秒是经验值；测试里用假定时器断言 1999ms 未调用、2000ms 才调用 `revokeObjectURL`。
- 不用 `window.open`：blob URL 可能被浏览器直接预览而不是下载，`download` 属性更明确。
- 代价：这 2 秒 URL 仍占内存；blob 本身也要等引用释放后才能回收。

### Q14 ★★ 这个项目遇到跨域了吗？

- GitHub API 允许跨域，浏览器可以直接请求；带 `Authorization` 和自定义 `X-GitHub-Api-Version` 会触发 OPTIONS 预检，GitHub 会返回允许的 methods / headers。
- `raw.githubusercontent.com` 和镜像也是公开可读的跨域资源；镜像请求不带 token，既避免预检复杂化，也避免令牌泄露。
- 如果对方不返回 CORS 头，前端本身无解，只能走代理；这个项目没有自建代理，所以依赖 GitHub 和镜像的 CORS 配置。
- 排查时看 Network 里的预检请求和响应头，不要只看 console 的报错。

## 3. 缓存与性能（简历第 3 条）

### Q1 ★★★ 动态 import 体现在哪？首屏省了多少？

- `PreviewDialog.vue` 里按需 `await import('mammoth/mammoth.browser.js')`、`await import('xlsx')`、`await import('dompurify')`。
- 构建产物：`index` 142KB；`xlsx` 414KB、`mammoth` 291KB、`purify` 28KB 是独立 chunk。
- 首屏只加载 index + CSS；打开预览才拉对应 chunk。

**追问：为什么 DOMPurify 也动态？**
只有 DOCX/XLSX 预览需要；TXT/PDF 不需要。

**追问：动态 import 一定更快吗？**
首屏更快，但首次预览多一次网络往返；可以 `prefetch` 或在 hover 时预加载。

### Q2 ★★★ Cache Storage 键为什么是 `origin + owner/repo/sha/path`？

- sha 内容寻址：同一路径新版本 sha 变了，旧缓存不会命中，天然避免“看到旧文件”。
- owner/repo 隔离不同数据仓库；origin 隔离不同部署。
- 值为 `Response(blob)`，附带 `X-Relay-Path` 头用于清理。

**追问：为什么不用 localStorage？**
二进制要 base64、容量小、同步阻塞；Cache Storage 专门存 Request/Response，容量大且异步。

**追问：和 HTTP 缓存有什么区别？**
HTTP 缓存由响应头控制，可能 304；Cache Storage 是应用主动读写。这里没有注册 Service Worker，只是把 Cache Storage 当大容量 blob 存储用。

### Q3 ★★★ 旧版本缓存怎么清？

- 写入新缓存后遍历 `cache.keys()`，筛出同 owner/repo 前缀、`X-Relay-Path` 等于当前路径、key 不等于新 key 的条目，删除。
- **口径注意**：清理发生在“新版本第一次被下载并写入缓存”时，不是上传时；上传动作本身不碰 Cache Storage。
- 为什么不用 sha 前缀批量删？同一路径可能有多个历史 sha；按路径头匹配更精确。

### Q4 ★★ 隐私模式 / 配额异常怎么办？

- `readCachedFile` / `writeCachedFile` 都 try/catch；`caches` 不存在（隐私模式）或配额异常时静默回退网络。
- 缓存没有 TTL：sha 不变内容就不变；删除文件后本地缓存可能残留，属于可接受限制。

### Q5 ★★ 60 秒列表缓存 + 并发复用 + token 怎么工作？

- `lastLoadedAt`：60 秒内直接返回，不发请求。
- `pendingReload`：非强制刷新时，正在请求就复用同一个 Promise，避免并发重复拉取。
- `reloadToken`：每次请求 `++`；响应回来 token 不一致就丢弃，避免慢请求覆盖新数据。
- 上传成功、删除、保存设置都走 `reload()` 强制刷新。

**追问：为什么不用 TanStack Query？**
Vue 生态可以用，但这里只有 2 个页面，模块级 composable 足够，少一个依赖。

**追问：60 秒会不会看到旧数据？**
会，最多 60 秒；手动刷新和写操作会强制更新。

### Q6 ★★ 首屏 142KB 还能怎么优化？

- 路由懒加载（当前两个 view 是静态 import）；把 ManageView 拆出去。
- 组件按需、CSS 拆分、图片压缩（项目本身没有大图）。
- 先测再优化：看构建产物和 Lighthouse 的 FCP / LCP，不盲目拆包。

### Q7 ★★ 文件列表里的“上传时间”从哪来的？

- Contents API 的目录接口不返回每个文件的上传时间，只返回 size / sha / path。
- 用 commits API 拉最近 100 条提交，匹配 message 以“上传文件：”开头的提交，把文件名和 `committer.date` 建成 Map，再合并到列表。
- 为什么用提交信息当元数据：不额外引入数据库或元数据文件，GitHub 本身就是版本库。
- 边界：只覆盖最近 100 条；网页或命令行直接提交的文件没有这个前缀，就没有时间；所以 `listFileDates` 失败时 `catch(() => new Map())`，不阻塞列表。

**追问：文件名重复/改名怎么办？**
Map 只保留第一次出现的同名文件（`dates.has(name)` 跳过），改名会当成新文件、没有时间；当前不做重命名，属于可接受限制。

**追问：为什么不用每个文件单独查 commits？**
文件一多就是 N 次请求，匿名限流直接爆；一次拉 100 条只花 1 个请求。

## 4. 在线预览（简历第 4 条）

### Q1 ★★★ 预览链路怎么走？

- 点击预览 → `PreviewDialog` 打开 → `downloadFile` 拿 blob（带进度、可取消）→ 按扩展名分流。
- TXT / MD / CSV：`arrayBuffer` + `decodeText` → `<pre>` 文本。
- DOCX：`mammoth.convertToHtml` → `DOMPurify.sanitize` → `v-html`。
- XLS / XLSX：`XLSX.read` → `sheet_to_html` → DOMPurify → `v-html`；多 sheet 用 tab 切换。
- PDF：`URL.createObjectURL(blob)` → iframe。
- DOC / PPT / PPTX：`unsupported`，只下载。

### Q2 ★★★ 为什么 `v-html` 前必须 DOMPurify？能防什么？

- DOCX / XLSX 是用户上传的不可信内容，可能带 `<script>`、`onerror`、`javascript:` 链接。
- DOMPurify 按白名单清洗标签/属性，移除脚本和危险 URL；`USE_PROFILES: { html: true }` 只保留 HTML 能力。
- **不能防**：解析库自身的 0day、CSS 钓鱼、超大文件 DoS；也不能防 token 被别的 XSS 偷。

**追问：为什么不用 iframe sandbox？**
也可以，sandbox 隔离更强，但样式和交互受限；当前 sanitize 足够。

### Q3 ★★ GBK 回退怎么判断？

- `TextDecoder('utf-8')` 解码；结果包含替换字符 `\uFFFD`，说明字节不是合法 UTF-8，尝试 `TextDecoder('gbk')`；再失败返回 utf8。
- 为什么用 `\uFFFD`？Decoder 默认 `fatal: false`，非法序列会替换成 U+FFFD。
- 误判：合法 UTF-8 里本来就有 `\uFFFD` 时会多试一次（结果可能变 GBK 乱码）；非 UTF-8/GBK（如 Big5）仍可能乱码。

**追问：能自动识别编码吗？**
可以用 jschardet 检测，但增加依赖；当前“UTF-8 优先 + GBK 回退”覆盖国内最常见场景。

### Q4 ★★ 快速切换预览项，竞态怎么处理？

- 每次 `load` 创建 controller，存到 `loadController`；`reset` / `cleanup` 先 abort 上一个。
- `finally` 里只有 `loadController === controller` 才清 loading，避免旧请求把新请求的 loading 关掉。
- `cleanup` 释放 pdfUrl 的 Object URL、清空 blob / HTML / workbook。

**追问：abort 后 catch 里为什么直接 return？**
`AbortError` 是预期路径，不显示错误。

### Q5 ★★ PDF 的 blob URL 什么时候释放？

- `reset` / `cleanup` 时 revoke；弹窗关闭触发 `cleanup`。
- 不释放会占内存，长会话反复预览会累积。

### Q6 ★★ 大文件预览会卡吗？

- 会：下载耗时、`arrayBuffer` 全量进内存、mammoth / xlsx 解析在主线程。
- 可优化：Worker 解析、分页/虚拟滚动、预览大小上限、流式读取。
- 当前定位是文档中转，文件通常几 MB；README 已注明弱网首次预览要等。

### Q7 ★★ Markdown 为什么不渲染？

- 当前按纯文本展示，避免引入 markdown-it + 额外 XSS 面；README 已列为已知限制。
- 如果要做：markdown-it + DOMPurify，或直接渲染 sanitize 后的 HTML；代码高亮再按需引入。

### Q8 ★★ XLSX 多 sheet 怎么做的？

- `XLSX.read` 得到 workbook，`SheetNames` + `Sheets`；点击 tab 调 `renderSheet`，`sheet_to_html` 后 sanitize。
- `workbook` 放普通变量（不是 ref），因为不需要响应式；`sheetHtml` 是 ref 驱动视图。

**追问：workbook 为什么不用 shallowRef？**
也可以；普通变量足够，避免 Vue 代理大对象。

## 5. 状态管理（简历第 5 条）

### Q1 ★★★ 为什么状态放模块级 composable，不用 Pinia？

- 只有文件列表、下载进度、取消控制器这些跨路由共享的状态；模块级 `ref` / `reactive` 就是单例。
- 优点：零依赖、直接 import、来源清晰；缺点：没有 devtools / time-travel、HMR 可能保留旧状态、测试要 `resetModules`。
- 如果项目变大（用户、权限、多模块），再上 Pinia。

### Q2 ★★★ 请求 token 解决什么问题？举个例子。

- 场景：用户点刷新（请求 A），马上又点一次（请求 B）；B 先回、A 后回，A 的旧数据会覆盖 B 的新数据。
- 每次请求 `++reloadToken`；回调里 `token !== reloadToken` 就 return；只有最新请求能写 `files` / `error` / `loading`。
- 这是前端竞态的通用解法；也可以用 `AbortController` 取消旧请求。

### Q3 ★★ 模块级单例的坑？

- 多个组件同时用会共享状态，这是目的；但测试之间会串，需要 `vi.resetModules()` + 动态 import。
- HMR 可能保留旧模块状态，开发时偶尔要硬刷新。
- SSR 下模块级状态会跨请求共享，不能这么写；本项目是纯 CSR，没问题。

### Q4 ★★ 下载进度 Map / Set 为什么用 `reactive`？

- Vue 3 的 `reactive` 支持 Map / Set，`get` / `set` / `add` / `delete` 都能触发视图更新。
- `busyPaths` 防止同一文件重复点击；`downloadStates` 驱动进度条；`downloadControllers` 不需要响应式，用普通 Map。

**追问：为什么 controller 不放 reactive？**
它不需要驱动视图，放响应式反而会被代理；用普通 Map 更合适。

### Q5 ★★ 组件卸载后下载还在继续，状态更新会怎样？

- 下载状态在模块级，组件卸载不影响；重新进入页面还能看到进度，这是设计目标。
- 预览的 controller 在关闭弹窗的 `cleanup` 里 abort，因为预览是组件私有的。
- 全局 toast 定时器在 `toast.js` 里，组件卸载不影响，到点自动移除。

## 6. 工程化与质量（简历第 6 条）

### Q1 ★★★ 为什么只测 `src/lib`？

- lib 是纯逻辑：URL 拼接、错误映射、回退、缓存、解码、格式化；不依赖 DOM 布局，最适合单测。
- 组件测试需要挂载、事件、异步渲染，成本高；当前用 `pnpm preview` 冒烟 + 390px 检查覆盖 UI。
- 测试金字塔：lib 单测多，组件 / E2E 少；后续再补 Playwright。

### Q2 ★★★ 110 个用例怎么分布？举一个关键用例。

- github 61、config 17、filetypes 16、format 7、toast 5、text 4。
- 关键用例：下载三级回退——mirror 500 → API 404 → `download_url` 200，断言 fetch 调用 3 次、最终拿到 blob；再补一个三级全失败，断言错误文案。
- 另一个：镜像超时——假定时器推进 12 秒，断言 abort 后回退 API。

### Q3 ★★★ 怎么 mock XHR / fetch / Cache Storage？

- fetch：`vi.stubGlobal('fetch', vi.fn())`，用 `jsonResponse` / `blobResponse` / `streamResponse` 构造 `ok` / `status` / `json` / `blob` / `body`。
- XHR：自定义 `FakeXHR` 类，记录 `instances`，提供 `open` / `setRequestHeader` / `send` / `respond` / `abort`；测试里手动触发 `onload` / `onprogress` / `onabort`。
- Cache Storage：`vi.stubGlobal('caches', ...)` 或 `undefined`；缓存用例用内存 Map 模拟 `open` / `match` / `put` / `keys` / `delete`。
- 模块级初始化（config）：`vi.resetModules()` + `await import()` 隔离 localStorage。

**追问：为什么不用 msw？**
单元测试只测 lib，直接 stub 更轻；msw 适合组件 / E2E。

### Q4 ★★★ 覆盖率 97.75% 说明什么？剩下的是什么？

- 说明 `src/lib` 的语句/分支大部分被执行；分支 92.09% 说明主要异常/回退路径都覆盖了。
- 剩下：`text.js` 的 TextDecoder 抛错分支（Node 环境很难触发）、`github.js` 少数 catch/防御分支（`responseText` 解析失败、cache 读写的极端异常）。
- **覆盖率不等于质量**：断言是否正确、UI 是否正常、真实 GitHub 行为，都测不到；所以还有 preview 冒烟。

### Q5 ★★ 怎么测超时和取消？

- `vi.useFakeTimers()`；调用上传/下载；`advanceTimersByTime`；断言 reject 的 message / name。
- 取消：`controller.abort()`；断言 Promise reject `AbortError`；XHR 用例断言 `xhr.aborted`。
- 注意清理定时器，`afterEach` 里 `useRealTimers` + `unstubAllGlobals`。

### Q6 ★★ CI 门禁怎么配？

- GitHub Actions：checkout → pnpm setup → Node 24 + pnpm cache → `pnpm install --frozen-lockfile` → `pnpm test:coverage` → `pnpm build` → upload-pages-artifact → deploy-pages。
- 覆盖率阈值 80（语句/分支/函数/行），低于阈值 vitest 退出非 0，build 不执行，deploy 不会发生。
- `permissions`：contents read、pages write、id-token write；`concurrency` 取消旧部署。

**追问：测试失败会部署吗？**
不会，build job 失败，deploy 的 `needs: build` 不执行。

### Q7 ★★ 单测没覆盖组件，怎么保证 UI？

- 生产构建 `pnpm preview` 冒烟：列表加载、搜索、排序、分类、TXT 预览、下载、取消、上传、删除提示、390px 无横向溢出、控制台无报错。
- 这是手工回归，不是自动化；诚实说下一步是 Playwright 拦截 GitHub API 做 E2E。

### Q8 ★ 为什么用 happy-dom？

- 轻、快，提供 localStorage / FileReader / URL 等；不支持真实布局，所以不测 UI。
- 如果组件测试遇到兼容问题，可以换 jsdom。

## 7. 代码质量与重构（简历第 7 条）

### Q1 ★★★ 1009 行怎么拆的？

原 `FileList.vue` 同时负责：加载 / 缓存 / 下载 / 删除、搜索 / 排序 / 分类、筛选面板交互、行渲染、空状态、预览弹窗。

- 第一步抽逻辑：`useFileList`（列表、下载、删除、进度）、`useFileFilter`（搜索、排序、分类计算）。
- 第二步抽视图：`FileToolbar`（标题、搜索排序、筛选面板、分类条）、`FileRow`（单行、进度、按钮）；格式化函数下沉到 `lib/format.js`。
- 结果：`FileList.vue` 1009 → 225 行（含模板/样式），脚本只保留容器职责。

**追问：怎么保证行为不变？**
每一步都跑 `pnpm test` + `pnpm build` + `pnpm preview` 冒烟，DOM 结构和 class 不变。

### Q2 ★★ 拆分收益？代价？

- 收益：职责单一、可读性、改动影响面小、`FileRow` / `FileToolbar` 可复用、逻辑更容易测。
- 代价：文件变多、props / emit 传递变长、跨文件跳转；拆过头会增加理解成本。
- 判断标准：一个组件 / 函数是否只有一个变化原因；不是为了行数而拆。

### Q3 ★★ composable 和 mixin 的区别？

- composable 是显式调用，来源清晰、可传参、可组合；mixin 是隐式合并，命名冲突、来源不明。
- composable 能用 ref / computed / 生命周期，必须在 `setup` 同步调用。

### Q4 ★★ FileToolbar 也有 500 多行，算拆好吗？

- 它主要是模板 + scoped 样式，脚本只负责面板开关 / 外部点击 / Esc；按“变化原因”看是单一职责。
- 如果继续拆，可以把筛选面板拆成 `FileFilterPanel`；当前收益不大。

### Q5 ★★ 重复逻辑统一了哪些？

- `filetypes.js`：上传白名单、预览白名单、accept 属性、分类、扩展名；`UploadZone` 和 `FileRow` 共用，避免“能选不能传”。
- `text.js`：`decodeText` 从 `PreviewDialog` 迁出，可单测。
- `format.js`：`formatSize` / `formatDate` / `formatSpeed` 从 composable 和 `PreviewDialog` 抽离。
- `config.js`：`normalizeDir`、`detectRepoFromUrl` 参数化，便于测试。

### Q6 ★ 如果重来，你会怎么设计？

- 类型（TS）或 JSDoc；上传任务队列抽成独立模块；预览解析放 Worker；E2E；错误边界。
- 但不会一上来就上这些：先保证核心链路和可回归，再逐步加。

## 8. 数字与口径校准（防穿帮）

| 简历说法 | 实际口径 | 被追问怎么答 |
| --- | --- | --- |
| 1009 行 → 225 行 | 旧 `FileList.vue` 1009 行（含模板/样式/空行），新 225 行 | 拆分前后都用文件行数核对；不是只算脚本 |
| 6 个文件 110 用例 | `pnpm test` 实测 110 | github 61、config 17、filetypes 16、format 7、toast 5、text 4 |
| 行 97.75% / 分支 92.09% | `pnpm test:coverage`，范围 `src/lib/**`，排除 `site-config` | 统计的是 lib 纯逻辑，不含组件 |
| 首屏不含解析库 | `index` 142KB；xlsx 414KB、mammoth 291KB、purify 28KB 独立 chunk | 142KB 未 gzip；解析库首次预览才加载 |
| 12 秒首字节超时 | 实现是**响应头阶段**超时 | 说“12 秒没拿到有效响应就回退；严格说是响应头阶段” |
| 上传新版本清理旧 sha 缓存 | 新版本**首次下载写入缓存时**清理 | 上传本身不碰 Cache Storage |
| 支持 MD 预览 | 纯文本展示，不渲染 Markdown | 承认是纯文本，README 已知限制 |
| 三级下载回退 | 第三级依赖 `item.download_url` 存在 | Contents 列表通常有；没有就只剩两级 |
| 上传不触发网站构建 | 数据仓库独立后天然不触发；`paths-ignore` 兜底 | 代码仓库 push 才触发 Pages |
| 60 秒缓存 | 只对列表；下载缓存按 sha 无 TTL | 写操作/手动刷新强制更新 |

> 跨文档口径：`专业技能面试追问.md` 里写的 108 个用例 / 97.74% / 91.96% 是接入 toast 测试前的旧数字；以本表 **110 / 97.75% / 92.09%** 为准，面试只报一个版本。

**面试前可以这样自查**：

```bash
pnpm test            # 110 passed
pnpm test:coverage   # 97.75% lines / 92.09% branches
pnpm build           # dist 产物
git show 9eddfcd:src/components/FileList.vue   # 旧版 1009 行
```

## 9. 压力面：面试官质疑时怎么接

### Q1 “这不就是把 GitHub 当网盘？有什么技术含量？”

上传下载本身是 CRUD，难点在**不可控第三方 API 上的可靠性**：三级回退、超时、取消、缓存一致性、限流、竞态、XSS、CI。把不可靠依赖包装成可用产品，这是工程能力，不是接口调用。

### Q2 “三级回退是不是过度设计？”

单看一次请求是；但项目核心场景就是“换设备取文件”，下载失败等于产品不可用。镜像解决国内速度，API 解决镜像挂掉，直链解决 API 限流/权限。代价是代码复杂度和 12 秒最坏等待；如果只面向海外用户，可以去掉镜像。

### Q3 “纯前端存 token，安全上不合格吧？”

同意，生产级不合格。这是个人工具的取舍：fine-grained + 单仓库 + Contents 读写 + 过期 + DOMPurify；token 不发给镜像。产品化会加 BFF。

### Q4 “覆盖率 97% 是不是刷的？”

不是。覆盖的是回退、超时、取消、404、状态映射这些真实分支；组件没测，UI 靠 preview 冒烟。覆盖率只证明代码被执行过，不证明断言对。

### Q5 “1009 拆 225，不就是把代码挪走？”

拆分前一个文件有 7 类职责；拆完加载、筛选、行、工具栏各自独立，改搜索不用碰下载逻辑；每一步都验证行为不变。行数只是结果，不是目标。

### Q6 “项目没用户，怎么证明有价值？”

它解决我自己的跨设备传文档需求，上线可用，有 demo；代码、测试、README、CI 完整。价值在工程完整度和可维护性，不是 DAU。

### Q7 “如果 1 万人用，哪里先崩？”

匿名限流 60 次/小时/IP 先崩；其次是 Contents API 的单文件和 base64 限制；第三是公开仓库的隐私。要扩容必须加后端 / 对象存储，这不是纯前端能解的。

### Q8 “你项目里最难的 bug？”

取消下载在 body 流式读取阶段无效。原因：`fetchWithFirstByteTimeout` 在 fetch resolve（收到响应头）后就移除了外部 signal 监听，timer 清了但 body 还在读。修复：把外部监听保留到 body 读完；区分超时 abort 与用户 abort；补回归用例。

### Q9 “加一个批量删除 / 分享链接 / 文件夹，怎么设计？”

- 批量删除：串行 DELETE（每次一个 commit），或 Git Data API 一次 commit；UI 用选中集合 + 进度；失败逐项提示。
- 分享链接：文件本身有 GitHub 直链；站内可以做成 `#/files?file=path` 深链，打开后自动预览。
- 文件夹：Contents API 支持目录；当前只 `filter(type === 'file')`，需要递归 / 面包屑；数据仓库目录结构就是文件夹。

### Q10 “为什么 Vue 不用 React？”

项目小，Vue SFC + Composition API 上手快、模板直观、运行时轻；React 生态更大，但这里不需要。选择依据是项目约束，不是语言优劣。

### Q11 “这是个人项目还是团队项目？你负责什么？”

个人项目，从需求、交互、编码、测试到部署都是我自己做，10 月开始持续迭代。没有多人协作和 PR 评审，但我用提交信息规范、GitHub Actions CI 门禁和构建前测试来约束自己；团队协作流程我了解 GitHub Flow，但不会把这个项目说成团队项目。

**追问：最大的收获是什么？**
不是学会了某个 API，而是意识到“能跑”和“可靠”之间差的是异常路径：超时、取消、回退、竞态、缓存一致性。这些是项目里真正花时间的地方。

## 10. 故事库（被问“讲一个难点/踩坑”时用）

### 故事 1：取消下载失效（最推荐）

- **S**：大文件下载中点取消，按钮恢复了，但网络还在跑、进度还在更新。
- **T**：让取消在流式读取阶段也生效。
- **A**：读代码发现 `fetchWithFirstByteTimeout` 在 fetch resolve 后移除了外部 abort 监听；fetch 只等到响应头，body 还在流。把监听保留到 body 读完；区分超时 abort 与用户 abort；补回归用例。
- **R**：5.36MB PDF 取消即时生效；用例锁住行为。

### 故事 2：1009 行组件拆分

- **S**：一个组件同时管加载、筛选、下载、删除、UI。
- **T**：在行为不变的前提下拆分。
- **A**：先逻辑后视图；每步 test + build + preview；DOM / class 不变；格式化下沉 lib。
- **R**：225 行；后续改动定位更快。

### 故事 3：CI 门禁

- **S**：测试只在本地跑，可能忘记。
- **T**：让不合规代码无法部署。
- **A**：workflow 在 build 前跑 `test:coverage`；阈值 80；`--frozen-lockfile`；线上验证。
- **R**：失败即阻断；当前 110 用例全绿。

### 可选故事：历史重写导致文件丢失（谨慎讲）

- 用 `git filter-branch` 清理历史后强推，没先 fetch，覆盖了远程 3 个文件。
- 通过 GitHub API 读悬挂提交的 tree / blob，逐字节校验后恢复，并补了提交。
- 教训：重写历史前必须先 fetch / 备份分支；破坏性操作要有回滚方案。
- 这个故事能体现排查和恢复能力，但也暴露了操作事故；除非面试官问“最大的教训”，否则不讲。

## 11. 不会答时的兜底话术 + 反问

### 三层话术

1. **知道方向但没做过细节**：“这块我没有在项目里做过，我的理解是……；如果要做，我会先……再……。”
2. **完全不会**：“这个我没接触过，不瞎说；我回去补一下。”
3. **被质疑设计**：“当时的约束是……，所以我选了……；现在看更好的做法是……。”

### 反问面试官（选 2-3 个）

- 团队前端的项目类型和最大的技术挑战是什么？
- 新人培养和代码 review 机制是怎样的？
- 这个岗位更看重业务交付还是技术深度？

## 12. 一页速记（面试前 30 分钟只看这里）

| 主题 | 三个关键词 | 自测问题 |
| --- | --- | --- |
| 架构 | 分仓 / 匿名读 / PAT 写 | 为什么不用后端？ |
| 传输 | XHR 进度 / 三级回退 / Abort | 12 秒超时超的是什么？ |
| 缓存 | sha 键 / 清旧版 / 静默回退 | 为什么不用 localStorage？ |
| 预览 | 动态 import / DOMPurify / GBK | `v-html` 前做了什么？ |
| 状态 | 模块单例 / 60 秒 / token | 慢请求覆盖怎么防？ |
| 质量 | 110 / 97.75% / CI | 覆盖率统计范围是什么？ |
| 重构 | 1009 → 225 / composable / 子组件 | 怎么证明行为没变？ |

### 最后自检

1. 30 秒介绍能不能不看稿说顺，并自然带出 2-3 个数字。
2. 三级回退、取消、缓存键、DOMPurify、请求 token 这 5 个点能不能各讲 1 分钟。
3. 第 8 节的 10 条口径是否记牢，尤其是“12 秒”和“旧缓存清理时机”。
4. 第 0.7 节里“项目没用到”的技术，是否能做到不硬编。
5. 准备一个“最难的 bug”和一个“如果重做”的答案，避免临场想。

## 13. 演示脚本（如果面试官让你打开项目）

1. 文件库：搜索、按名称/大小排序、分类筛选。
2. 预览 TXT（展示文本）→ 预览 DOCX（展示排版）→ 预览 PDF。
3. 下载一个大文件，展示进度、速度，再点取消。
4. 管理台：打开仓库设置，展示 owner / repo / branch / dir / token 和“测试连接”。
5. 上传一个文件：展示队列进度、同名覆盖确认。
6. 删除文件：展示二次确认。
7. 最后补一句：所有读操作不需要登录，写操作才用令牌。

---

> 这份文档的数字和代码行为基于当前仓库实测；如果之后改了代码，面试前重新跑一遍 `pnpm test:coverage` 和 `pnpm build` 再对口径。
