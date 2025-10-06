import React from 'react'
import { Link } from 'gatsby'
import { TARGET_CLASS } from '../../utils/visible'
import { ThumbnailImage } from './thumbnail-image'
import { TagItem } from './tag-item'
// import imgA from './content/blog/React.js/images/spring_node_react_env.png';
import { useEffect, useState } from 'react'

import './index.scss'

export const ThumbnailItem = ({
  node,
  imagePath,
  highlightWord,
  priority = false,
}) => {
  return (
    <Link
      className={`thumbnail ${TARGET_CLASS}`}
      to={node.fields.slug}
      aria-label={`포스트로 이동: ${node.frontmatter.title}`}
    >
      <div key={node.fields.slug}>
        <TagItem tags={node.frontmatter.tags}></TagItem>
        <h3>{node.frontmatter.title || node.fields.slug}</h3>
        <div className="thumbnail-row">
          <div className="thumbnail-media">
            <ThumbnailImage
              path={imagePath}
              priority={priority}
            ></ThumbnailImage>
          </div>
          <div className="thumbnail-excerpt">
            <p
              dangerouslySetInnerHTML={{
                __html:
                  highlightWord && highlightWord.trim().length > 0
                    ? node.excerpt.replace(
                        new RegExp(
                          highlightWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
                          'gi'
                        ),
                        match => `<mark>${match}</mark>`
                      )
                    : node.excerpt,
              }}
            />
          </div>
        </div>
      </div>
    </Link>
  )
}
