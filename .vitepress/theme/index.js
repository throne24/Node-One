import DefaultTheme from 'vitepress/theme'
import './custom.css'
import PostList from './components/PostList.vue'

/**
 * 把鼠标在卡片内的坐标写入 --mx / --my，
 * 高亮描边与光晕由 custom.css 负责绘制
 */
function bindFeatureSpotlight() {
  if (typeof window === 'undefined') return

  let frame = 0

  window.addEventListener(
    'pointermove',
    (event) => {
      const card = event.target.closest?.('.VPFeature')
      if (!card) return

      // 同一帧内只取最后一次位置，避免频繁触发布局计算
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect()
        card.style.setProperty('--mx', `${event.clientX - rect.left}px`)
        card.style.setProperty('--my', `${event.clientY - rect.top}px`)
      })
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
  }
}
