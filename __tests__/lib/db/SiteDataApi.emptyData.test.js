jest.mock('@/lib/cache/cache_manager', () => ({
  getOrSetDataWithCache: jest.fn((_key, loadData) => loadData())
}))

jest.mock('@/lib/db/notion/getPostBlocks', () => ({
  fetchInBatches: jest.fn(),
  fetchNotionPageBlocks: jest.fn().mockResolvedValue(null),
  formatNotionBlock: jest.fn(block => block)
}))

jest.mock('@/lib/db/notion/getPageProperties', () => ({
  __esModule: true,
  default: jest.fn(),
  adjustPageProperties: jest.fn()
}))

jest.mock('@/lib/db/notion/getNotionPost', () => ({
  fetchPageFromNotion: jest.fn()
}))

jest.mock('notion-utils', () => ({
  idToUuid: jest.fn(id => id)
}))

const { fetchGlobalAllData } = require('@/lib/db/SiteDataApi')

describe('fetchGlobalAllData fallback data', () => {
  it('returns serializable empty site data when Notion data is unavailable', async () => {
    const data = await fetchGlobalAllData({
      pageId: 'b2bbed0262318251a4098168a4ff91de',
      from: 'empty-notion-data-test',
      locale: 'zh-CN'
    })

    expect(data.notice).toBeNull()
    expect(Array.isArray(data.allPages)).toBe(true)
    expect(Array.isArray(data.latestPosts)).toBe(true)
  })
})
