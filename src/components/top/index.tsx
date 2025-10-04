import React from 'react'
import { Link } from 'gatsby'
import { GitHubIcon } from '../social-share/github-icon'

import './index.scss'

type TopProps = {
  title: string
  location: { pathname: string }
  rootPath: string
  github_Id: string
}

/**
 * 상단 헤더/깃허브 영역 컴포넌트
 */
export const Top: React.FC<TopProps> = ({ title, location, rootPath, github_Id }) => {
  const isRoot = location.pathname === rootPath
  const githubId = github_Id

  return (
    <div className="top">
      {!isRoot && (
        <Link to={`/`} className="link">
          {title}
        </Link>
      )}
      {isRoot && <GitHubIcon githubId={githubId} />}
    </div>
  )
}

export default Top


