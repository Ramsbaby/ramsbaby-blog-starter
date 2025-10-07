import React from 'react'
import { render, act } from '@testing-library/react'
import { useScrollEvent } from '../useScrollEvent'

describe('useScrollEvent', () => {
  beforeEach(() => {
    jest.useFakeTimers({ now: 0 })
  })
  afterEach(() => {
    jest.useRealTimers()
  })

  it('지정된 간격 내에 스크롤 이벤트 콜백을 스로틀한다', () => {
    const onScroll = jest.fn()

    const Comp = () => {
      useScrollEvent(onScroll, 50)
      return <div />
    }
    render(<Comp />)

    const fireScroll = () =>
      act(() => {
        window.dispatchEvent(new Event('scroll', { bubbles: true }))
      })
    // 첫 스크롤 → 호출
    fireScroll()
    expect(onScroll).toHaveBeenCalledTimes(1)

    // 10ms 경과 내 스크롤 → 호출 안됨
    jest.setSystemTime(10)
    fireScroll()
    expect(onScroll).toHaveBeenCalledTimes(1)

    // 60ms 시점 스크롤 → 두번째 호출
    jest.setSystemTime(60)
    fireScroll()
    expect(onScroll).toHaveBeenCalledTimes(2)
  })
})
