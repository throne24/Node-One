/**
 * 移动端点开小红书主页链接时，优先唤起 App 直接落到个人主页；
 * 没装 App（或用户取消）就回落到原本的网页地址。
 *
 * 设计取舍：
 * - a[href] 保持 https 网页地址不变，桌面端、无 JS、搜索引擎、复制分享都不受影响；
 * - 只在触屏设备上拦截（(hover: none)），桌面鼠标点击完全走浏览器原生行为；
 * - 唤起失败是「安全失败」：最多等 FALLBACK_DELAY 再打开网页，不会白屏或死链。
 */

// https://www.xiaohongshu.com/user/profile/<user_id>[?query]
const PROFILE_RE = /^https?:\/\/(?:www\.)?xiaohongshu\.com\/user\/profile\/([0-9a-f]+)/i

// 小红书私有协议，随版本可能变动；失效时只会退化成「等一会儿再开网页」
const schemeOf = (userId) => `xhsdiscover://user/${userId}`

const FALLBACK_DELAY = 1800
const BOUND_FLAG = '__xhsProfileLinksBound'

function launch(scheme, fallbackUrl) {
  let done = false
  let timer = 0

  const finish = () => {
    done = true
    clearTimeout(timer)
    document.removeEventListener('visibilitychange', onVisibility)
    window.removeEventListener('pagehide', finish)
  }

  // App 把浏览器顶到后台说明唤起成功，此时不能再回落，否则用户从 App 返回会看到网页
  const onVisibility = () => {
    if (document.visibilityState === 'hidden') finish()
  }

  document.addEventListener('visibilitychange', onVisibility, { passive: true })
  window.addEventListener('pagehide', finish, { passive: true })

  timer = setTimeout(() => {
    if (done) return
    finish()
    // 仍停留在本页：设备上没有能处理该协议的 App
    if (document.visibilityState === 'visible') window.location.href = fallbackUrl
  }, FALLBACK_DELAY)

  window.location.href = scheme
}

/**
 * 用事件委托接管页面里所有小红书主页链接（导航栏社交图标、正文链接都算），
 * 只在首次调用时绑定，SPA 切页不会重复挂监听。
 */
export function bindXhsProfileLinks() {
  if (typeof window === 'undefined') return
  if (window[BOUND_FLAG]) return
  window[BOUND_FLAG] = true

  const touchOnly = matchMedia('(hover: none)')

  document.addEventListener(
    'click',
    (event) => {
      if (!touchOnly.matches) return
      if (event.defaultPrevented || event.button !== 0) return
      // 新标签页 / 新窗口打开等原生意图不拦截
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const link = event.target?.closest?.('a[href]')
      if (!link) return

      const matched = PROFILE_RE.exec(link.href)
      if (!matched) return

      event.preventDefault()
      launch(schemeOf(matched[1]), link.href)
    },
    { passive: false }
  )
}
