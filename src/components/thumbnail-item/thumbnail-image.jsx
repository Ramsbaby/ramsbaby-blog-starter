import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

export const ThumbnailImage = ({ path, style }) => {
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
            )
          }
        }
      }
    }
  `)

  const normalizePath = input => {
    if (!input) return ''
    let p = input.replace(/\\/g, '/').replace(/^\//, '')
    p = p.replace(/^static\//, '')
    return p
  }

  const normalized = normalizePath(path)
  const match = data.allFile.nodes.find(
    n => n.relativePath.replace(/\\/g, '/') === normalized
  )
  const img = match ? getImage(match.childImageSharp) : null

  return (
    <div style={path ? style : null}>
      {img ? (
        <GatsbyImage image={img} alt="thumbnail" />
      ) : normalized ? (
        <img src={`/${normalized}`} alt="thumbnail" />
      ) : null}
    </div>
  )
}
