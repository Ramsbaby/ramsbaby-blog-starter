import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql, Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import './index.scss'

export const Bio = () => (
  <StaticQuery
    query={bioQuery}
    render={data => {
      const { author, social, introduction, othersite } = data.site.siteMetadata

      return (
        <div className="bio">
          <div className="author">
            <div className="author-description">
              <GatsbyImage
                className="author-image"
                image={getImage(data.avatar.childImageSharp)}
                alt={author}
                style={{
                  borderRadius: `100%`,
                }}
              />
              <div className="author-name">
                <span className="author-name-prefix">Written by</span>
                <Link to={social.portfolio} className="author-name-content">
                  <span>{author}</span>
                </Link>
                <div className="author-introduction">{introduction}</div>
                <p className="author-socials">
                  {othersite.map((val, idx) => (
                    <a href={val.url} key={`othersite_a_tag_` + idx}>
                      {`#` + val.name}
                    </a>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    }}
  />
)

Bio.propTypes = {}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile.png/" }) {
      childImageSharp {
        gatsbyImageData(
          width: 72
          height: 72
          layout: FIXED
          placeholder: BLURRED
        )
      }
    }
    site {
      siteMetadata {
        author
        introduction
        social {
          github
          portfolio
        }
        othersite {
          name
          url
        }
      }
    }
  }
`

export default Bio
