import './index.scss'

import React, { useEffect, useState } from 'react'
import { graphql } from 'gatsby'

import * as Elements from '../components/elements'
import { Layout } from '../layout'
import { Head } from '../components/head'
import { PostTitle } from '../components/post-title'
import { PostDate } from '../components/post-date'
import { PostContainer } from '../components/post-container'
import { SocialShare } from '../components/social-share'
import { SponsorButton } from '../components/sponsor-button'
import { Bio } from '../components/bio'
import { PostNavigator } from '../components/post-navigator'
import { Disqus } from '../components/disqus'
import { Utterances } from '../components/utterances'
import { Link } from 'gatsby'
import { Giscus } from '../components/giscus'
import Helmet from 'react-helmet'
import * as ScrollManager from '../utils/scroll'
import RelatedByTags from './related-by-tags'
import kebabCase from 'lodash/kebabCase'
import { rhythm } from '../utils/typography'

import '../styles/code.scss'
// import 'katex/dist/katex.min.css' // katex 플러그인 제거로 CSS import 비활성화

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const [currentHeaderUrl, setCurrentHeaderUrl] = useState(undefined)
  useEffect(() => {
    const handleScroll = () => {
      let aboveHeaderUrl
      const currentOffsetY = window.pageYOffset
      const headerElements = document.querySelectorAll('.anchor-header')
      for (const elem of headerElements) {
        const { top } = elem.getBoundingClientRect()
        const elemTop = top + currentOffsetY
        const isLast = elem === headerElements[headerElements.length - 1]
        if (currentOffsetY < elemTop - HEADER_OFFSET_Y) {
          aboveHeaderUrl &&
            setCurrentHeaderUrl(aboveHeaderUrl.split(location.origin)[1])
          !aboveHeaderUrl && setCurrentHeaderUrl(undefined)
          break
        } else {
          isLast && setCurrentHeaderUrl(elem.href.split(location.origin)[1])
          !isLast && (aboveHeaderUrl = elem.href)
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    ScrollManager.init()
    return () => {
      ScrollManager.destroy()
    }
  }, [])

  const post = data.markdownRemark
  const metaData = data.site.siteMetadata
  const { title, comment, siteUrl, author, sponsor } = metaData
  const { disqusShortName, utterances, provider, giscus } = comment
  const { title: postTitle, date } = post.frontmatter
  const regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g

  const tableOfContents = (
    <ul className="post-single__table_of_contents-list">
      {post &&
        post.headings.map(header => (
          <li
            className="post-single__table_of_contents-list-item"
            key={header.value}
            style={{ paddingLeft: `${header.depth - 1}rem` }}
          >
            <Link
              to={`${location.pathname}#${encodeURI(
                kebabCase(header.value.replace(regex, ''))
              )}`}
              className={
                currentHeaderUrl ==
                `${location.pathname}#${encodeURI(
                  kebabCase(header.value.replace(regex, ''))
                )}`
                  ? 'isCurrent'
                  : ''
              }
            >
              {header.value}
            </Link>
          </li>
        ))}
    </ul>
  )

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}${pageContext.slug}`,
    },
    headline: postTitle,
    author: { '@type': 'Person', name: author },
    publisher: { '@type': 'Organization', name: author },
    datePublished: date,
    dateModified: date,
    description: post.excerpt,
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Post',
        item: `${siteUrl}${pageContext.slug}`,
      },
    ],
  }

  return (
    <Layout location={location} title={title} siteMetadata={metaData}>
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(30),
          padding: `${rhythm(1.5)} ${rhythm(0.75)}`,
        }}
      >
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
          <script type="application/ld+json">
            {JSON.stringify(breadcrumbLd)}
          </script>
        </Helmet>
        <Head title={postTitle} description={post.excerpt} />
        <PostTitle title={postTitle} />
        <PostDate date={date} timeToRead={post.timeToRead} />
        <div className="post-single__table_of_contents">{tableOfContents}</div>
        <PostContainer html={post.html} />
        <section
          className="related-posts"
          aria-label="Related posts"
          style={{ marginTop: 24 }}
        >
          <RelatedByTags
            currentSlug={pageContext.slug}
            tags={post.frontmatter.tags || []}
          />
        </section>
        <SocialShare title={postTitle} author={author} />
        {!!sponsor.buyMeACoffeeId && (
          <SponsorButton sponsorId={sponsor.buyMeACoffeeId} />
        )}
        <Elements.Hr />
        <Bio />
        <PostNavigator pageContext={pageContext} />
        {provider === 'giscus' && <Giscus config={giscus} />}
        {provider === 'utterances' && !!utterances && (
          <Utterances repo={utterances} />
        )}
        {provider === 'disqus' && !!disqusShortName && (
          <Disqus
            post={post}
            shortName={disqusShortName}
            siteUrl={siteUrl}
            slug={pageContext.slug}
          />
        )}
      </div>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        siteUrl
        social {
          github
        }
        comment {
          disqusShortName
          utterances
        }
        sponsor {
          buyMeACoffeeId
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 280)
      html
      timeToRead
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD HH:mm:ss")
        tags
      }
      headings {
        value
        depth
      }
    }
  }
`

const HEADER_OFFSET_Y = 100
