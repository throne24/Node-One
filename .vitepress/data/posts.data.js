import { createContentLoader } from 'vitepress'

// 自动读取 posts 目录下的所有 Markdown 文章，并整理成列表数据
export default createContentLoader('posts/**/*.md', {
  excerpt: true,
  transform(raw) {
    return raw
      .filter((page) => page.url !== '/posts/' && page.frontmatter.title)
      .map(({ url, frontmatter, excerpt }) => ({
        title: frontmatter.title,
        url,
        date: formatDate(frontmatter.date),
        time: frontmatter.date ? new Date(frontmatter.date).getTime() : 0,
        summary: frontmatter.description || toSummary(excerpt)
      }))
      .sort((a, b) => b.time - a.time)
  }
})

function formatDate(date) {
  if (!date) return ''
  const d = new Date(date)
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${month}-${day}`
}

// 没有 description 时的兜底：把 excerpt 的 HTML 转成纯文本，去掉标题和代码
function toSummary(html) {
  if (!html) return ''
  const text = html
    .replace(/<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>/g, ' ')
    .replace(/<pre[\s\S]*?<\/pre>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim()
  return text.length > 100 ? `${text.slice(0, 100)}…` : text
}
