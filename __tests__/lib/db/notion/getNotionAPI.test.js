describe('notionAPI client options', () => {
  it('adds a User-Agent header for Notion API requests', () => {
    jest.isolateModules(() => {
      const notionConstructor = jest.fn().mockImplementation(() => ({
        getPage: jest.fn()
      }))

      jest.doMock('notion-client', () => ({
        NotionAPI: notionConstructor
      }))

      const { notionAPI } = require('@/lib/db/notion/getNotionAPI')
      notionAPI.getPage('test-page-id')

      expect(notionConstructor).toHaveBeenCalledWith(
        expect.objectContaining({
          ofetchOptions: {
            headers: {
              'User-Agent':
                'NotionNext (+https://github.com/NotionNext/NotionNext)'
            }
          }
        })
      )
    })
  })
})
