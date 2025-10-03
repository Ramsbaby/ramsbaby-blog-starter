import React, { useCallback, useState } from 'react'
import ReactDisqusComments from 'react-disqus-comments'

export const Disqus = ({ post, shortName, siteUrl, slug }) => {
  const [toasts, setToasts] = useState([])

  const notifyAboutComment = useCallback(() => {
    setToasts(prev => [...prev, { text: 'New comment available!!' }])
  }, [])

  const url = siteUrl + slug

  return (
    <ReactDisqusComments
      shortname={shortName}
      identifier={post.frontmatter.title}
      title={post.frontmatter.title}
      url={url}
      category_id={post.frontmatter.category_id}
      onNewComment={notifyAboutComment}
    />
  )
}
