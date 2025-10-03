import React from 'react'
import { graphql } from 'gatsby'

import { Layout } from '../layout'
import { Head } from '../components/head'

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle} siteMetadata={data.site.siteMetadata}>
      <Head title="404: Not Found" />
      <h1>Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        social {
          github
        }
      }
    }
  }
`
