import { fireEvent, render, screen } from '@testing-library/react'
import SearchModal from '@/themes/claude/components/SearchModal'
import { useGlobal } from '@/lib/global'
import { useRouter } from 'next/router'

jest.mock('@/lib/global', () => ({
  useGlobal: jest.fn()
}))

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

describe('claude SearchModal', () => {
  const pushMock = jest.fn()
  let cRef

  beforeEach(() => {
    jest.clearAllMocks()
    cRef = { current: null }
    useGlobal.mockReturnValue({
      locale: {
        NAV: { SEARCH: 'Search' },
        SEARCH: { ARTICLES: 'Search articles' }
      }
    })
    useRouter.mockReturnValue({
      asPath: '/',
      push: pushMock
    })
  })

  it('opens by imperative ref and closes by mask click', () => {
    render(<SearchModal cRef={cRef} />)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    cRef.current.openSearch()
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    fireEvent.click(document.querySelector('.claude-search-modal-mask'))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('submits keyword to /search/[keyword] on Enter', () => {
    render(<SearchModal cRef={cRef} />)
    cRef.current.openSearch()
    const input = screen.getByPlaceholderText('Search articles')
    fireEvent.change(input, { target: { value: 'notion next' } })
    fireEvent.keyUp(input, { key: 'Enter' })

    expect(pushMock).toHaveBeenCalledWith({
      pathname: '/search/notion%20next'
    })
  })

  it('routes to /search when keyword is empty', () => {
    render(<SearchModal cRef={cRef} />)
    cRef.current.openSearch()
    const input = screen.getByPlaceholderText('Search articles')
    fireEvent.change(input, { target: { value: '   ' } })
    fireEvent.keyUp(input, { key: 'Enter' })

    expect(pushMock).toHaveBeenCalledWith({ pathname: '/search' })
  })
})
