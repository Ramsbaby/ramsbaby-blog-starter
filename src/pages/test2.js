/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import { createBrowserHistory } from 'history'
import { Router, Route, Switch, Redirect } from 'react-router-dom'

// core components
import Admin from '../utils/material-ui/views/Admin/admin.js'

import '../utils/material-ui/assets/css/material-dashboard-react.css?v=1.9.0'

let hist = null
if (typeof window !== 'undefined') {
  hist = createBrowserHistory()
}

// const child =
//   typeof window !== 'undefined' ? (
//     <html style={{ overflow: 'hidden' }}>
//       <head>
//         <meta
//           name="google-signin-client_id"
//           content="1075573877493-1f6ev81d3v2aq4caf22qv3e9h9s78d9i.apps.googleusercontent.com"
//         />
//         <meta
//           name="google-signin-scope"
//           content="https://www.googleapis.com/auth/analytics.readonly"
//         />

//         {/* <!-- Load the JavaScript API client and Sign-in library. --> */}
//         <script src="https://apis.google.com/js/client:platform.js"></script>
//       </head>
//       <body>
//         <Router history={createBrowserHistory()}>
//           <Switch>
//             <Route path="/admin" component={Admin} />
//             <Redirect from="/" to="/admin" />
//           </Switch>
//         </Router>
//       </body>
//     </html>
//   ) : (
//     <div></div>
//   )

// export default ({ data }) => {
//   return child
// }

export default class HTML extends React.Component {
  render() {
    return typeof window !== 'undefined' ? (
      <html style={{ overflow: 'hidden' }}>
        <head>
          <meta
            name="google-signin-client_id"
            content="1075573877493-1f6ev81d3v2aq4caf22qv3e9h9s78d9i.apps.googleusercontent.com"
          />
          <meta
            name="google-signin-scope"
            content="https://www.googleapis.com/auth/analytics.readonly"
          />

          {/* <!-- Load the JavaScript API client and Sign-in library. --> */}
          <script src="https://apis.google.com/js/client:platform.js"></script>
        </head>
        <body>
          <Router history={createBrowserHistory()}>
            <Switch>
              <Route path="/admin" component={Admin} />
              <Redirect from="/" to="/admin" />
            </Switch>
          </Router>
        </body>
      </html>
    ) : (
      <div></div>
    )
  }
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
