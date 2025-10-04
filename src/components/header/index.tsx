import React from 'react'
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
    isRoot && (
      <h1 className="home-header">
        <Link to={`/`} className="link" aria-label="홈으로 이동">
          {title}
        </Link>
      </h1>
    )
  )
}

export default Header
