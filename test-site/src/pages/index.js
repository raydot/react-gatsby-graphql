import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'

/*  THIS IS THE FUNCTION TO EXTRACT DATA
 *  Function to create list of <h1> elements with Post title
 *  @param {*} data
*/

function getPosts (data) {
  let posts = []
  let postsList = data.allMarkdownRemark.edges
  postsList.forEach(element => {
    let postData = element.node.frontmatter

    posts.push(
      <Link to={postData.slug}> <h1>{postData.title}</h1></Link>
    )
  })

  return posts
}

// This is a stateless react component
// The data passed into the component is the result
// of the GraphQL Query below:

const IndexPage = ({ data }) => (
  <Layout>
    { getPosts(data) }
  </Layout>
)

export default IndexPage

// THis is the aforementioned GraphQL query
export const postsQuery = graphql`
query postsQuery {
  allMarkdownRemark(
    sort: { fields: [frontmatter___date], order: DESC }
  ) {
      edges {
        node{
          frontmatter {
            slug
            title
          }
        }
      }
    }
  }
`
