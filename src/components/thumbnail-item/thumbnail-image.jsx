import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

export const ThumbnailImage = ({ path, style, priority = false }) => {
  const data = useStaticQuery(graphql`
    query ThumbnailImagesQuery {
      allFile(filter: { sourceInstanceName: { eq: "thumbnails" } }) {
        nodes {
          relativePath
          childImageSharp {
            gatsbyImageData(
              width: 300
              height: 150
              layout: FIXED
              placeholder: BLURRED
              transformOptions: { fit: COVER, cropFocus: CENTER }
            )
          }
        }
      }
    }
  `)

  const normalizePath = input => {
    if (!input) return ''
    let p = input.replace(/\\/g, '/').replace(/^\//, '')
    // remove common prefixes so it matches sourceInstanceName "thumbnails" relativePath
    p = p.replace(/^static\//, '')
    p = p.replace(/^thumbnail-images\//, '')
    return p
  }

  const normalized = normalizePath(path)
  let match = data.allFile.nodes.find(
    n => n.relativePath.replace(/\\/g, '/') === normalized
  )
  if (!match) {
    const target = normalized.toLowerCase()
    match = data.allFile.nodes.find(
      n => n.relativePath.replace(/\\/g, '/').toLowerCase() === target
    )
  }
  // Fallback: if still not found, try filename-only match (handles moved directories)
  if (!match && normalized) {
    const filename = normalized.split('/').pop()
    match = data.allFile.nodes.find(n =>
      n.relativePath
        .replace(/\\/g, '/')
        .toLowerCase()
        .endsWith(filename.toLowerCase())
    )
  }
  const img =
    match && match.childImageSharp ? getImage(match.childImageSharp) : null

  return (
    <div style={path ? style : null}>
      {img ? (
        <GatsbyImage
          image={img}
          alt="thumbnail"
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          imgStyle={{ objectFit: 'cover', objectPosition: '50% 50%' }}
        />
      ) : normalized ? (
        <img
          src={
            match
              ? `/thumbnail-images/${match.relativePath}`
              : `/thumbnail-images/${normalized}`
          }
          alt="thumbnail"
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          style={{
            width: '300px',
            height: '150px',
            objectFit: 'cover',
            objectPosition: '50% 50%',
          }}
        />
      ) : null}
    </div>
  )
}
