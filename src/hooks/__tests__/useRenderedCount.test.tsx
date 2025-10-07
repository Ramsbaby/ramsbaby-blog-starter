import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

jest.mock('../../utils/storage', () => ({
  getCount: jest.fn(() => 1),
  setCount: jest.fn(),
}))

import { useRenderedCount } from '../useRenderedCount'

const TestComponent = () => {
  const [count, , increaseCount] = useRenderedCount()
  return (
    <div>
      <span data-testid="count">{count}</span>
      <button onClick={increaseCount}>inc</button>
    </div>
  )
}

describe('useRenderedCount', () => {
  it('초기 카운트를 불러오고 증가시킨다', () => {
    render(<TestComponent />)
    expect(screen.getByTestId('count').textContent).toBe('1')
    fireEvent.click(screen.getByText('inc'))
    expect(screen.getByTestId('count').textContent).toBe('2')
    fireEvent.click(screen.getByText('inc'))
    expect(screen.getByTestId('count').textContent).toBe('3')
  })
})
