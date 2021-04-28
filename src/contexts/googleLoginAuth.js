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
    users: '',
    pageviews: '',
    sessions: '',
    gci: '',
  },
  actions: {
    setLoginCheck: () => {},
    setUsers: () => {},
    setPageviews: () => {},
    setSessions: () => {},
    setGci: () => {},
    goToDashboard: loginCheck => {
      alert(loginCheck)
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
                if (prop.layout === '/manage') {
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
  const [users, setUsers] = useState('')
  const [pageviews, setPageviews] = useState('')
  const [sessions, setSessions] = useState('')
  const [gci, setGci] = useState('')
  const [loginVal, dispatch] = useReducer(reducer, false)

  const value = {
    state: { loginCheck, users, pageviews, sessions, gci },
    actions: {
      setLoginCheck,
      setUsers,
      setPageviews,
      setSessions,
      setGci,
      dispatch,
    },
  }

  return (
    <GlAuthContext.Provider value={value}>{children}</GlAuthContext.Provider>
  )
}

const GlAuthConsumer = GlAuthContext.Consumer

export { GlAuthProvider, GlAuthConsumer }

export default GlAuthContext
