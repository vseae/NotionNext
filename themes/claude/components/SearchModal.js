import { useGlobal } from '@/lib/global'
import { useRouter } from 'next/router'
import { useEffect, useImperativeHandle, useRef, useState } from 'react'

let lockSearchInput = false

/**
 * Claude 主题本地搜索弹窗
 * 未配置 Algolia 时，提供可输入关键词的兜底搜索体验
 */
export default function SearchModal({ cRef }) {
  const { locale } = useGlobal()
  const router = useRouter()
  const inputRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [showClean, setShowClean] = useState(false)

  useImperativeHandle(cRef, () => {
    return {
      openSearch: () => {
        setIsOpen(true)
      }
    }
  })

  useEffect(() => {
    if (!isOpen) {
      return
    }
    const timer = setTimeout(() => {
      inputRef.current?.focus()
    }, 50)
    return () => clearTimeout(timer)
  }, [isOpen])

  useEffect(() => {
    setIsOpen(false)
  }, [router.asPath])

  const closeModal = () => {
    setIsOpen(false)
  }

  const cleanSearch = () => {
    if (inputRef.current) {
      inputRef.current.value = ''
    }
    setShowClean(false)
  }

  const handleSearch = () => {
    const keyword = inputRef.current?.value?.trim()
    if (!keyword) {
      router.push({ pathname: '/search' })
      return
    }
    router.push({ pathname: `/search/${encodeURIComponent(keyword)}` })
  }

  const onKeyUp = event => {
    if (event.key === 'Enter') {
      handleSearch()
      return
    }
    if (event.key === 'Escape') {
      closeModal()
    }
  }

  const onInputChange = event => {
    if (lockSearchInput) {
      return
    }
    const value = event.target.value
    if (inputRef.current) {
      inputRef.current.value = value
    }
    setShowClean(Boolean(value))
  }

  const onCompositionStart = () => {
    lockSearchInput = true
  }

  const onCompositionEnd = () => {
    lockSearchInput = false
  }

  if (!isOpen) {
    return null
  }

  return (
    <div className='claude-search-modal-wrapper' role='dialog' aria-modal='true'>
      <div className='claude-search-modal-panel'>
        <div className='claude-search-modal-header'>
          <div className='claude-search-modal-title'>{locale?.NAV?.SEARCH || 'Search'}</div>
          <button
            type='button'
            aria-label='Close search'
            onClick={closeModal}
            className='claude-search-modal-close'>
            <i className='fa-solid fa-xmark' />
          </button>
        </div>

        <div className='claude-search-input-wrap'>
          <input
            ref={inputRef}
            type='text'
            onKeyUp={onKeyUp}
            onChange={onInputChange}
            onCompositionStart={onCompositionStart}
            onCompositionUpdate={onCompositionStart}
            onCompositionEnd={onCompositionEnd}
            placeholder={locale?.SEARCH?.ARTICLES || 'Search articles'}
            className='claude-search-input'
          />
          <button
            type='button'
            onClick={handleSearch}
            aria-label='Submit search'
            className='claude-search-submit'>
            <i className='fas fa-search' />
          </button>
          {showClean && (
            <button
              type='button'
              onClick={cleanSearch}
              aria-label='Clean search'
              className='claude-search-clean'>
              <i className='fas fa-times' />
            </button>
          )}
        </div>
      </div>

      <div className='claude-search-modal-mask' onClick={closeModal} />
    </div>
  )
}
