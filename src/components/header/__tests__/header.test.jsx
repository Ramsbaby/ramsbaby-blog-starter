import React from 'react'
import { render, screen } from '@testing-library/react'
import { Header } from '../index'

describe('Header', () => {
  it('renders home link with aria-label', () => {
    const location = { pathname: '/' }
    render(<Header title="My Site" location={location} rootPath="/" />)
    const link = screen.getByLabelText('홈으로 이동')
    expect(link).toBeInTheDocument()
  })
})
