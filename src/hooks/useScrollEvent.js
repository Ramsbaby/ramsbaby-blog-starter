import { useEffect, useRef } from 'react'

export function useScrollEvent(onScroll, wait = 150) {
  const lastCallRef = useRef(0)
  const savedCallback = useRef(onScroll)

  savedCallback.current = onScroll

  useEffect(() => {
    const handler = () => {
      const now = Date.now()
      if (now - lastCallRef.current >= wait) {
        lastCallRef.current = now
        savedCallback.current()
      }
    }
    window.addEventListener(`scroll`, handler, { passive: true })
    return () => {
      window.removeEventListener(`scroll`, handler, { passive: true })
    }
  }, [wait])
}
