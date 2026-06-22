import { render } from '@testing-library/react'
import { LayoutBase } from '@/themes/claude'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'

jest.mock('@/lib/config', () => ({
  siteConfig: jest.fn()
}))

jest.mock('@/lib/global', () => ({
  useGlobal: jest.fn()
}))

jest.mock('@/themes/claude/config', () => ({}))
jest.mock('@/components/GoogleAdsense', () => ({
  AdSlot: () => null
}))
jest.mock('@/components/Mark', () => jest.fn())
jest.mock('@/components/NotionPage', () => () => null)
jest.mock('@/components/SmartLink', () => ({
  __esModule: true,
  default: ({ children }) => <>{children}</>
}))
jest.mock('@/themes/claude/components/BlogPostBar', () => () => null)
jest.mock('@/themes/claude/components/Catalog', () => () => null)
jest.mock('@/themes/claude/components/ProfileHome', () => () => null)
jest.mock('@/themes/claude/style', () => ({
  Style: () => null
}))

describe('claude LayoutBase', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    siteConfig.mockImplementation((key, defaultValue) => {
      const configMap = {
        FONT_STYLE: '',
        SIMPLE_TOP_BAR: false,
        CLAUDE_TOC_ENABLE: true
      }
      return key in configMap ? configMap[key] : defaultValue
    })
    useGlobal.mockReturnValue({
      onLoading: false
    })
  })

  it('does not render the floating search button container', () => {
    const { container } = render(
      <LayoutBase>
        <div>content</div>
      </LayoutBase>
    )

    expect(
      container.querySelector('.claude-global-search-button')
    ).not.toBeInTheDocument()
  })
})
