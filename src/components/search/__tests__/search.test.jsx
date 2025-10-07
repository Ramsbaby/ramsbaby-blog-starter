import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Search from '../index'

describe('Search', () => {
  it('calls handlers on input change', () => {
    const inputSearchWord = jest.fn()
    const selectExposureGb = jest.fn()
    render(
      <Search
        inputSearchWord={inputSearchWord}
        selectExposureGb={selectExposureGb}
      />
    )
    const input = screen.getByRole('searchbox', { name: '검색어 입력' })
    fireEvent.change(input, { target: { value: 'test' } })
    expect(inputSearchWord).toHaveBeenCalledWith('test')
    expect(selectExposureGb).toHaveBeenCalledWith('SEARCH')
  })
})
