import React from 'react'
import PropTypes from 'prop-types'

const HTML = ({ htmlAttributes, headComponents, bodyAttributes, preBodyComponents, body, postBodyComponents }) => {
  return (
    <html {...htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, minimum-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover"
        />
        <meta
          name="google-signin-scope"
          content="https://www.googleapis.com/auth/analytics.readonly"
        />
        <script src="https://apis.google.com/js/client:platform.js"></script>
        {headComponents}
      </head>
      <body {...bodyAttributes}>
        {preBodyComponents}
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div key={`body`} id="___gatsby" dangerouslySetInnerHTML={{ __html: body }} />
        {postBodyComponents}
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}

export default HTML
