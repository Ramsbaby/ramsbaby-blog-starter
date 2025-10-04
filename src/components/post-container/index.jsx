import React, { useEffect, useRef } from 'react'
import './index.scss'

export const PostContainer = ({ html }) => {
  const rootRef = useRef(null)

  useEffect(() => {
    // Add copy button to each code block
    const root = rootRef.current
    if (!root) return
    const blocks = root.querySelectorAll('pre')
    blocks.forEach(block => {
      const host = block // 버튼을 pre 내부에 직접 부착해 배경(코드 영역) 안에 고정
      if (host.querySelector('[data-copy-button]')) return
      host.classList.add('code-block-wrapper')

      const btn = document.createElement('button')
      btn.textContent = 'Copy'
      btn.setAttribute('type', 'button')
      btn.setAttribute('data-copy-button', 'true')
      btn.setAttribute('aria-label', '코드 복사')
      btn.className = 'copy-btn'
      btn.addEventListener('click', async () => {
        try {
          const text = block.innerText || ''
          await navigator.clipboard.writeText(text)
          const prev = btn.textContent
          btn.textContent = 'Copied'
          setTimeout(() => (btn.textContent = prev || 'Copy'), 1200)
        } catch (e) {
          // ignore
        }
      })
      host.style.position = 'relative'
      host.appendChild(btn)
    })
  }, [html])

  return (
    <div
      ref={rootRef}
      className="post-container"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
