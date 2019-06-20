/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

// FROM THE TUT!  SEE THE README FOR MORE!
const path = require('path')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const PostTemplate = path.resolve(`src/templates/post_template.js`)

  return graphql(`
  {
    allMarkdownRemark(
      limit: 100,
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          frontmatter {
            slug
          }
        }
      }
    }
  }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.slug,
        component: PostTemplate
      })
    })
  })
}
