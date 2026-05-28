import { siteConfig } from '@/lib/config'
import { useRouter } from 'next/router'
import { useSimpleGlobal } from '..'

/**
 * 右上角全站搜索按钮
 * 仅展示图标，点击后打开主题内搜索弹窗或退化到搜索页
 */
export default function SearchButton() {
  const router = useRouter()
  const { searchModal, localSearchModal } = useSimpleGlobal()

  const handleSearchClick = () => {
    if (siteConfig('ALGOLIA_APP_ID') && searchModal?.current?.openSearch) {
      searchModal.current.openSearch()
      return
    }
    if (localSearchModal?.current?.openSearch) {
      localSearchModal.current.openSearch()
      return
    }
    router.push('/search')
  }

  return (
    <button
      type='button'
      aria-label='Search'
      title='Search'
      onClick={handleSearchClick}
      className='claude-search-icon-button'>
      <i className='fas fa-magnifying-glass' aria-hidden='true' />
    </button>
  )
}
