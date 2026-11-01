import DefaultTheme from 'vitepress/theme'
import './custom.css'
import PostList from './components/PostList.vue'

/**
 * 把指针在卡片内的坐标写入 --mx / --my，
 * 高亮描边与光晕由 custom.css 负责绘制。
 *
 * 只在指针设备启用：进入卡片才绑定 pointermove，离开即解绑；
 * 矩形在进入时缓存一次，滚动或缩放后失效再重取，移动过程中不读布局。
 */
function bindFeatureSpotlight() {
  if (typeof window === 'undefined') return

  // 只要设备支持 hover 就有指针跟随；pointer 粗细在内嵌预览等环境不可靠
  const canHover = matchMedia('(hover: hover)')
  if (!canHover.matches) return

  let card = null
  let rect = null
  let frame = 0

  const update = (event) => {
    const x = event.clientX
    const y = event.clientY
    cancelAnimationFrame(frame)
    frame = requestAnimationFrame(() => {
      if (!card) return
      // 矩形失效后（滚动或缩放）重取一次，移动过程中不反复读布局
      if (!rect) rect = card.getBoundingClientRect()
      card.style.setProperty('--mx', `${x - rect.left}px`)
      card.style.setProperty('--my', `${y - rect.top}px`)
    })
  }

  const enter = (event) => {
    const next = event.target.closest?.('.VPFeature')
    if (!next || next === card) return
    leave()
    card = next
    rect = card.getBoundingClientRect()
    card.addEventListener('pointermove', update, { passive: true })
    card.addEventListener('pointerleave', leave, { passive: true })
  }

  const leave = () => {
    if (!card) return
    card.removeEventListener('pointermove', update)
    card.removeEventListener('pointerleave', leave)
    card = null
    rect = null
    cancelAnimationFrame(frame)
  }

  // 页面滚动或窗口缩放后，缓存的矩形不再准确，下次移动时重取
  const invalidate = () => {
    rect = null
  }

  document.addEventListener('pointerover', enter, { passive: true })
  window.addEventListener('scroll', invalidate, { passive: true })
  window.addEventListener('resize', invalidate, { passive: true })
}

/**
 * 触屏端页脚文案：轻触在两句之间切换，状态写入 data-flip，由 CSS 负责动画
 */
function bindFooterFlip() {
  if (typeof window === 'undefined') return
  if (window.__footerFlipBound) return
  window.__footerFlipBound = true

  const touch = matchMedia('(hover: none), (pointer: coarse)')
  const reduce = matchMedia('(prefers-reduced-motion: reduce)')

  document.addEventListener(
    'click',
    (event) => {
      if (!touch.matches || reduce.matches) return
      const flip = event.target.closest?.('.flip')
      if (!flip) return
      flip.dataset.flip = flip.dataset.flip === 'b' ? 'a' : 'b'
    },
    { passive: true }
  )
}

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册成全局组件，这样在任意 Markdown 里都能直接写 <PostList />
    app.component('PostList', PostList)
    bindFeatureSpotlight()
    bindFooterFlip()
  }
}
