import { graphql } from 'gatsby'
import _ from 'lodash'
import React, { useMemo, useContext, Suspense } from 'react'
import { Bio } from '../components/bio'
import { Category } from '../components/category'
import { Contents } from '../components/contents'
import { Head } from '../components/head'
import { useCategory } from '../hooks/useCategory'
import { useSearchWord } from '../hooks/useSearchWord'
import { useTag } from '../hooks/useTag'
import { useExposureGb } from '../hooks/useExposureGb'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { useRenderedCount } from '../hooks/useRenderedCount'
import { useScrollEvent } from '../hooks/useScrollEvent'
import { Layout } from '../layout'
import { Search } from '../components/search'
import { Tags } from '../components/tags'
import { Header } from '../components/header'
import { Newsletter } from '../components/newsletter'
const Sidebar = React.lazy(() => import('../components/Sidebar'))
import { rhythm } from '../utils/typography'
import Helmet from 'react-helmet'
import './index.scss'
// import Particles from 'react-particles' // TODO: Add back particles with react-particles

import * as Dom from '../utils/dom'
import * as EventManager from '../utils/event-manager'
import { Link } from 'gatsby'

const rootPath = `${__PATH_PREFIX__}/`

const BASE_LINE = 80

function getDistance(currentPos) {
  return Dom.getDocumentHeight() - currentPos
}

const HomePage = ({ data, location }) => {
  const { siteMetadata } = data.site
  const { countOfInitialPost } = siteMetadata.configs
  const posts = data.allMarkdownRemark.edges
  const categories = useMemo(
    () => _.uniq(posts.map(({ node }) => node.frontmatter.category)),
    []
  )
  const tags = data.tagsGroup.group

  const [count, countRef, increaseCount] = useRenderedCount()
  const [category, selectCategory] = useCategory()
  const [searchWord, inputSearchWord] = useSearchWord()
  const [clickTag, selectTag] = useTag()
  const [exposureGb, selectExposureGb] = useExposureGb()

  useIntersectionObserver()
  useScrollEvent(() => {
    const currentPos = window.scrollY + window.innerHeight
    const isTriggerPos = () => getDistance(currentPos) < BASE_LINE
    const doesNeedMore = () =>
      posts.length > countRef.current * countOfInitialPost

    return EventManager.toFit(increaseCount, {
      dismissCondition: () => !isTriggerPos(),
      triggerCondition: () => isTriggerPos() && doesNeedMore(),
    })()
  })

  // LCP 우선 이미지 프리로드: 초기 상단 노출 썸네일 추정 2개
  const preloadThumbs = posts
    .slice(0, 2)
    .map(({ node }) => node.frontmatter.thumbnail)
    .filter(Boolean)
    .map(p => {
      let s = p.replace(/\\/g, '/').replace(/^\//, '')
      s = s.replace(/^static\//, '')
      return '/' + s
    })

  const settingsNode = data.settings?.nodes?.[0]
  const newsletterProvider =
    settingsNode?.newsletterProvider ||
    process.env.GATSBY_NEWSLETTER_PROVIDER ||
    'buttondown'
  const newsletterAction =
    settingsNode?.newsletterAction ||
    process.env.GATSBY_BUTTONDOWN_ACTION ||
    process.env.GATSBY_MAILCHIMP_ACTION ||
    ''

  return (
    <Layout
      location={location}
      title={siteMetadata.title}
      siteMetadata={siteMetadata}
    >
      <div className="site-wrapper">
        {/* <Particles
          className="snow"
          focusable="true"
          aria-hidden=""
          params={{
            particles: {
              color: {
                value: '#FFE08C',
              },
              shape: {
                type: 'circle',
                stroke: {
                  width: 0,
                  color: '#000',
                },
                polygon: {
                  nb_sides: 5,
                },
                image: {
                  width: 100,
                  height: 100,
                },
              },
              number: {
                value: 200,
                density: {
                  enable: false,
                },
              },
              size: {
                value: 10,
                random: true,
              },
              move: {
                enable: true,
                speed: 1,
                direction: 'bottom',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
              },
              line_linked: {
                enable: false,
              },
            },
            interactivity: {
              events: {
                onclick: {
                  enable: true,
                  mode: 'remove',
                },
              },
              modes: {
                remove: {
                  particles_nb: 10,
                },
              },
            },
          }}
        ></Particles> */}
        <div>
          <div className={'sidebar-container'}>
            <div className={'sidebar'}>
              <Suspense fallback={null}>
                <Sidebar>
                  <p>Tag Collection</p>
                  <Tags
                    tags={tags}
                    selectTag={selectTag}
                    selectExposureGb={selectExposureGb}
                  />
                </Sidebar>
              </Suspense>
            </div>
          </div>
          <div className={'sidebar-container recently'}>
            <div className={'sidebar right'}>
              <Suspense fallback={null}>
                <Sidebar>
                  <p>Recently List</p>
                  {data.allMarkdownRemark.edges.slice(0, 5).map(({ node }) => (
                    <li
                      key={`recentlyList_` + node.frontmatter.title}
                      style={{ display: 'inline-block', width: '100%' }}
                    >
                      <Link to={node.fields.slug}>
                        {'·\t' + node.frontmatter.title}
                      </Link>
                    </li>
                  ))}
                  <Newsletter
                    provider={newsletterProvider}
                    actionUrl={newsletterAction}
                  />
                  <li style={{ listStyle: 'none', marginTop: '8px' }}>
                    <a href="/success/" style={{ opacity: 0.75 }}>
                      구독 안내/성공 페이지
                    </a>
                  </li>
                </Sidebar>
              </Suspense>
            </div>
          </div>
          <div
            style={{
              marginLeft: `auto`,
              marginRight: `auto`,
              maxWidth: rhythm(45),
              padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
            }}
          >
            <Helmet>
              {preloadThumbs.map(src => (
                <link key={src} rel="preload" as="image" href={src} />
              ))}
            </Helmet>
            <Header
              title={siteMetadata.title}
              location={location}
              rootPath={rootPath}
            />
            <Head
              title={siteMetadata.hometitle}
              keywords={siteMetadata.keywords}
            />
            <Bio />
            {/* Featured section */}
            <section
              aria-label="Featured posts"
              style={{ marginBottom: '24px' }}
            >
              <h2 style={{ fontSize: '20px', margin: '12px 0' }}>Featured</h2>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '12px',
                }}
              >
                {posts.slice(0, 2).map(({ node }, idx) => (
                  <Link
                    key={`featured_${node.fields.slug}`}
                    to={node.fields.slug}
                    style={{
                      display: 'block',
                      padding: '12px',
                      borderRadius: 8,
                      background: '#fff',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                    }}
                    aria-label={`포스트로 이동: ${node.frontmatter.title}`}
                  >
                    <strong>{node.frontmatter.title}</strong>
                    <p style={{ marginTop: 8 }}>{node.excerpt}</p>
                  </Link>
                ))}
              </div>
            </section>
            <Search
              inputSearchWord={inputSearchWord}
              selectExposureGb={selectExposureGb}
            />
            <Category
              categories={categories}
              category={category}
              selectCategory={selectCategory}
              selectExposureGb={selectExposureGb}
            />
            {/* 메인 영역에 노출하던 뉴스레터 폼은 사이드바로 이동 */}
            <Contents
              posts={posts}
              countOfInitialPost={countOfInitialPost}
              count={count}
              category={category}
              searchWord={searchWord}
              clickTag={clickTag}
              exposureGb={exposureGb}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default HomePage
export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        hometitle
        title
        social {
          github
        }
        configs {
          countOfInitialPost
        }
      }
    }
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { category: { ne: null }, draft: { eq: false } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 240, truncate: true)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "yyyy-MM-dd")
            title
            category
            draft
            tags
            thumbnail
          }
          html
        }
      }
    }
    tagsGroup: allMarkdownRemark(limit: 2000) {
      group(field: { frontmatter: { tags: SELECT } }) {
        fieldValue
        totalCount
      }
    }
    settings: allSettingsJson {
      nodes {
        newsletterProvider
        newsletterAction
      }
    }
  }
`
