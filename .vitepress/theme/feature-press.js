/**
 * 触屏首页卡片：按住某一边，整张卡朝那一边倒下去；松手回弹到原位。
 *
 * 设计取舍：
 * - 只接管触屏（(hover: none)），桌面端仍走 index.js 里的光斑跟随，互不干扰；
 * - 按压点换算成 rotateX / rotateY 两个角度写进 CSS 变量，动画本身交给 CSS；
 * - 只跟一根手指，松手 / 取消 / 滚动 / 降级 时立刻释放，不留残余状态。
 */

const MAX_TILT = 10 // 按到边缘时的最大倾角（度）
const PRESS_SCALE = 0.985 // 按住时整体轻微下沉
const BOUND_FLAG = '__featurePressBound'

export function bindFeaturePress() {
  if (typeof window === 'undefined') return
  if (window[BOUND_FLAG]) return
  window[BOUND_FLAG] = true

  const touch = matchMedia('(hover: none)')
  const reduce = matchMedia('(prefers-reduced-motion: reduce)')

  let card = null
  let rect = null
  let pointerId = null
  let frame = 0

  const release = () => {
    cancelAnimationFrame(frame)
    frame = 0
    if (card) {
      card.style.removeProperty('--press-rx')
      card.style.removeProperty('--press-ry')
      card.style.removeProperty('--press-scale')
      delete card.dataset.press
    }
    card = null
    rect = null
    pointerId = null
    window.removeEventListener('pointermove', onMove)
    window.removeEventListener('pointerup', release)
    window.removeEventListener('pointercancel', release)
    document.removeEventListener('scroll', release, true)
  }

  // 以卡片中心为原点归一化到 -0.5 … 0.5，压到边角即取到极值
  const write = (x, y) => {
    if (!card || !rect) return
    const nx = Math.min(0.5, Math.max(-0.5, (x - rect.left) / rect.width - 0.5))
    const ny = Math.min(0.5, Math.max(-0.5, (y - rect.top) / rect.height - 0.5))
    // 右边向后倒 = rotateY 正值；下边向后倒 = rotateX 负值
    card.style.setProperty('--press-ry', `${(nx * MAX_TILT * 2).toFixed(2)}deg`)
    card.style.setProperty('--press-rx', `${(-ny * MAX_TILT * 2).toFixed(2)}deg`)
  }

  const onMove = (event) => {
    if (!card || event.pointerId !== pointerId) return
    const x = event.clientX
    const y = event.clientY
    cancelAnimationFrame(frame)
    frame = requestAnimationFrame(() => write(x, y))
  }

  const onPointerDown = (event) => {
    if (!touch.matches || reduce.matches) return
    if (event.pointerType === 'mouse') return
    if (card || pointerId !== null) return // 单指，只跟最先按下的那根

    const target = event.target?.closest?.('.VPFeature')
    if (!target || !target.closest('.VPFeatures')) return

    card = target
    pointerId = event.pointerId
    // 矩形按一次缓存，移动过程中不反复读布局
    rect = card.getBoundingClientRect()
    // 光晕只记录首次触点；保留坐标供松手淡出，下次按压时覆盖。
    card.style.setProperty('--press-glow-x', `${Math.min(rect.width, Math.max(0, event.clientX - rect.left))}px`)
    card.style.setProperty('--press-glow-y', `${Math.min(rect.height, Math.max(0, event.clientY - rect.top))}px`)
    card.dataset.press = ''
    card.style.setProperty('--press-scale', String(PRESS_SCALE))
    write(event.clientX, event.clientY)

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerup', release, { passive: true })
    window.addEventListener('pointercancel', release, { passive: true })
    // 卡片随页面滚走时缓存的矩形失效，直接释放
    document.addEventListener('scroll', release, { passive: true, capture: true })
  }

  document.addEventListener('pointerdown', onPointerDown, { passive: true })

  // 用户中途开启「减少动态效果」或插上鼠标时，立即收手
  const onSettingChange = () => {
    if (reduce.matches || !touch.matches) release()
  }
  reduce.addEventListener('change', onSettingChange)
  touch.addEventListener('change', onSettingChange)
}
