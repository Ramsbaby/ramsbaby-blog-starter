import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'

export const RelatedByTags = ({ currentSlug, tags }) => {
  if (!tags || tags.length === 0) return null
  return (
    <StaticQuery
      query={graphql`
        query RelatedPostsQuery {
          allMarkdownRemark(
            limit: 1000
            sort: { frontmatter: { date: DESC } }
          ) {
            edges {
              node {
                fields {
                  slug
                }
                frontmatter {
                  title
                  tags
                }
                excerpt(pruneLength: 120)
              }
            }
          }
        }
      `}
      render={data => {
        const related = data.allMarkdownRemark.edges
          .map(e => e.node)
          .filter(n => n.fields.slug !== currentSlug)
          .filter(
            n =>
              n.frontmatter.tags &&
              n.frontmatter.tags.some(t => tags.includes(t))
          )
          .slice(0, 4)
        if (related.length === 0) return null
        return (
          <div>
            <h3 style={{ margin: '16px 0' }}>Related posts</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {related.map(n => (
                <li key={n.fields.slug} style={{ marginBottom: 10 }}>
                  <Link to={n.fields.slug}>
                    <strong>{n.frontmatter.title}</strong>
                  </Link>
                  <p style={{ margin: '4px 0 0' }}>{n.excerpt}</p>
                </li>
              ))}
            </ul>
          </div>
        )
      }}
    />
  )
}

export default RelatedByTags
