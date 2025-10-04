import { useState, useEffect, useRef } from 'react'
import * as Storage from '../utils/storage'

/**
 * 렌더된 포스트 묶음 카운트를 관리합니다.
 * - 세션 스토리지에 현재 카운트를 저장/복원합니다.
 * @returns [count, countRef, increaseCount]
 */
export function useRenderedCount(): [
  number,
  React.MutableRefObject<number>,
  () => void
] {
  const initialCount = Storage.getCount(1)
  const [count, setCount] = useState<number>(initialCount)
  const countRef = useRef<number>(count)
  const increaseCount = () => setCount(prev => prev + 1)

  useEffect(() => {
    countRef.current = count
    Storage.setCount(count)
  }, [count])

  return [count, countRef, increaseCount]
}
