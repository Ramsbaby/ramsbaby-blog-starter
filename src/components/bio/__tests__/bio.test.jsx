import React from 'react'
import { render, screen } from '@testing-library/react'
import { Bio } from '../index'

jest.mock('gatsby', () => {
  const React = require('react')
  return {
    graphql: jest.fn(),
    StaticQuery: ({ render }) =>
      render({
        avatar: { childImageSharp: { gatsbyImageData: {} } },
        site: {
          siteMetadata: {
            author: 'Test Author',
            introduction: 'Intro',
            social: { github: 'test', portfolio: '#' },
            othersite: [],
          },
        },
      }),
    Link: ({ to, children, ...rest }) => (
      <a href={to} {...rest}>
        {children}
      </a>
    ),
  }
})

jest.mock('gatsby-plugin-image', () => {
  const React = require('react')
  return {
    GatsbyImage: ({ alt }) => <img alt={alt} />,
    getImage: () => ({}),
  }
})

describe('Bio', () => {
  it('renders author and avatar', () => {
    render(<Bio />)
    expect(screen.getByText('Test Author')).toBeInTheDocument()
    expect(screen.getByAltText('Test Author')).toBeInTheDocument()
  })
})
