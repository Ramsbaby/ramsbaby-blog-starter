/**
 * toFit 동작 옵션
 * - dismissCondition: true면 콜백을 종료
 * - triggerCondition: true면 콜백을 실행
 */
export type ToFitOptions = {
  dismissCondition?: () => boolean
  triggerCondition?: () => boolean
}

/**
 * requestAnimationFrame 내부에서 조건을 체크하여 콜백 실행/취소를 제어합니다.
 */
export function toFit<T = unknown>(
  cb: () => T,
  {
    dismissCondition = () => false,
    triggerCondition = () => true,
  }: ToFitOptions = {}
): () => T | void {
  if (!cb) {
    throw Error('Invalid required arguments')
  }

  let tick = false

  return function() {
    if (tick) {
      return
    }

    tick = true
    requestAnimationFrame(() => {
      if (dismissCondition()) {
        tick = false
        return
      }

      if (triggerCondition()) {
        tick = false
        cb()
      }
    })
    return
  }
}
