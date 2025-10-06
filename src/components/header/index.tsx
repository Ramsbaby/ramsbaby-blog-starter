import React from 'react'
import './index.scss'
import { Link } from 'gatsby'

type HeaderProps = {
  title: string
  location: { pathname: string }
  rootPath: string
}

export const Header: React.FC<HeaderProps> = ({
  title,
  location,
  rootPath,
}) => {
  const isRoot = location.pathname === rootPath
  return (
    <header className="home-header" role="banner">
      <h1 className="home-header__title">
        <Link to={`/`} className="link" aria-label="홈으로 이동">
          {title}
        </Link>
      </h1>
      <nav className="home-header__nav" aria-label="Primary">
        <Link to="/" className="home-header__nav-link">
          Home
        </Link>
        <a href="#search" className="home-header__nav-link">
          Search
        </a>
      </nav>
    </header>
  )
}

export default Header
