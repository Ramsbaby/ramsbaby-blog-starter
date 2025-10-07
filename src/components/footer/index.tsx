import React from 'react'

type FooterProps = {
  siteMetadata: {
    social: { github: string }
    title: string
  }
}

/**
 * 사이트 하단 푸터 컴포넌트
 * @param siteMetadata 사이트 메타데이터(깃허브/타이틀)
 */
export const Footer: React.FC<FooterProps> = ({ siteMetadata }) => {
  const metaData = siteMetadata
  const { social, title } = metaData

  return (
    <footer className="footer">
      ©<a href={`https://github.com/` + social.github}>{title}</a>, Built with{' '}
      <a href={`https://github.com/` + social.github}>{social.github}</a>
    </footer>
  )
}

export default Footer
