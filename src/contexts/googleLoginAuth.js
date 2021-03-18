import React, { createContext, useState, useReducer } from 'react'
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router,
} from 'react-router-dom'

const GlAuthContext = createContext({
  state: {
    loginCheck: false,
  },
  actions: {
    setLoginCheck: () => {},
    goToDashboard: loginCheck => {
      alert(loginCheck)

      //   <Router>
      //     <Switch>
      //       {loginCheck === true ? <Redirect from="/admin" to="/admin/dashboard" /> : null}
      //     </Switch>
      // </Router>
    },
  },
})

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      console.log(GlAuthProvider.loginCheck)
      alert(state)
      return (
        <Router>
          {state === true
            ? routes.map((prop, key) => {
                console.log(prop)
                console.log(key)
                if (prop.layout === '/admin') {
                  return (
                    <Route
                      path={prop.layout + prop.path}
                      component={prop.component}
                      key={key}
                    />
                  )
                }
                return null
              })
            : null}
        </Router>
      )
  }
}

const GlAuthProvider = ({ children }) => {
  const [loginCheck, setLoginCheck] = useState('false')
  const [loginVal, dispatch] = useReducer(reducer, false)

  // const goToDashboard = (loginCheck) => {
  //   <Router>
  //     <Switch>
  //       {loginCheck === true ? <Redirect from="/admin" to="/admin/dashboard" /> : null}
  //     </Switch>
  // </Router>
  // }

  const value = {
    state: { loginCheck },
    actions: { setLoginCheck, dispatch },
  }

  return (
    <GlAuthContext.Provider value={value}>{children}</GlAuthContext.Provider>
  )
}

const GlAuthConsumer = GlAuthContext.Consumer

export { GlAuthProvider, GlAuthConsumer }

export default GlAuthContext
