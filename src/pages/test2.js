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
import Setup from '../utils/material-ui/views/Setup/setup.js'

// import '../utils/material-ui/assets/css/material-dashboard-react.css?v=1.9.0'

let hist = null
if (typeof window !== 'undefined') {
  hist = createBrowserHistory()
}

export default class HTML extends React.Component {
  render() {
    return typeof window !== 'undefined' ? (
      <Router history={createBrowserHistory()}>
        <Switch>
          <Route path="/setup" component={Setup} />
          <Redirect from="/" to="/setup" />
        </Switch>
      </Router>
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
