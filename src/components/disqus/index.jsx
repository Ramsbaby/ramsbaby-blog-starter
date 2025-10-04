import React, { useCallback, useState, lazy, Suspense } from 'react'
const ReactDisqusComments = lazy(() => import('react-disqus-comments'))

export const Disqus = ({ post, shortName, siteUrl, slug }) => {
  const [toasts, setToasts] = useState([])

  const notifyAboutComment = useCallback(() => {
    setToasts(prev => [...prev, { text: 'New comment available!!' }])
  }, [])

  const url = siteUrl + slug

  return (
    <Suspense fallback={null}>
      <ReactDisqusComments
        shortname={shortName}
        identifier={post.frontmatter.title}
        title={post.frontmatter.title}
        url={url}
        category_id={post.frontmatter.category_id}
        onNewComment={notifyAboutComment}
      />
    </Suspense>
  )
}
