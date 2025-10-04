import { useEffect, useCallback } from 'react'
import * as Dom from '../utils/dom'
import * as EventManager from '../utils/event-manager'

const BASE_LINE = 80

function getDistance(currentPos: number): number {
  return Dom.getDocumentHeight() - currentPos
}

export function useInfiniteScroll(
  callback: () => void,
  condition: () => boolean
): void {
  const onScroll = useCallback(() => {
    const currentPos = window.scrollY + window.innerHeight
    const isTriggerPos = () => getDistance(currentPos) < BASE_LINE

    return EventManager.toFit(callback, {
      dismissCondition: () => !isTriggerPos(),
      triggerCondition: () => isTriggerPos() && condition(),
    })()
  }, [condition, callback])

  useEffect(() => {
    window.addEventListener(`scroll`, onScroll, { passive: false })
    return () => {
      window.removeEventListener(`scroll`, onScroll, { passive: false })
    }
  }, [onScroll])
}
