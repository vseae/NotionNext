import { render, screen } from '@testing-library/react'
import Footer from '@/themes/claude/components/Footer'
import { siteConfig } from '@/lib/config'

jest.mock('@/lib/config', () => ({
  siteConfig: jest.fn()
}))

jest.mock('@/themes/claude/config', () => ({}))

describe('claude Footer', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    siteConfig.mockImplementation((key, defaultValue) => {
      const configMap = {
        SINCE: '2024',
        AUTHOR: 'Tester',
        CLAUDE_FOOTER_COPYRIGHT: ''
      }
      return key in configMap ? configMap[key] : defaultValue
    })
  })

  it('does not render the theme toggle button in footer', () => {
    render(<Footer />)

    expect(screen.getByText(/©/)).toBeInTheDocument()
    expect(document.getElementById('darkModeButton')).not.toBeInTheDocument()
  })
})
