const path = require(`path`)
const fs = require('fs')
const { createFilePath } = require(`gatsby-source-filesystem`)
const React = require('react')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve(`./src/templates/blog-post.js`)

  // Removed backdoor pages configuration

  return graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          nodes {
            fields {
              slug
            }
            frontmatter {
              title
              category
              draft
              tags
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.nodes.filter(
      node => !node.frontmatter.draft && !!node.frontmatter.category
    )

    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1]
      const next = index === 0 ? null : posts[index - 1]

      createPage({
        path: post.fields.slug,
        component: blogPostTemplate,
        context: {
          slug: post.fields.slug,
          previous,
          next,
        },
      })
    })
  })
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter : Frontmatter
    }
    type Frontmatter {
      thumbnail : String!
    }
  `

  createTypes(typeDefs)
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

// Generate Open Graph images after the site is built
exports.onPostBuild = async ({ graphql, reporter }) => {
  try {
    const satoriModule = await import('satori')
    const satori = satoriModule.default || satoriModule
    const yogaModule = await import('yoga-wasm-web')
    const initYoga = yogaModule.default || yogaModule
    const yogaWasmPath = require.resolve('yoga-wasm-web/dist/yoga.wasm')
    const yogaBinary = await fs.promises.readFile(yogaWasmPath)
    const yoga = await initYoga(yogaBinary)
    const resvgModule = await import('@resvg/resvg-js')
    const Resvg = resvgModule.Resvg || resvgModule.default

    const result = await graphql(`
      {
        site {
          siteMetadata {
            title
            siteUrl
          }
        }
        allMarkdownRemark(limit: 1000) {
          nodes {
            fields {
              slug
            }
            frontmatter {
              title
              draft
            }
          }
        }
      }
    `)

    if (result.errors) {
      reporter.warn('OG 이미지용 GraphQL 쿼리 에러')
      throw result.errors
    }

    const siteTitle = result?.data?.site?.siteMetadata?.title || ''
    const posts = (result?.data?.allMarkdownRemark?.nodes || []).filter(
      n => !n.frontmatter?.draft
    )

    const ogDir = path.join(process.cwd(), 'public', 'og')
    await fs.promises.mkdir(ogDir, { recursive: true })

    // Load Noto Sans KR font from installed package
    async function loadNotoFonts() {
      try {
        const pkgDir = path.dirname(
          require.resolve('typeface-noto-sans-kr/package.json')
        )
        const filesDir = path.join(pkgDir, 'files')
        const files = await fs.promises.readdir(filesDir)

        const pick = matcher =>
          files.find(f => matcher.test(f)) ||
          files.find(f => /\.(woff2|woff|ttf|otf)$/i.test(f))

        const regular = pick(/(400|regular)\.(woff2|woff|ttf|otf)$/i)
        const bold = pick(/(700|bold)\.(woff2|woff|ttf|otf)$/i)

        const fonts = []
        if (regular) {
          fonts.push({
            name: 'NotoSansKR',
            data: await fs.promises.readFile(path.join(filesDir, regular)),
            weight: 400,
            style: 'normal',
          })
        }
        if (bold) {
          fonts.push({
            name: 'NotoSansKR',
            data: await fs.promises.readFile(path.join(filesDir, bold)),
            weight: 700,
            style: 'normal',
          })
        }
        return fonts
      } catch (e) {
        reporter.warn(`NotoSansKR 폰트 로드 실패: ${e.message}`)
        return []
      }
    }

    const fonts = await loadNotoFonts()

    function normalizeSlugToFile(slug) {
      const clean = (slug || '').replace(/^\/+|\/+$/g, '')
      return (clean ? clean.replace(/\/+|\s+/g, '_') : 'home') + '.png'
    }

    function OgComponent({ title }) {
      return React.createElement(
        'div',
        {
          style: {
            width: '1200px',
            height: '630px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '56px',
            background: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
            color: '#e5e7eb',
            fontFamily: 'NotoSansKR, sans-serif',
          },
        },
        [
          React.createElement(
            'div',
            { key: 'brand', style: { fontSize: '28px', opacity: 0.9 } },
            siteTitle
          ),
          React.createElement(
            'div',
            {
              key: 'title',
              style: {
                fontSize: '66px',
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                whiteSpace: 'pre-wrap',
              },
            },
            title
          ),
          React.createElement(
            'div',
            {
              key: 'footer',
              style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '22px',
                opacity: 0.7,
              },
            },
            React.createElement('div', null, 'ramsbaby.blog')
          ),
        ]
      )
    }

    for (const post of posts) {
      const fileName = normalizeSlugToFile(post.fields.slug)
      const outPath = path.join(ogDir, fileName)
      try {
        const svg = await satori(
          React.createElement(OgComponent, { title: post.frontmatter.title }),
          {
            width: 1200,
            height: 630,
            fonts,
            yoga,
          }
        )
        const r = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } })
        const png = r.render().asPng()
        await fs.promises.writeFile(outPath, png)
        reporter.info(`OG 이미지 생성: ${fileName}`)
      } catch (e) {
        reporter.warn(`OG 이미지 생성 실패(${post.fields.slug}): ${e.message}`)
      }
    }
  } catch (e) {
    // Do not fail the build for OG generation errors
    console.warn(
      'OG 이미지 생성 과정에서 오류가 발생했지만 빌드를 계속합니다.',
      e
    )
  }
}

// exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
//   const adminPage = path.resolve(`./src/pages/admin.js`)

//   if (stage === 'build-html' || stage === 'develop-html') {
//     actions.setWebpackConfig({
//       module: {
//         rules: [
//           {
//             test: adminPage,
//             use: [loaders.null(), ],
//           },
//         ],
//       },
//     })
//   }
// }
