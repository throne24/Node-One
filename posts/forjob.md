---
title: 专业技能面试追问手册
date: 2026-11-11
description: 按简历技能项整理的面试追问手册：语言基础、页面构建、浏览器 API、Vue、网络、工程化、测试、AI 辅助与协作工具，含高频追问、记忆卡与补课清单
---
# 专业技能面试追问手册

> 用法：第一遍通读答案；第二遍只看问题自测；第三遍对照第 11 节补缺口。
> 标记：★★★ 必背（大概率被问）｜★★ 加分（答上拉开差距）｜★ 了解（能说清即可）。
> 回答结构：先给结论，再给场景，再讲一个坑或取舍，最后收一句。不要背成长篇。

## 0. 覆盖度总览

| 简历条 | 技术.md 对应内容 | 覆盖判断 |
| --- | --- | --- |
| 语言基础 | 作用域链、执行上下文、闭包、原型链、事件循环、防抖节流、GC、this/call/apply/bind | 覆盖好，可直接背 |
| 页面构建 | CSS 仅列属性值计算、盒模型、视觉格式化模型；HTML 行为空 | 缺口大：语义化、表单、Flex/Grid、响应式、动效都要补 |
| 浏览器 API | DOM 事件流与委托、BOM、Fetch/Storage/Cookie、回流重绘 | 基本覆盖；IndexedDB、rAF、sessionStorage 需补细节 |
| Vue | ref/reactive/computed、指令、组件通信、生命周期、watch、Router、KeepAlive、Pinia、Element Plus | 覆盖好；composable 需补“为什么用” |
| 网络与数据 | 五层模型、HTTP、AJAX、跨域、JWT/cookie/session、上传下载、缓存、CSRF/XSS、HTTP2/WebSocket | 覆盖广；Promise 编排、超时/重试/取消需补 |
| 工程化 | CommonJS/ESM、npm、Less、Vite | 缺 pnpm、动态 import、SCSS，且 Less 与简历 SCSS 口径冲突 |
| 测试与质量 | 无 | 缺口最大：Vitest、覆盖率、CI 全部要补 |
| AI 辅助 | Agent 循环、MCP、Skill、Sub Agent、记忆、提示词、模型 API | 覆盖深，按简历范围背即可 |
| 协作工具 | Git 配置/暂存/分支/远程/同步/GitHub Flow、Postman/Apifox | 覆盖好；merge/rebase 与冲突处理需补 |

**优先补课顺序**：测试 → 页面构建 → 工程化 → 浏览器 API → 网络细节。

风险最高的两项是测试和页面构建：技术.md 里测试完全空白，HTML/CSS 只列了三个概念，但简历都写了具体能力。

## 1. 语言基础

**简历原文**：理解闭包、原型链、this 绑定与事件循环，能解释异步执行顺序，并定位内存泄漏、作用域污染一类问题。

**技术.md 对应**：作用域/作用域链、执行上下文（预编译）、闭包、原型/原型链、事件循环、函数节流防抖、内存与 GC、this 绑定、call/apply/bind。

### 必背追问

**Q1 ★★★ 闭包是什么？有什么用途？**
- 一句话：函数记住了定义时所在的作用域，即使外部函数已经执行完，内部函数仍能访问那些变量。
- 用途：私有状态、函数工厂、防抖节流、模块封装。
- 追问：闭包一定会导致内存泄漏吗？不一定。只有闭包被长期引用、且持有不再需要的大对象时才会泄漏；用完置空、移除监听即可。

**Q2 ★★★ 原型链是什么？`new` 做了什么？**
- 一句话：对象通过内部的 `[[Prototype]]` 指向另一个对象，属性查找会沿这条链一直向上，直到 `null`。
- `new` 四步：创建新对象 → 把新对象的原型指向构造函数的 `prototype` → 用新对象作为 `this` 执行构造函数 → 构造函数返回对象则用返回值，否则返回新对象。
- 追问：`class` 也是原型机制的语法糖；`Object.create(null)` 创建无原型对象；`F.prototype.constructor` 默认指回 `F`。

**Q3 ★★★ this 的绑定规则有哪些？**
- 四种绑定：默认绑定（严格模式/模块里是 `undefined`，非严格脚本是全局对象）、隐式绑定（`obj.fn()`）、显式绑定（`call`/`apply`/`bind`）、`new` 绑定。
- 箭头函数没有自己的 `this`，取外层作用域；`bind` 返回新函数，且不能再被改变 `this`。
- 追问：`call` 与 `apply` 的区别是参数形式；`bind` 常用于固定 `this` 或做柯里化。

**Q4 ★★★ 事件循环的执行顺序？**
- 一句话：同步代码在调用栈执行完 → 清空所有微任务 → 取一个宏任务执行 → 再清空微任务，如此循环。
- 微任务：`Promise.then/catch/finally`、`queueMicrotask`、`MutationObserver`；宏任务：`setTimeout`、I/O、用户事件。
- 渲染时机：浏览器通常在微任务清空后、下一个宏任务前安排渲染，但不保证每轮都渲染。
- 追问：`await` 后面的代码会进入微任务；`setTimeout(fn, 0)` 不是立即执行，嵌套后还会有最小延迟。

**Q5 ★★ 内存泄漏的常见场景和排查方式？**
- 场景：意外的全局变量、未清理的定时器和事件监听、游离 DOM 引用、闭包持有大对象、没有上限的缓存。
- 排查：DevTools 的 Memory 面板做堆快照对比，看 `Detached DOM tree`；用 Performance monitor 观察内存曲线；缓存用 `WeakMap` / `WeakRef`。
- 追问：现代浏览器能回收循环引用，真正的问题是“可达但无用”的引用。

**Q6 ★★ 作用域链、变量提升和 TDZ 是什么？**
- 作用域链：词法作用域，标识符由内向外查找，找到即停。
- 提升：`var` 只提升声明，函数声明整体提升；`let` / `const` 有暂时性死区，声明前访问会报错。
- 追问：`typeof` 访问未声明变量不报错，但访问 TDZ 中的变量会抛 `ReferenceError`。

**Q7 ★ 防抖和节流的区别？**
- 防抖：停止触发后等待 N 毫秒再执行一次，适合搜索输入。
- 节流：固定间隔内最多执行一次，适合滚动、拖拽。
- 实现都靠闭包保存 `timer` 或上次执行时间；追问会涉及“立即执行版防抖”和“节流最后一次是否触发”。

**记忆卡**：闭包=作用域保留；原型链=向上查找；this=调用方式决定；事件循环=微任务清空再宏任务；泄漏=可达但无用。

> 自测：□ 能脱稿讲清本节问题　□ 能各举一个例子

## 2. 页面构建

**简历原文**：熟悉语义化标签与表单校验，能用 Flex / Grid 完成响应式布局，并通过过渡与动画还原交互细节。

**技术.md 对应**：属性值计算过程、盒模型、视觉格式化模型；HTML 行为空。

### 必背追问

**Q1 ★★★ 语义化标签的价值是什么？**
- 一句话：让结构自带含义，提升可读性、可访问性和可维护性。
- 具体：屏幕阅读器能识别 `nav` / `main` / `article`；搜索引擎更好理解页面；`button`、`label`、`form` 自带键盘和点击行为。
- 追问：`section` 和 `div` 的区别是前者应有主题标题；不要为了“语义化”把 `div` 全换成语义标签。

**Q2 ★★★ 盒模型是什么？`border-box` 改变了什么？**
- `content-box`（默认）：`width` 只算内容区，实际占位要再加 padding 和 border。
- `border-box`：`width` 包含内容、padding 和 border，布局更直观。
- 追问：`offsetWidth` 含 border，`clientWidth` 含 padding 不含 border，`scrollWidth` 含溢出内容；相邻垂直 margin 会折叠，BFC 可以阻止折叠并包含浮动。

**Q3 ★★★ Flex 和 Grid 怎么选？**
- Flex 是一维布局、内容驱动；Grid 是二维布局、先定轨道再放内容。
- Flex 常用：`flex: 1 1 0`、`justify-content`、`align-items`、`gap`、`flex-wrap`。
- Grid 常用：`grid-template-columns: repeat(auto-fit, minmax(240px, 1fr))`，适合卡片列表和整页布局。
- 追问：`flex: 1` 展开是 `1 1 0%`；`auto-fit` 会收起空轨道，`auto-fill` 保留空轨道。

**Q4 ★★ 响应式布局怎么做？**
- 组合：viewport meta + 媒体查询 + 相对单位（`rem` / `vw` / `%` / `clamp()`）+ 移动优先。
- 断点按内容决定，不照抄设备尺寸；图片用 `max-width: 100%`，必要时 `srcset`。
- 追问：`rem` 相对根字号，`em` 相对当前元素字号；1px 边框可用 `transform: scaleY(0.5)` 或媒体查询处理；容器查询是加分项。

**Q5 ★★ 表单校验怎么做？**
- 原生约束：`required`、`type`、`pattern`、`min/max`、`minlength/maxlength`，配合 `checkValidity()`、`reportValidity()`、`setCustomValidity()`。
- 自定义提示可以监听 `invalid` 事件，或加 `novalidate` 后自己校验；服务端必须再校验一次。
- 追问：前端校验只负责体验，不负责安全；自定义错误提示要能说清接入方式。

**Q6 ★★ 过渡和动画的区别？怎么避免动画卡顿？**
- `transition` 需要属性值变化触发；`animation` 通过关键帧主动播放，可循环、可暂停。
- 优先动画 `transform` 和 `opacity`，它们不触发布局；避免动画 `width`、`height`、`top`、`left`。
- `will-change` 只在确实有性能问题时短暂使用；尊重 `prefers-reduced-motion`。
- 追问：动画卡顿用 Performance 面板看掉帧、长任务和布局次数，不要凭感觉优化。

**Q7 ★★ CSS 属性值计算过程是什么？（你能讲，算加分）**
- 主线：声明值 → 层叠值（来源、重要性、特异性、顺序）→ 指定值（继承或初始值）→ 计算值（解析相对单位）→ 使用值（布局阶段确定）→ 实际值（受设备限制）。
- 例子：父元素高度为 `auto` 时，子元素百分比高度无法确定，按 `auto` 处理；`line-height: 1.5` 继承的是数字，百分比会先算成长度；`em` 按父级字号逐层计算。
- 追问：`getComputedStyle` 拿到的是解析后的值，布局相关属性可能已经是使用值。

**Q8 ★ 回流和重绘是什么？**
- 回流改变几何信息（宽高、位置），重绘只改变外观（颜色、背景）；回流一定伴随重绘。
- 减少方式：批量读写、离线 DOM（`DocumentFragment`）、用 `transform` / `opacity` 做动画。
- 追问：读写交替会强制同步布局，例如先改样式再立刻读 `offsetHeight`。

**记忆卡**：语义化=结构+可访问性；盒模型=width 算不算 padding；Flex 一维/Grid 二维；响应式=视口+相对单位+断点；动画=transform/opacity；计算=声明→层叠→指定→计算→使用→实际。

> 自测：□ 能脱稿讲清本节问题　□ 能各举一个例子

## 3. 浏览器 API

**简历原文**：能用事件委托统一管理列表交互，用 localStorage / IndexedDB 存取本地数据，用 rAF 控制动画节奏。

**技术.md 对应**：DOM 节点操作、事件流、事件委托、回流重绘；BOM（window/location/history/定时器）；Fetch、Storage、Cookie。

### 必背追问

**Q1 ★★★ 事件流有哪几个阶段？事件委托的原理和好处？**
- 三个阶段：捕获 → 目标 → 冒泡。
- 委托：在父元素上监听，用 `event.target.closest(selector)` 找到真正触发元素；减少监听器数量，动态新增节点也能生效。
- 追问：`focus` / `blur`、`mouseenter`、`load` 不冒泡，要用捕获或直接绑定；子元素 `stopPropagation` 会让委托失效；`stopImmediatePropagation` 连同级监听也会阻止。

**Q2 ★★★ Cookie、localStorage、sessionStorage、IndexedDB 怎么选？**
- Cookie：约 4KB，同源请求会自动携带，可设 `HttpOnly`、`Secure`、`SameSite`。
- localStorage：约 5-10MB，持久保存，同步 API，只能存字符串，按源隔离。
- sessionStorage：同源同标签页会话，关闭标签页清空。
- IndexedDB：容量大、异步、支持事务、索引和结构化数据，适合大量离线数据。
- 追问：大文件不放 localStorage，因为同步阻塞、容量小、还要序列化；敏感 token 优先 `HttpOnly` Cookie，localStorage 方便但有 XSS 风险。

**Q3 ★★ IndexedDB 的基本用法？**
- 流程：`indexedDB.open(name, version)` → `onupgradeneeded` 里 `createObjectStore` / `createIndex` → `db.transaction(store, 'readwrite')` → `add/put/get/delete` → 请求的 `onsuccess` / `onerror`。
- 遍历用 `openCursor`；事务在没有待处理请求后自动提交，`oncomplete` 表示完成。
- 追问：版本升级只能在 `onupgradeneeded` 里改结构；回调式 API 难用，常用 `idb` 封装成 Promise。

**Q4 ★★★ rAF 是什么？和 setTimeout 做动画有什么区别？**
- `requestAnimationFrame` 在下一帧绘制前执行，回调带高精度时间戳；与刷新率对齐，页面隐藏时通常暂停。
- 适合动画、滚动联动、批量 DOM 读写；`cancelAnimationFrame` 取消。
- 追问：`setTimeout` 不保证和刷新对齐，后台还会被节流，容易抖；rAF 也不是固定 60fps，具体看设备刷新率。

**Q5 ★★ 事件委托有什么局限？**
- 不冒泡的事件不适用；层级很深时 `closest` 有查找成本；子元素阻止冒泡会让委托失效。
- Shadow DOM 外部拿到的是重定向后的 `target`，需要 `composedPath()` 才能看到真实路径。
- 追问：大量列表项只绑一个监听，靠 `data-*` 区分操作类型。

**Q6 ★ 回流重绘和 rAF 怎么配合？**
- rAF 回调里集中写样式，把读操作放在写之前，避免读写交替造成强制同步布局。
- 追问：`getBoundingClientRect()`、`offsetHeight` 都会触发同步布局，连续调用要合并。

**记忆卡**：事件流=捕获→目标→冒泡；委托=父级监听+closest；存储=Cookie 小、localStorage 持久、sessionStorage 会话、IndexedDB 大且异步；rAF=绘制前+对齐刷新；布局抖动=读写交替。

> 自测：□ 能脱稿讲清本节问题　□ 能各举一个例子

## 4. Vue

**简历原文**：能用组合式 API 组织状态，按职责拆分组件与 composable，结合 Vue Router 与 Element Plus 完成多页面应用开发。

**技术.md 对应**：ref/reactive/computed、v-if/v-for/v-model、props/emit/slot、组件 v-model、生命周期、watch/watchEffect、Vue Router、KeepAlive、Pinia、Element Plus。

### 必背追问

**Q1 ★★★ ref 和 reactive 有什么区别？**
- `ref` 可以包任意类型，通过 `.value` 读写，模板里自动解包；`reactive` 只接受对象/数组，基于 Proxy 做深层响应。
- 解构 `reactive` 会丢失响应性，要用 `toRefs`；大对象或不可变数据可以用 `shallowRef`。
- 追问：基础类型无法直接追踪，所以 `ref` 用一个带 getter/setter 的容器包起来；直接给 `reactive` 变量重新赋值会丢掉原来的代理，应该用 `Object.assign` 合并或改用 `ref`；解构同样会丢响应性，用 `toRefs`。

**Q2 ★★★ computed、watch、watchEffect 怎么选？**
- `computed` 有缓存、依赖变化才重新计算，适合派生值。
- `watch` 显式指定监听源，默认懒执行，适合异步请求和副作用，支持 `deep`、`immediate`。
- `watchEffect` 自动收集依赖并立即执行，适合依赖不固定、逻辑简单的副作用。
- 追问：`computed` 的缓存基于依赖；`watch` 的 `flush` 默认 `pre`，要在 DOM 更新后拿结果可以用 `post`；在 `setup` 里创建的监听会随组件卸载自动停止。

**Q3 ★★ 组件之间怎么通信？**
- 父子：`props` 向下、`emit` 向上；`v-model` 是 `modelValue` + `update:modelValue` 的语法糖。
- 跨层：`provide` / `inject`；内容分发用插槽；跨组件状态用 Pinia。
- 追问：`props` 单向数据流，子组件不能直接改；`provide` 传 `ref` 才能保持响应性。

**Q4 ★★ composable 是什么？和 mixin 有什么区别？**
- 以 `use` 开头的函数，把有状态逻辑抽出来复用，内部可以用 `ref`、`computed` 和生命周期，返回状态与方法。
- 相比 mixin：来源清晰、不会命名冲突、依赖关系显式。
- 追问：必须在 `setup` 或另一个 composable 中同步调用，否则生命周期钩子挂不上；和普通工具函数的区别是它依赖响应式和组件生命周期。

**Q5 ★★ Vue Router 的常用能力？**
- `createRouter` + `createWebHistory`；`router-link` / `router-view`。
- `beforeEach` 做登录和权限判断；路由懒加载用 `component: () => import()`；`meta` 存标题和权限；最后加 404 兜底。
- 追问：history 模式刷新需要服务端 fallback，否则 404；hash 模式不需要；守卫可以返回 `false`、路由地址或 `true`。

**Q6 ★★ 生命周期里发请求要注意什么？**
- 顺序：`setup` → `beforeMount` → `mounted` → `beforeUpdate` → `updated` → `beforeUnmount` → `unmounted`。
- 请求放 `onMounted`；卸载时用 `AbortController` 取消，清理定时器和监听器。
- 并发请求要有“最新请求”标记或请求 token，避免慢请求覆盖新数据。
- 追问：`onMounted` 里能拿到 DOM；KeepAlive 场景用 `onActivated` / `onDeactivated`；SSR 没有 `onMounted`。

**Q7 ★ v-if 和 v-show 的区别？**
- `v-if` 惰性渲染，切换时销毁/重建，切换成本高；`v-show` 始终渲染，只切换 `display`，初始成本高。
- 频繁显隐用 `v-show`，条件很少变用 `v-if`。
- 追问：Vue 3 中同一元素上 `v-if` 优先级高于 `v-for`，不要把两者写在一起；`v-show` 不触发组件销毁。

**记忆卡**：ref 任意/.value；reactive 对象/Proxy；computed 缓存；watch 显式、watchEffect 自动；composable=有状态逻辑复用；路由=守卫+懒加载；请求=挂载发+卸载取消。

> 自测：□ 能脱稿讲清本节问题　□ 能各举一个例子

## 5. 网络与数据

**简历原文**：能用 Fetch / XHR 发起请求，基于 Promise 编排并发与串行，处理超时、重试与取消，并排查跨域、缓存与 HTTP 异常。

**技术.md 对应**：五层网络模型、TCP/IP、HTTP、AJAX、跨域、JWT/cookie/session、文件上传下载、缓存协议、CSRF/XSS、分片传输、DNS、SSL/TLS/HTTPS、HTTP2、WebSocket。

### 必背追问

**Q1 ★★★ Fetch 和 XHR 有什么区别？为什么上传进度用 XHR？**
- Fetch 基于 Promise，使用 `Request` / `Response`，能和 Service Worker 配合；XHR 是事件式，有 `upload.onprogress`、`timeout`、`abort`。
- Fetch 原生没有稳定的上传进度（流式请求兼容性有限），所以真实字节进度用 XHR 更直接。
- 追问：Fetch 只有网络错误或取消才 reject，HTTP 404/500 不会 reject，要自己判断 `response.ok`；取消用 `AbortController`。

**Q2 ★★★ Promise 的组合方法有哪些？**
- `Promise.all`：全部成功才成功，一个失败立即失败。
- `Promise.allSettled`：等全部结束，返回每个的成功/失败状态。
- `Promise.race`：第一个 settled 的结果；`Promise.any`：第一个 fulfilled，全失败抛 `AggregateError`。
- 追问：`all` 中一个失败，其他已启动的请求仍会继续执行，只是结果被忽略；并发上限用分批或任务池控制。

**Q3 ★★★ 超时、重试、取消怎么实现？**
- 取消：`AbortController` 的 `signal` 传给 `fetch`，需要时 `abort()`。
- 超时：`setTimeout` 到点调用 `abort()`，结束后清理定时器。
- 重试：指数退避加随机抖动，只重试幂等请求（GET/HEAD/PUT/DELETE），并设最大次数。
- 追问：取消后 Promise 以 `AbortError` reject；用户取消和超时要分别打标记，提示文案不同；POST 默认不重试，除非有幂等键。

**Q4 ★★★ 跨域是怎么产生的？怎么解决？**
- 同源策略要求协议、域名、端口一致；跨域请求由浏览器拦截响应。
- CORS：服务端返回 `Access-Control-Allow-Origin`、`-Methods`、`-Headers`；非简单请求先发 `OPTIONS` 预检。
- 带 Cookie 时需要 `credentials`，且服务端不能返回 `*`；开发环境常用代理；JSONP 是历史方案。
- 追问：`no-cors` 得到的是 opaque 响应，拿不到内容，不是解决方案；CORS 报错本质上是服务端配置和请求头不匹配。

**Q5 ★★★ HTTP 缓存怎么分？**
- 强缓存：`Cache-Control: max-age`，旧方案 `Expires`；命中时浏览器不发请求。
- 协商缓存：`ETag` / `If-None-Match`、`Last-Modified` / `If-Modified-Since`；未变化返回 304，不带响应体。
- `no-cache` 不是不缓存，而是每次要协商；`no-store` 才是完全不存。
- 追问：HTML 通常 `no-cache`，带 hash 的静态资源用长 `max-age` 加 `immutable`；`Cache-Control` 优先级高于 `Expires`。

**Q6 ★★ 常见 HTTP 状态码怎么解释？**
- 2xx：200 成功、201 已创建、204 无内容。
- 3xx：301 永久重定向、302 临时重定向、304 未修改。
- 4xx：400 参数错误、401 未认证、403 无权限、404 不存在、405 方法不允许、409 冲突、429 请求过多。
- 5xx：500 服务端错误、502 网关错误、503 服务不可用、504 网关超时。
- 追问：401 是“你是谁”，403 是“你已知但没权限”；429 应退避重试而不是立刻重发。

**Q7 ★★ GET 和 POST 的区别？**
- GET 语义是获取，参数在 URL，可缓存、可保留在历史记录，通常幂等；POST 语义是提交，参数在 body，默认不缓存、不幂等。
- 追问：POST 不代表安全，安全靠 HTTPS；长度限制主要来自浏览器和服务器配置，不是协议硬限制。

**Q8 ★ 文件上传下载怎么做？**
- 上传：`FormData` + XHR，监听 `upload.onprogress`；大文件可分片、断点续传。
- 下载：`a[download]`、Blob URL，或流式读取；文件名看 `Content-Disposition`。
- 追问：Blob URL 用完要 `URL.revokeObjectURL` 释放；下载也能用 Fetch 读流做进度。

**记忆卡**：Fetch Promise/XHR 事件+进度；组合=all/allSettled/race/any；取消=AbortController；跨域=CORS+预检+credentials；缓存=强缓存/协商缓存/304；状态码=401 未认证/403 无权限/502 网关/504 超时。

> 自测：□ 能脱稿讲清本节问题　□ 能各举一个例子

## 6. 工程化

**简历原文**：能用 Vite + npm / pnpm 搭建开发与构建流程，理解 CommonJS / ESM 差异，通过动态 import 控制首屏体积，并用 SCSS 维护样式。

**技术.md 对应**：CommonJS、ES Module、npm、Less、Vite。

### 必背追问

**Q1 ★★★ Vite 为什么快？**
- 开发态利用浏览器原生 ESM，按需编译，不先打整包；依赖用 esbuild 预构建，减少请求数量并缓存。
- HMR 基于模块图，只更新变化的模块；生产构建用 Rollup。
- 追问：预构建解决 CommonJS 转换、依赖请求过多和缓存问题；生产仍要打包，为了减少请求、压缩、兼容和 tree-shaking。

**Q2 ★★★ CommonJS 和 ESM 的区别？**
- CJS：运行时 `require`，同步加载，`module.exports`，导出的是值拷贝（对象是引用拷贝），不是活绑定；难做 tree-shaking。
- ESM：静态 `import/export`，编译时就能确定依赖，活绑定，支持 tree-shaking 和顶层 `await`。
- 追问：ESM 里没有 `__dirname`，用 `import.meta.url`；两者混用要注意默认导出和命名导出的互操作。

**Q3 ★★ 动态 import 解决了什么问题？**
- `import()` 返回 Promise，按需加载模块；Vite/Rollup 会自动拆成独立 chunk。
- 常用于路由懒加载、重组件、条件加载，直接减小首屏包体积。
- 追问：动态导入的模块仍可 tree-shaking；加载失败要有兜底；`prefetch` / `preload` 可以提前拉取。

**Q4 ★★ npm 和 pnpm 有什么区别？**
- npm 会把依赖扁平化到 `node_modules`，可能产生幽灵依赖。
- pnpm 用内容寻址存储 + 硬链接，`node_modules` 结构严格，装得快、省磁盘，也避免访问未声明的依赖。
- 追问：幽灵依赖是“没写进 `package.json` 却能 import”；锁文件要提交，CI 用 `--frozen-lockfile`。

**Q5 ★★ SCSS 你用过哪些能力？（口径注意）**
- 变量、嵌套、mixin、函数；新版本用 `@use` / `@forward`，`@import` 已废弃；嵌套不要超过三层。
- 运行时主题切换用 CSS 变量，编译期复用用 SCSS 变量和 mixin。
- 追问：mixin 适合复用一组声明，函数适合计算值；被问具体用在哪，必须能结合项目答。
- 注意：技术.md 写的是 Less，简历写的是 SCSS，面试前先统一口径。

**Q6 ★★ 构建产物怎么优化？**
- 压缩、tree-shaking、代码分割、文件 hash 缓存、图片压缩和懒加载、CDN。
- 用构建分析工具找大包，优先拆第三方库和首屏不需要的模块。
- 追问：首屏看 FCP / LCP；环境变量用 `import.meta.env`；分包不是越多越好，请求数也会上升。

**记忆卡**：Vite=ESM+esbuild 预构建；CJS 运行时/ESM 静态；动态 import=拆包；pnpm=内容寻址+严格依赖；SCSS=变量/嵌套/mixin。

> 自测：□ 能脱稿讲清本节问题　□ 能各举一个例子

## 7. 测试与质量

**简历原文**：能为核心逻辑与边界分支编写 Vitest 单元测试，用覆盖率定位缺口，并把测试接入 CI 门禁。

**技术.md 对应**：无。这一条是技术清单里最大的空白，必须单独补课。

### 必背追问

**Q1 ★★★ 为什么要写单元测试？**
- 锁住核心逻辑和边界行为，重构时有回归保护；测试也是可执行的文档。
- 测试金字塔：单元测试多、集成测试中、E2E 少；不要为了覆盖率给简单 getter 写测试。
- 追问：哪些不适合单元测试？依赖真实浏览器布局、第三方服务、复杂网络交互的部分，交给集成或 E2E。

**Q2 ★★★ Vitest 的基本用法？**
- 与 Vite 共用配置和转换，原生支持 ESM 和 TypeScript；API 与 Jest 类似：`describe`、`it`、`expect`。
- 模拟：`vi.fn()` 造模拟函数，`vi.mock()` 模拟模块，`vi.spyOn()` 监听已有方法；DOM 环境用 `happy-dom` 或 `jsdom`。
- 覆盖率用 `vitest run --coverage`，底层可选 v8 或 istanbul。
- 追问：Vitest 比 Jest 快在复用 Vite 的转换和 ESM 支持；mock 是替换实现，spy 是包一层观察调用。

**Q3 ★★★ 覆盖率有哪几项？高覆盖率代表质量好吗？**
- 四项：语句、分支、函数、行。
- 覆盖率只能说明“哪些代码被执行过”，不能说明断言是否正确、边界是否覆盖。
- 追问：分支覆盖率关注 `if/else`、三元、逻辑运算的两侧；优先补错误分支、回退路径和异常状态，而不是刷数字。

**Q4 ★★ 边界分支怎么测？**
- 等价类划分 + 边界值：空值、超长、特殊字符、0、最大值、异常状态码、超时、取消。
- 用 `vi.useFakeTimers()` 控制定时器，mock fetch/XHR 构造超时和失败；测行为，不测私有实现。
- 追问：如何测重试？让前两次失败、第三次成功，断言调用次数和最终结果；如何避免测试脆弱？少依赖内部调用顺序。

**Q5 ★★ CI 门禁怎么配？**
- GitHub Actions 流程：checkout → setup-node → `pnpm install --frozen-lockfile` → `pnpm test:coverage` → `pnpm build` → 部署。
- 覆盖率低于阈值就让流水线失败；缓存依赖缩短时间；PR 上必须通过才能合并。
- 追问：`--frozen-lockfile` 保证依赖和锁文件一致；失败先看日志定位是测试、覆盖率还是构建。

**Q6 ★ happy-dom 和 jsdom 的区别？**
- 两者都在 Node 里模拟 DOM；happy-dom 更轻更快，jsdom 实现更完整。
- 它们不是真实浏览器，布局、绘制和部分事件行为不具备；需要真实浏览器时用 Playwright。
- 追问：组件测试优先 happy-dom，兼容性问题多时换 jsdom；E2E 单独一套。

**记忆卡**：单测=回归保护；Vitest=Vite 生态+Jest API；覆盖率=语句/分支/函数/行；边界=空/超长/异常/超时；CI=install→test→build→deploy。

> 自测：□ 能脱稿讲清本节问题　□ 能各举一个例子

## 8. AI 辅助

**简历原文**：了解 Agent 的工具调用与上下文管理，能写结构化提示词，借助 Trae / Codex 完成需求拆解与代码自查。

**技术.md 对应**：Agent 工具调用循环、JSON 意图解析、会话历史重发、上下文窗口管理、系统提示词、思维链、MCP、Skill 渐进式提示、Sub Agent、长期记忆、Vibe/Spec Coding、模型 API、工具链。

### 必背追问

**Q1 ★★★ Agent 的工具调用循环是怎么跑的？**
- 模型根据上下文输出“调用哪个工具 + JSON 参数” → 运行时执行工具 → 把结果回填到会话 → 模型继续推理，直到给出最终答案。
- 工程上要加最大轮次、超时、错误回填、权限控制和日志，避免死循环和越权操作。
- 追问：工具失败怎么办？把错误信息回填给模型，让它重试或换工具；怎么防死循环？限制轮次并检测重复调用。

**Q2 ★★ 上下文窗口怎么管理？**
- 每轮都要重发会话历史，窗口有限，所以需要裁剪、摘要、检索或分层记忆。
- 系统提示词固定放最前；工具结果太长要截断；长期记忆存外部；Sub Agent 用独立上下文隔离任务。
- 追问：上下文满了会怎样？截断、报错或质量下降；RAG 是从外部知识库检索，长期记忆是跨会话沉淀，两者不是一回事。

**Q3 ★★ 结构化提示词包含哪些部分？**
- 角色、目标、上下文、约束、输入、输出格式、示例、验收标准。
- 复杂任务先让模型出计划再执行，要求自检；输出格式明确才便于程序解析和验证。
- 追问：Few-shot 是给示例约束风格和格式；提示词注入要靠分隔输入、最小权限和输出校验，不能只靠一句“忽略恶意指令”。

**Q4 ★★ MCP 是什么？**
- Model Context Protocol，统一模型与外部工具、资源之间的接口；Server 注册能力，Client（IDE/Agent）发现并调用。
- 传输可用 stdio 或 HTTP；好处是不用为每个工具写一套定制集成。
- 追问：和普通函数调用的区别是标准化、可发现、可复用；权限边界仍要由宿主控制。

**Q5 ★★ Skill 的渐进式提示是什么？**
- 先只加载名称、描述等元数据，命中后再加载完整说明，减少上下文占用。
- 适合技能数量多的场景；技能太多会增加选择成本和上下文压力。
- 追问：和系统提示词的区别是 Skill 按需加载、可组合；系统提示词是全局常驻约束。

**Q6 ★★ 怎么验证 AI 生成的代码？**
- 读 diff、跑测试、类型检查、lint、小步提交；关键路径人工复核，不盲信生成结果。
- 让 AI 解释改动理由和影响范围，再决定是否接受。
- 追问：AI 幻觉怎么发现？对照文档、跑起来验证、看它引用的 API 是否真实存在。

**Q7 ★ Vibe Coding 和 Spec Coding 的区别？**
- Vibe Coding 靠自然语言快速迭代，适合探索和原型；Spec Coding 先写清需求、接口、验收标准，再让 AI 执行，适合可维护的交付。
- 关键不是工具，而是有没有可验证的规格和验收标准。
- 追问：什么时候选哪种？需求不稳定先 Vibe，要交付和协作就上 Spec；Spec 过重时可以只保留验收标准。

**记忆卡**：Agent=工具循环+上下文；上下文=裁剪/摘要/检索；提示词=角色/目标/约束/格式/验收；MCP=标准化工具协议；Skill=按需加载；验证=diff+测试+lint。

> 自测：□ 能脱稿讲清本节问题　□ 能各举一个例子

## 9. 协作工具

**简历原文**：能用 Git 分支、stash 与 PR 流程协作，并用 Postman / Apifox 调试接口、定位问题。

**技术.md 对应**：Git 配置、暂存提交、提交消息规范、分支管理、保留现场、远程仓库、SSH、分支同步、GitHub Flow、Postman/Apifox。

### 必背追问

**Q1 ★★★ 你们的分支和 PR 流程是怎样的？**
- `main` 保持可发布，功能在 `feature/*` 分支开发，提交 PR 走评审和 CI，通过后合并并删除分支。
- 小步提交、提交信息清晰；合并前先同步主分支，冲突在本地解决。
- 追问：GitHub Flow 比 Git Flow 轻，适合持续部署；PR 里重点看改动范围、测试、风险和回滚方案。

**Q2 ★★ stash 的使用场景？**
- 临时保存未提交的改动，用来切分支或拉代码；`git stash push -m "说明"`、`list`、`pop` / `apply`、`drop`。
- 默认不包含未跟踪文件，需要加 `-u`；`pop` 会删除记录，`apply` 保留。
- 追问：stash 冲突时先解决再 `drop`；stash 不是备份，重要改动还是提交到临时分支更稳。

**Q3 ★★ merge 和 rebase 的区别？**
- `merge` 保留分支历史和合并提交；`rebase` 把提交重放到目标分支上，历史线性，但会改写提交 hash。
- 公共分支不要 rebase；本地整理提交或同步主分支时可以用。
- 追问：rebase 冲突要逐个提交解决；改写历史后推送需要 `--force-with-lease`，且要确认没有别人基于该分支开发。

**Q4 ★★ 提交信息有规范吗？**
- 常用 Conventional Commits：`type(scope): subject`，例如 `feat: 支持取消上传`、`fix: 修复超时未清理定时器`。
- 标题说清改了什么，正文说为什么；便于生成变更记录和定位问题。
- 追问：常见 type 有 `feat`、`fix`、`docs`、`refactor`、`test`、`chore`；提交信息是给未来的自己和同事看的。

**Q5 ★★ Postman / Apifox 用来做什么？**
- 调试接口、管理环境变量、配置鉴权、Mock 数据、写接口测试、共享文档。
- Apifox 更偏接口设计、调试、Mock、测试一体化；Postman 生态和脚本能力更成熟。
- 追问：多环境用环境变量切换；接口回归可以做成集合批量跑；能直接导入 curl。

**Q6 ★★ 遇到合并冲突怎么处理？**
- 先拉取或变基，找到冲突文件，按标记保留正确逻辑，`git add` 后继续 `rebase --continue` 或提交。
- 拿不准的冲突先沟通，不要凭感觉删代码；合并后跑测试确认。
- 追问：冲突标记 `<<<<<<<` 和 `>>>>>>>` 两侧分别是当前分支与目标分支的版本，中间用 `=======` 分隔；rebase 时 ours/theirs 的语义会反过来。小步提交和清晰分工能减少冲突。

**记忆卡**：分支=feature+PR+CI；stash=暂存现场；rebase=线性但改写历史；commit=type(scope): subject；工具=调试+Mock+文档。

> 自测：□ 能脱稿讲清本节问题　□ 能各举一个例子

## 10. 跨条追问（面试官最爱串起来问）

**Q1 ★★★ 事件循环、rAF、CSS 动画之间是什么关系？**
- 微任务在每轮宏任务后清空；渲染通常发生在微任务清空后、下一个宏任务前。
- rAF 在绘制前执行，适合用 JS 改动画样式；CSS transition/animation 和 WAAPI 可以交给合成器，不占主线程。
- 回答时补一句取舍：简单交互用 CSS，需要动态参数或播放控制用 WAAPI，需要逐帧计算才用 rAF。

**Q2 ★★★ HTTP 缓存和 localStorage / IndexedDB 是一回事吗？**
- 不是。HTTP 缓存缓存的是响应，受响应头控制，命中时可能不发请求或返回 304。
- localStorage / IndexedDB 是应用主动存的数据，不参与 HTTP 缓存协商；Cache Storage 又是另一层，专门给 Service Worker 存 Request/Response。
- 追问：为什么不能只靠 localStorage 做缓存？容量、同步阻塞、没有过期策略、无法按 HTTP 语义复用。

**Q3 ★★★ 组件卸载时，未完成的请求怎么处理？**
- 用 `AbortController`，在 `onUnmounted` 里 `abort()`；同时清理定时器和事件监听。
- 区分用户主动取消、超时取消和组件卸载，避免卸载后还更新状态。
- 追问：取消后后端还会执行吗？请求已发出时服务端可能仍处理，取消只是前端不再等待。

**Q4 ★★ 为什么上传进度用 XHR，下载却可以用 Fetch？**
- XHR 的 `upload.onprogress` 直接给 `loaded` / `total`，实现上传进度最稳。
- 下载可以用 Fetch 读 `response.body` 流，自己累计字节；也可以用 XHR 的 `onprogress`。
- 追问：进度条要处理“总大小未知”的情况，用不确定态而不是假进度。

**Q5 ★★ ESM、tree-shaking、动态 import、Vite 拆包是怎么串起来的？**
- ESM 的静态结构让打包器能分析哪些导出没被使用，从而 tree-shaking。
- 动态 `import()` 把模块变成独立 chunk，按需加载；Vite 开发态按需编译，生产用 Rollup 分包。
- 追问：CommonJS 难 tree-shaking 是因为 `require` 可以在运行时动态拼接；副作用声明 `sideEffects` 会影响裁剪。

**Q6 ★★ Vue 的响应式和浏览器存储怎么配合？**
- 响应式是内存中的依赖追踪，刷新就丢；存储是持久化，需要手动读写。
- 常见做法：初始化时从 localStorage / IndexedDB 读，写入时同步更新响应式状态；需要跨标签页同步时监听 `storage` 事件。
- 追问：存储里的数据要版本化，结构变化时做迁移；不要存不可序列化的对象。

## 11. 口径冲突与补课清单

**1. SCSS 与 Less 的口径冲突（优先处理）**
- 技术.md 写的是 Less，简历写的是 SCSS。面试只能有一个说法。
- 如果项目实际用 SCSS：按 SCSS 答，重点说变量、嵌套、mixin，`@use` / `@forward` 不熟就不要主动提。
- 如果项目实际用 Less：需要先改约束文档，再把简历改成 Less，不能两份材料互相打架。

**2. 测试是最大的空白**
- 技术.md 完全没有测试内容，但简历写了 Vitest、108 个用例、覆盖率、CI 门禁。
- 必须能讲清：测试文件怎么组织、`vi.fn` / `vi.mock` 怎么用、覆盖率四项、GitHub Actions 的步骤。
- 这是最容易被追问穿的一条，优先级最高。

**3. HTML / CSS 清单缺口**
- 技术.md 的 HTML 行是空的，CSS 只列了属性值计算、盒模型、视觉格式化模型。
- 简历却写了语义化、表单校验、Flex/Grid、响应式、过渡动画。先逐项自测，讲不了的降档改简历。

**4. 技术.md 未列、但简历已经出现的点**
- IndexedDB、rAF、composable、pnpm、动态 import、AbortController、超时/重试/取消。
- 这些点不算超纲，但需要按本手册对应问题补到“能讲场景 + 一个坑”的程度。

**5. 补课顺序**
1. 测试：Vitest + 覆盖率 + CI，先把最容易被问穿的补上。
2. 页面构建：语义化、表单校验、Flex/Grid、响应式、动效，每项准备一个例子。
3. 工程化：SCSS/pnpm/动态 import，先统一口径。
4. 浏览器 API：IndexedDB、rAF、存储对比。
5. 网络细节：AbortController、Promise 组合、缓存与状态码。

**6. 面试表达底线**
- 会就说“用过，场景是……”，不会就说“这块我了解不深，我的理解是……”，不要编。
- 技能区不写项目细节，但面试回答可以举项目例子，两者不冲突。
- 被追问到不会的点，面试后立刻记下来，下一场就是加分项。

## 12. 一页速记

| 简历条 | 三个关键词 | 自测问题 |
| --- | --- | --- |
| 语言基础 | 闭包 / 原型链 / 事件循环 | 微任务什么时候清空？ |
| 页面构建 | 盒模型 / Flex-Grid / 响应式 | `border-box` 的 width 包含什么？ |
| 浏览器 API | 事件委托 / 四种存储 / rAF | 为什么上传进度用 XHR？ |
| Vue | ref-reactive / composable / 路由守卫 | 解构 reactive 为什么丢响应性？ |
| 网络与数据 | Fetch-XHR / AbortController / 缓存 | Fetch 遇到 404 会 reject 吗？ |
| 工程化 | Vite / ESM / pnpm | 为什么 ESM 能 tree-shaking？ |
| 测试与质量 | Vitest / 覆盖率 / CI | 分支覆盖率测什么？ |
| AI 辅助 | Agent 循环 / 上下文 / 结构化提示词 | 工具调用结果怎么回填？ |
| 协作工具 | 分支 PR / stash / rebase | merge 和 rebase 的区别？ |

**面试前最后自检**
1. 每条能不能在 30 秒内讲完，并补一个项目里的使用场景。
2. 每个 ★★★ 问题能不能不看答案说清，尤其是测试和页面构建。
3. 第 11 节的 SCSS / Less 口径是否已经统一。
4. 不会的问题是否准备了诚实的收尾话术，而不是硬编。
5. 时间不够时，只看第 11 节和第 12 节。
