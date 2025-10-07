import React, { useEffect, useRef } from 'react'
import * as Dom from '../../utils/dom'
import { THEME } from '../../constants'

export const Giscus = ({ config }) => {
  const rootRef = useRef(null)

  useEffect(() => {
    if (!rootRef.current) return
    // cleanup previous instance on rerender
    rootRef.current.innerHTML = ''

    const isDark = Dom.hasClassOfBody(THEME.DARK)
    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.async = true
    script.setAttribute('data-repo', config.repo)
    if (config.repoId) script.setAttribute('data-repo-id', config.repoId)
    script.setAttribute('data-category', config.category)
    if (config.categoryId)
      script.setAttribute('data-category-id', config.categoryId)
    script.setAttribute('data-mapping', config.mapping || 'pathname')
    script.setAttribute(
      'data-reactions-enabled',
      config.reactionsEnabled || '1'
    )
    script.setAttribute('data-emit-metadata', config.emitMetadata || '0')
    script.setAttribute(
      'data-theme',
      isDark ? config.themeDark || 'dark_dimmed' : config.themeLight || 'light'
    )
    script.crossOrigin = 'anonymous'

    rootRef.current.appendChild(script)
  }, [config])

  return <div className="giscus" ref={rootRef} />
}

export default Giscus
