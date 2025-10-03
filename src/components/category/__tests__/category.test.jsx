import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Category } from '../index'

jest.mock('react-horizontal-scrolling-menu', () => {
  const React = require('react')
  return ({ data, onSelect }) => (
    <div>
      {data.map((child, i) => (
        <div
          key={i}
          role="button"
          tabIndex={0}
          onClick={() => onSelect(child.props.text)}
        >
          {child.props.text}
        </div>
      ))}
    </div>
  )
})

describe('Category', () => {
  it('renders categories and fires select', () => {
    const selectCategory = jest.fn()
    const selectExposureGb = jest.fn()
    render(
      <Category
        categories={['A', 'B']}
        category={'A'}
        selectCategory={selectCategory}
        selectExposureGb={selectExposureGb}
      />
    )
    expect(screen.getByText('All')).toBeInTheDocument()
    fireEvent.click(screen.getByText('A'))
    expect(selectCategory).toHaveBeenCalled()
  })
})
