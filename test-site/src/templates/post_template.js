import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'

const PostTemplate = ({ data }) => {
  // extract the contents from data
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark

  // return the component layout
  return (
    <Layout>
      <h1>{ frontmatter.title }</h1>
      <h3>{ frontmatter.author } | {frontmatter.date}</h3>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  )
}

export default PostTemplate

export const postDataQuery = graphql`
query postDataQuery($path: String!) {
  markdownRemark(frontmatter: {slug: {eq: $path}}) {
    html
    frontmatter {
      title
      author
      date
    }
  }
}
`
