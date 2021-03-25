import React, { useMemo, useContext } from 'react'
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router,
} from 'react-router-dom'
// creates a beautiful scrollbar
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
// core components
import Navbar from '../../components/Navbars/Navbar.js'
import Footer from '../../components/Footer/Footer.js'
import Sidebar from '../../components/Sidebar/Sidebar.js'
import FixedPlugin from '../../components/FixedPlugin/FixedPlugin.js'

import routes from '../routes.js'

import styles from '../../assets/jss/material-dashboard-react/layouts/adminStyle.js'

import bgImage from '../../assets/img/sidebar-2.jpg'
import logo from '../..//assets/img/reactlogo.png'
import '../../assets/css/material-dashboard-react.css?v=1.9.0'

import GlAuthContext, {
  GlAuthProvider,
} from '../../../../contexts/googleLoginAuth.js'

let ps

let auth = false

console.log(gapi)

const switchRoutes = (
  // alert(loginCheck)

  <Switch>
    {routes.map((prop, key) => {
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
    })}
    {/* {auth ? <Redirect from="/admin" to="/admin/dashboard" /> : null} */}
    {auth ? null : null}
  </Switch>
)

const useStyles = makeStyles(styles)

export default function admin({ ...rest }) {
  //context
  const { state, actions } = useContext(GlAuthContext)

  // useMemo(() => switchRoutes(state.loginCheck), [state.loginCheck])
  // styles
  const classes = useStyles()
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef()
  // states and functions
  const [image, setImage] = React.useState(bgImage)
  const [color, setColor] = React.useState('blue')
  const [fixedClasses, setFixedClasses] = React.useState('dropdown show')
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const handleImageClick = image => {
    setImage(image)
  }
  const handleColorClick = color => {
    setColor(color)
  }
  const handleFixedClick = () => {
    if (fixedClasses === 'dropdown') {
      setFixedClasses('dropdown show')
    } else {
      setFixedClasses('dropdown')
    }
  }
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  const getRoute = () => {
    let returnValue = false
    if (typeof window !== 'undefined') {
      returnValue = window.location.pathname !== '/admin/maps'
    }
    return returnValue
  }
  const resizeFunction = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 960) {
        setMobileOpen(false)
      }
    }
  }
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      })
      document.body.style.overflow = 'hidden'
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', resizeFunction)
    }
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf('Win') > -1) {
        ps.destroy()
      }
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', resizeFunction)
      }
    }
  }, [mainPanel])
  // console.log('here')
  // console.log(rest)
  return (
    <GlAuthProvider>
      <div className={classes.wrapper}>
        <Sidebar
          routes={routes}
          logoText={' Admin Page'}
          logo={logo}
          image={image}
          handleDrawerToggle={handleDrawerToggle}
          open={mobileOpen}
          color={color}
          {...rest}
        />

        <div className={classes.mainPanel} ref={mainPanel}>
          <Navbar
            routes={routes}
            handleDrawerToggle={handleDrawerToggle}
            {...rest}
          />
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
          {getRoute() ? <Footer /> : null}
          <FixedPlugin
            handleImageClick={handleImageClick}
            handleColorClick={handleColorClick}
            bgColor={color}
            bgImage={image}
            handleFixedClick={handleFixedClick}
            fixedClasses={fixedClasses}
          />
        </div>
      </div>
    </GlAuthProvider>
  )
}
