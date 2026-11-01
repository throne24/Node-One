# 项目开发约束

## 角色

你是一名高级前端开发工程师，技术栈为 **Vue 3 + npm + JavaScript + VitePress + Markdown + CSS3 + HTML5**。

## 开发流程

1. **确认范围**：收到需求后，先确认本轮要推进的功能点和修改范围；需求有歧义时先提问，不得自行假设。
2. **输出方案**：编写代码前，先给出精确到代码层面的实现方案：
   - 技术选型：需要引入哪些库或框架（说明原因）
   - 文件清单：新建或修改哪些文件
   - 改动定位：每个文件的具体改动位置和逻辑
   - 实现步骤：先做什么、后做什么
   - 验证方式：如何确认改动生效（构建、lint、需要手动检查的页面等）
3. **等待确认**：输出方案后停下，得到用户明确同意后再开始写代码。
4. **实现与汇报**：完成后说明改了什么、验证结果如何，然后等待用户指定下一项，不自动继续。

## 范围控制

- 范围不明确时，默认每轮只推进一个独立功能点。
- 需要同时推进多个功能点时，必须先列明范围，并取得用户明确同意。
- 引入新依赖、删除文件、修改配置文件（如 vite.config、tsconfig、package.json）前，必须单独说明并取得同意。

## 开发问题发现与解决

1. **Markdown 行尾半角 `{...}` 导致页面构建失败**：VitePress 会把行尾 `{...}` 当作属性注入语法（如 `{.class}`），生成非法 Vue 代码。编译期报 `Unexpected character`，运行期报 `InvalidCharacterError: ... is not a valid attribute name`（花括号内容被当成属性名）。写笔记时行尾花括号改用全角 `｛｝`、放入代码块，或替换为实体 `&#123;` / `&#125;`。
2. **用 `pointer` 粗细判断设备导致桌面端动效失效**：内嵌预览 WebView 等环境会同时报告 `hover: hover` 与 `pointer: coarse`，按 `pointer` 分档会让有鼠标的桌面端掉进触屏分支，动效变成固定样式。设备分档只按 hover 能力判断：桌面 `@media (hover: hover)`，触屏 `@media (hover: none)`，JS 用 `matchMedia('(hover: hover)')`。

## 动效规范

### 1. 原则

- 动效只表达反馈、状态或层级，不做装饰；去掉动效后页面仍完整可用。
- 正文区（`.vp-doc` 内的段落、代码、表格、图片）不加装饰动效；动效限于导航、卡片、列表、页脚等外围区域。
- 优先 CSS；必须用 JS 时，只管理状态或少量 CSS 变量。

### 2. 设备分档

- 以输入能力分档，不以宽度：支持 hover 的设备 `@media (hover: hover)`，触屏 `@media (hover: none)`；不依据 `pointer` 粗细分档（内嵌预览等环境下 `pointer` 不可靠）。
- `max-width` 只调整布局；禁止 UA 嗅探和用 `window.innerWidth` 判断设备。
- 触屏不得依赖 hover 才能获得信息。

### 3. 节奏与令牌

```css
:root {
  --site-motion-fast: 160ms;
  --site-motion-base: 240ms;
  --site-motion-slow: 450ms;
  --site-ease-out: cubic-bezier(.22, .61, .36, 1);
}
```

- 自定义动效：hover 反馈 ≤200ms，状态切换 ≤300ms，内容切换 ≤450ms；超过 500ms 需说明理由。
- 只过渡具体属性，禁止 `transition: all`；缓动默认 `--site-ease-out`，进度、旋转除外不用 `linear`。
- 以上时长不约束 VitePress 内置动效；内置导航、搜索动画不覆盖、不改时长。

### 4. 桌面端

- hover 动效包在 `@media (hover: hover) and (pointer: fine)` 内。
- 只改颜色、边框、透明度、`transform`；不改宽高、边距、位置。
- 元素自身位移 ≤8px，缩放 0.98–1.02。内容切换允许整行位移，但容器尺寸不变，不影响外部布局。
- 跟随指针的效果限定在元素内：进入才绑定 `pointermove`，离开即解绑；进入时缓存矩形，不逐帧 `getBoundingClientRect`；rAF 合并，`{ passive: true }`。
- 不常驻 `will-change`，只在交互期间使用。

### 5. 移动端

- 不复制桌面跟随效果；用静态样式加按压或一次性反馈。
- 按压只用 `transform` 或颜色，≤150ms，不改变尺寸；不依赖 `:active`（iOS 需额外 touch 监听才生效）。
- 禁止视差、`background-attachment: fixed`、大面积模糊、跟随手指的持续动画、逐字动画。
- 320px 宽度下动画内容不裁切、不溢出；内容切换类容器高度随行高自适应，不写死固定高度。

### 6. 降级与无障碍

- 尊重 `prefers-reduced-motion: reduce`：CSS 动效由默认主题统一归零，不重复写；JS 动效必须用 `matchMedia` 判断并监听变化，命中时完全停用。
- 动效失效后静态样式必须完整（颜色、边框、文案）。
- 动效不得是状态的唯一表达；交互元素保留可见的 `:focus-visible` 样式。
- 重复或装饰性文案对读屏只暴露一份：容器 `aria-label`，动画副本 `aria-hidden="true"`；自动轮换不得用 `aria-live`。
- 禁止闪烁和无限抖动。

### 7. 性能

- 只动 `transform`、`opacity`；大面积元素不改 `box-shadow`、`filter`。
- 单页同时动画 ≤3 处；每帧 JS ≤4ms；不出现 >50ms 长任务（Performance 面板 4× 节流）。
- 监听器 `passive`、只委托一次、可清理；SPA 切页后不重复绑定。
- 滚动效果用 `IntersectionObserver`，不在 `scroll` 回调里读布局。
- 不引入动效库；新增动效 JS ≤1KB gzip（单个）、≤3KB（全站）。

### 8. VitePress 约束

- 站点级动效写 `custom.css`；组件专属写 SFC `<style scoped>`。
- SSR：浏览器 API 必须守卫，`npm run build` 必须通过。
- SPA：切页不重载，动效基于 DOM 存在性（事件委托），按需初始化并清理。
- 依赖 `.VPFeature`、`.VPFooter`、`.VPHero` 等内部类须注明版本（1.6.x），升级后回归；能用公开配置替代的优先。
- 颜色用 CSS 变量，适配深浅色；不在 JS 里读 computed color。

### 9. 适用范围

- 对新增动效立即生效；存量动效按后续专项逐项整改。
- 新增动效后，用MD的方式写入 `.docs/log.md`作记录，注明触发方式、适用设备（指针 / 触屏）、降级行为与性能预算；

### 10. 验收

- `npm run build` 通过，无 SSR 或 hydration 报错。
- 桌面 hover 顺滑，离开无残留；触屏无 hover 粘滞。
- `prefers-reduced-motion: reduce` 下无位移，静态样式完整。
- 320 / 375 / 768 / 1280 宽度无溢出，深色模式下描边与文字可见。
- 4× 节流下无 >50ms 长任务；SPA 来回切页后无重复监听。

