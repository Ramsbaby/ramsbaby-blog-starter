import React, { useMemo } from 'react'
import { ThumbnailContainer } from '../thumbnail-container'
import { ThumbnailItem } from '../thumbnail-item'
import { CATEGORY_TYPE } from '../../constants'

type PostEdge = {
  node: {
    html: string
    frontmatter: { category: string; tags: string[]; thumbnail?: string }
  }
}

type ContentsProps = {
  posts: PostEdge[]
  countOfInitialPost: number
  count: number
  category: string
  searchWord: string
  clickTag: string
  exposureGb: 'SEARCH' | 'CATE' | 'TAG' | string
}

/**
 * 포스트 리스트 컨테이너. 카테고리/검색/태그 기준으로 포스트를 필터링합니다.
 */
export const Contents: React.FC<ContentsProps> = ({
  posts,
  countOfInitialPost,
  count,
  category,
  searchWord,
  clickTag,
  exposureGb,
}) => {
  const refinedPosts = useMemo(
    () =>
      posts
        .filter(({ node }) => {
          switch (exposureGb) {
            case 'SEARCH':
              return (
                node.html.toString().match(new RegExp(searchWord, 'i')) != null
              )
            case 'CATE':
              return (
                category === CATEGORY_TYPE.ALL ||
                node.frontmatter.category === category
              )
            case 'TAG':
              return node.frontmatter.tags.includes(clickTag)
            default:
              return category === CATEGORY_TYPE.ALL
          }
        })
        .slice(0, count * countOfInitialPost),
    [
      posts,
      count,
      countOfInitialPost,
      exposureGb,
      searchWord,
      category,
      clickTag,
    ]
  )

  return (
    <ThumbnailContainer>
      {refinedPosts.map(({ node }, index) => (
        <ThumbnailItem
          node={node as any}
          key={`item_${index}`}
          imagePath={node.frontmatter.thumbnail}
        />
      ))}
    </ThumbnailContainer>
  )
}

export default Contents
