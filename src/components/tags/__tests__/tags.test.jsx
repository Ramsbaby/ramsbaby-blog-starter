import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Tags } from '../index'

describe('Tags', () => {
  it('renders tags and fires handlers', () => {
    const selectTag = jest.fn()
    const selectExposureGb = jest.fn()
    const tags = [{ fieldValue: 'foo', totalCount: 2 }]
    render(<Tags tags={tags} selectTag={selectTag} selectExposureGb={selectExposureGb} />)
    const foo = screen.getByRole('button', { name: '태그 선택: foo' })
    fireEvent.click(foo)
    expect(selectTag).toHaveBeenCalledWith('foo')
    expect(selectExposureGb).toHaveBeenCalledWith('TAG')
  })
})
