import { useEffect, useLayoutEffect, useRef } from 'react'

/**
 * 스크롤 이벤트 핸들러를 스로틀 간격으로 호출합니다.
 * @param onScroll 호출할 콜백
 * @param wait 최소 호출 간격(ms)
 */
export function useScrollEvent(onScroll: () => void, wait = 150): void {
  const lastCallRef = useRef(0)
  const savedCallback = useRef(onScroll)

  savedCallback.current = onScroll

  const useIsoLayoutEffect =
    typeof window !== 'undefined' ? useLayoutEffect : useEffect

  useIsoLayoutEffect(() => {
    // 첫 스크롤에서도 즉시 호출될 수 있도록 초기값을 보정
    lastCallRef.current = -Infinity
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
