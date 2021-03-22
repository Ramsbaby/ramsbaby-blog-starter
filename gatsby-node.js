const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve(`./src/templates/blog-post.js`)
  const adminPage = path.resolve(`./src/pages/admin.js`)
  const dashboardPage = path.resolve(`./src/utils/material-ui/views/test2.js`)

  return graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
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
      }
    `,
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges.filter(
      ({ node }) => !node.frontmatter.draft && !!node.frontmatter.category,
    )

    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      createPage({
        path: post.node.fields.slug,
        component: blogPostTemplate,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })

    // route로 admin/dashboard 로 path 변경 후 새로고침 문제 방지 -> admin/dashboard 페이지를 미리 만들어 놓음
    // createPage({
    //   path: `/admin/dashboard`,
    //   component: adminPage,
    //   context: {
    //     slug: `/admin/dashboard`,
    //   },
    // })

    //route로 admin/dashboard 로 path 변경 후 새로고침 문제 방지 -> admin/dashboard 페이지를 미리 만들어 놓음
    // createPage({
    //   path: `/admin/dashboard`,
    //   component: dashboardPage,
    //   context: {
    //     slug: `/admin/dashboard`,
    //   },
    // })
    createPage({
      path: 'test',
      component: testPage,
      context: {
        slug: 'test',
      },
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
