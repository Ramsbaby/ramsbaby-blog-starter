/*eslint-disable*/
import React, { useContext, useMemo } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import {
  NavLink,
  Redirect,
  Switch,
  BrowserRouter as Router,
} from 'react-router-dom'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Icon from '@material-ui/core/Icon'
// core components
import AdminNavbarLinks from '../../components/Navbars/AdminNavbarLinks.js'
import RTLNavbarLinks from '../../components/Navbars/RTLNavbarLinks.js'

import { graphql, StaticQuery } from 'gatsby'

import styles from '../../assets/jss/material-dashboard-react/components/sidebarStyle.js'

import { GoogleLogin, GoogleLogout } from 'react-google-login'
import GlAuthContext from '../../../../contexts/googleLoginAuth.js'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const useStyles = makeStyles(styles)

export default function Sidebar(props) {
  const classes = useStyles()
  const [tc, setTC] = React.useState(false)
  const [popupopen, setOpen] = React.useState(false)

  const { state, actions } = useContext(GlAuthContext)

  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    let returnValue = false
    if (typeof window !== 'undefined') {
      if (window.location.href.indexOf(routeName) > -1) returnValue = true
    }
    return returnValue
  }
  const { color, logo, image, logoText, routes } = props
  var links = (
    <List className={classes.list}>
      {routes.map((prop, key) => {
        var activePro = ' '
        var listItemClasses
        if (prop.path === '/upgrade-to-pro') {
          activePro = classes.activePro + ' '
          listItemClasses = classNames({
            [' ' + classes[color]]: true,
          })
        } else {
          listItemClasses = classNames({
            [' ' + classes[color]]: activeRoute(prop.layout + prop.path),
          })
        }
        const whiteFontClasses = classNames({
          [' ' + classes.whiteFont]: activeRoute(prop.layout + prop.path),
        })
        return (
          <NavLink
            to={prop.layout + prop.path}
            className={activePro + classes.item}
            activeClassName="active"
            key={key}
          >
            <ListItem button className={classes.itemLink + listItemClasses}>
              {typeof prop.icon === 'string' ? (
                <Icon
                  className={classNames(classes.itemIcon, whiteFontClasses, {
                    [classes.itemIconRTL]: props.rtlActive,
                  })}
                >
                  {prop.icon}
                </Icon>
              ) : (
                <prop.icon
                  className={classNames(classes.itemIcon, whiteFontClasses, {
                    [classes.itemIconRTL]: props.rtlActive,
                  })}
                />
              )}
              <ListItemText
                primary={props.rtlActive ? prop.rtlName : prop.name}
                className={classNames(classes.itemText, whiteFontClasses, {
                  [classes.itemTextRTL]: props.rtlActive,
                })}
                disableTypography={true}
              />
            </ListItem>
          </NavLink>
        )
      })}
    </List>
  )

  var brand = (
    <div className={classes.logo}>
      <a
        className={classNames(classes.logoLink, {
          [classes.logoLinkRTL]: props.rtlActive,
        })}
        target="_blank"
      >
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
        {logoText}
      </a>
    </div>
  )

  const responseGoogle = () => {
    queryReports()
  }

  var VIEW_ID = '229844781'

  const queryReports = function() {
    console.log(gapi)

    gapi.client
      .request({
        path: '/v4/reports:batchGet',
        root: 'https://analyticsreporting.googleapis.com/',
        method: 'POST',
        body: {
          reportRequests: [
            {
              viewId: VIEW_ID,
              dateRanges: [
                {
                  startDate: '2020-01-01',
                  endDate: 'today',
                },
              ],
              metrics: [
                { expression: 'ga:users' },
                { expression: 'ga:pageviews' },
                { expression: 'ga:sessions' },
              ],
            },
          ],
        },
      })
      .then(displayResults, console.error.bind(console))
  }

  const displayResults = function(response) {
    var formattedJson = JSON.stringify(response.result, null, 2)
    actions.setLoginCheck(true)
    setOpen(true)

    const resultData = response.result.reports[0].data.totals[0].values
    //받아온 DATA context 전역변수에 할당.
    actions.setUsers(resultData[0])
    actions.setPageviews(resultData[1])
    actions.setSessions(resultData[2])
    // document.getElementById('query-output').value = formattedJson
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  gapi.load('auth2', function() {
    var gauth = gapi.auth2.init({
      client_id: state.gci,
    })
    var isLogined = gauth.isSignedIn.get()

    gauth.then(
      function() {
        console.log('init success')
        console.log(isLogined)
      },
      function() {
        console.error('init fail')
      },
    )
  })

  return (
    <StaticQuery
      query={gciQuery}
      render={data => {
        actions.setGci(data.site.siteMetadata.gci)
        const gci = data.site.siteMetadata.gci

        return (
          <div>
            <Hidden mdUp implementation="css">
              <Drawer
                variant="temporary"
                anchor={props.rtlActive ? 'left' : 'right'}
                open={props.open}
                classes={{
                  paper: classNames(classes.drawerPaper, {
                    [classes.drawerPaperRTL]: props.rtlActive,
                  }),
                }}
                onClose={props.handleDrawerToggle}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
              >
                {brand}
                <div className={classes.sidebarWrapper}>
                  {props.rtlActive ? <RTLNavbarLinks /> : <AdminNavbarLinks />}
                  {links}
                </div>
                {image !== undefined ? (
                  <div
                    className={classes.background}
                    style={{ backgroundImage: 'url(' + image + ')' }}
                  />
                ) : null}
              </Drawer>
            </Hidden>
            <Hidden smDown implementation="css">
              <Drawer
                anchor={props.rtlActive ? 'right' : 'left'}
                variant="permanent"
                open
                classes={{
                  paper: classNames(classes.drawerPaper, {
                    [classes.drawerPaperRTL]: props.rtlActive,
                  }),
                }}
              >
                {brand}

                <div className={classes.sidebarWrapper}>
                  <GoogleLogin
                    clientId={gci}
                    buttonText="Google Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                  />
                  {/* <GoogleLogout
              clientId="1075573877493-gh02u2kgns67o6rjttfvaj2q7t24olfr.apps.googleusercontent.com"
              buttonText="Logout"
              // onLogoutSuccess={logout}
            >
            </GoogleLogout> */}
                  {links}
                </div>
                {image !== undefined ? (
                  <div
                    className={classes.background}
                    style={{ backgroundImage: 'url(' + image + ')' }}
                  />
                ) : null}
              </Drawer>
            </Hidden>
            <Dialog
              open={popupopen}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  구글로그인에 성공하였습니다.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
                  확인
                </Button>
              </DialogActions>
            </Dialog>
            {popupopen === true ? (
              <Redirect push to="/setup/dashboard" />
            ) : null}
          </div>
        )
      }}
    />
  )
}

Sidebar.propTypes = {
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf(['purple', 'blue', 'green', 'orange', 'red']),
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool,
}

export const gciQuery = graphql`
  query {
    site {
      siteMetadata {
        gci
      }
    }
  }
`
