const getEnvBoolean = (envName, defaultValue = false) => {
  const value = process.env[envName]
  if (value === undefined || value === null || value === '') {
    return defaultValue
  }
  return String(value).toLowerCase() === 'true'
}

const CONFIG = {
  // 博客標題 雙語言
  CLAUDE_BLOG_NAME: process.env.NEXT_PUBLIC_CLAUDE_BLOG_NAME || '让我想想',
  CLAUDE_BLOG_NAME_EN:
    process.env.NEXT_PUBLIC_CLAUDE_BLOG_NAME_EN ||
    process.env.NEXT_PUBLIC_CLAUDE_BLOG_NAME ||
    'Typography',

  CLAUDE_POST_AD_ENABLE: getEnvBoolean(
    'NEXT_PUBLIC_CLAUDE_POST_AD_ENABLE',
    true
  ), // 文章列表是否插入广告

  CLAUDE_POST_COVER_ENABLE: getEnvBoolean(
    'NEXT_PUBLIC_CLAUDE_POST_COVER_ENABLE',
    false
  ), // 是否展示博客封面
  CLAUDE_ARTICLE_COVER_ENABLE: getEnvBoolean(
    'NEXT_PUBLIC_CLAUDE_ARTICLE_COVER_ENABLE',
    true
  ), // 文章详情页是否展示Notion封面

  CLAUDE_ARTICLE_RECOMMEND_POSTS: getEnvBoolean(
    'NEXT_PUBLIC_CLAUDE_ARTICLE_RECOMMEND_POSTS',
    true
  ), // 文章详情底部显示推荐

  // 菜单配置
  CLAUDE_MENU_CATEGORY: true, // 显示分类
  CLAUDE_MENU_TAG: true, // 显示标签
  CLAUDE_MENU_ARCHIVE: true, // 显示归档

  // 目录配置
  CLAUDE_TOC_ENABLE: getEnvBoolean('NEXT_PUBLIC_CLAUDE_TOC_ENABLE', true), // 是否显示目录，默认开启
  CLAUDE_TOC_SHOW_LEVEL3: getEnvBoolean(
    'NEXT_PUBLIC_CLAUDE_TOC_SHOW_LEVEL3',
    true
  ), // 是否显示第三级目录，默认开启; 设为 false 只显示 L1+L2
  CLAUDE_TOC_SCROLL_BEHAVIOR:
    process.env.NEXT_PUBLIC_CLAUDE_TOC_SCROLL_BEHAVIOR || 'instant', // 滚动行为：'smooth' 或 'instant'

  // 副标题配置
  CLAUDE_SUBTITLE_DARK_ONLY: getEnvBoolean(
    'NEXT_PUBLIC_CLAUDE_SUBTITLE_DARK_ONLY',
    false
  ), // 副标题在浅色和深色模式下都显示，设为 true 则仅深色模式

  // 侧栏资料卡配置
  CLAUDE_PROFILE_AVATAR: process.env.NEXT_PUBLIC_CLAUDE_PROFILE_AVATAR || '', // 头像URL；留空则回退到 AVATAR/siteInfo.icon
  CLAUDE_FOOTER_COPYRIGHT:
    process.env.NEXT_PUBLIC_CLAUDE_FOOTER_COPYRIGHT || '', // 例如：© 2023-2026 Yicheng；留空则使用 SINCE + AUTHOR

  // README 渲染缓存（可由 Notion 配置文档中的同名字段覆盖）
  CLAUDE_README_CACHE_ENABLED: getEnvBoolean(
    'NEXT_PUBLIC_CLAUDE_README_CACHE_ENABLED',
    true
  ),

  // Contribution 持久化（可由 Notion 配置文档中的同名字段覆盖）
  // 依赖 COCKROACH_DATABASE_URL（或 DATABASE_URL）
  CLAUDE_CONTRIBUTION_PERSIST_ENABLED: getEnvBoolean(
    'NEXT_PUBLIC_CLAUDE_CONTRIBUTION_PERSIST_ENABLED',
    true
  ),
  CLAUDE_CONTRIBUTION_EVENT_LIMIT: Number(
    process.env.NEXT_PUBLIC_CLAUDE_CONTRIBUTION_EVENT_LIMIT || 50000
  )
}
export default CONFIG
