import { render } from '@testing-library/react'
import ThemeSwitch from '@/components/ThemeSwitch'

jest.mock('@/lib/global', () => ({
  useGlobal: jest.fn(() => ({
    theme: 'simple',
    locale: {
      COMMON: { THEME: 'Theme' },
      MENU: { DARK_MODE: 'Dark', LIGHT_MODE: 'Light' }
    },
    isDarkMode: false,
    toggleDarkMode: jest.fn()
  }))
}))

jest.mock('@/themes/theme', () => ({
  THEMES: ['simple', 'next']
}))

jest.mock('@/components/DarkModeButton', () => () => <div>DarkModeButton</div>)
jest.mock('@/components/Draggable', () => ({
  Draggable: ({ children }) => <div>{children}</div>
}))
jest.mock('@/components/LazyImage', () => props => <img alt='theme-preview' {...props} />)
jest.mock('@/components/SideBarDrawer', () => ({ children }) => <div>{children}</div>)

describe('ThemeSwitch', () => {
  it('does not render any UI', () => {
    const { container } = render(<ThemeSwitch />)

    expect(container).toBeEmptyDOMElement()
  })
})
