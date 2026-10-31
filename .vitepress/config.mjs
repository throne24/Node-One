import { defineConfig } from 'vitepress'

// GitHub Actions 里 GITHUB_REPOSITORY 形如 "用户名/仓库名"
// 部署到 GitHub Pages 的“项目站点”时，站点位于 /仓库名/ 子路径下，必须设置 base
// 如果仓库名是 用户名.github.io（用户站点），则站点在根路径，base 保持 '/'
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1]
const base = repo && !repo.endsWith('.github.io') ? `/${repo}/` : '/'

// VitePress 配置文档：https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: 'Node One',
  description: '一个用 Markdown 记录文章与想法的地方',
  base,
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}favicon.svg` }],
    // 语雀图床会拒绝带 Referer 的请求，这里全局不发送 Referer
    ['meta', { name: 'referrer', content: 'no-referrer' }]
  ],

  themeConfig: {
    siteTitle: 'Node One',

    nav: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/posts/' },
      { text: '关于', link: '/about' }
    ],

    sidebar: {
      '/posts/': [
        {
          text: '文章',
          items: [
            { text: '全部文章', link: '/posts/' },
            { text: 'Agent基础', link: '/posts/AI' },
            { text: 'npm', link: '/posts/npm' },
            { text: 'git', link: '/posts/git' },
            { text: '计算机网络原理', link: '/posts/jiwang' },
            { text: '计算机组成原理', link: '/posts/jizu' },
            { text: '数据库系统概述', link: '/posts/shujuku' }
          ]
        }
      ]
    },

    outline: { level: [2, 3], label: '本页目录' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    lastUpdated: { text: '最后更新于' },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索文章', buttonAriaLabel: '搜索文章' },
          modal: {
            noResultsText: '没有找到结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/throne24' }],

    footer: {
      message: '<span class="flip"><span class="flip-a">Only the Paranoid Survive</span><span class="flip-b">paranoid but not panicked</span></span>',
      copyright: `© 纷乱世界的不了解`
    }
  }
})
