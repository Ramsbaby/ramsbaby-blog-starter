import React, { useEffect, useState } from 'react'

export const ReadingProgress = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement
      const total = doc.scrollHeight - doc.clientHeight
      const current = window.scrollY
      const p =
        total > 0 ? Math.min(100, Math.max(0, (current / total) * 100)) : 0
      setProgress(p)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress)}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: 3,
        width: progress + '%',
        background: '#1a73e8',
        zIndex: 10000,
        transition: 'width 120ms ease-out',
      }}
    />
  )
}

export default ReadingProgress
