import React, { useContext, useMemo } from 'react'
// react plugin for creating charts
import ChartistGraph from 'react-chartist'
// @material-ui/core
import { makeStyles } from '@material-ui/core/styles'
import Icon from '@material-ui/core/Icon'
// @material-ui/icons
import Store from '@material-ui/icons/Store'
import Warning from '@material-ui/icons/Warning'
import DateRange from '@material-ui/icons/DateRange'
import LocalOffer from '@material-ui/icons/LocalOffer'
import Update from '@material-ui/icons/Update'
import ArrowUpward from '@material-ui/icons/ArrowUpward'
import AccessTime from '@material-ui/icons/AccessTime'
import Accessibility from '@material-ui/icons/Accessibility'
import BugReport from '@material-ui/icons/BugReport'
import Code from '@material-ui/icons/Code'
import Cloud from '@material-ui/icons/Cloud'
// core components
import GridItem from '../../components/Grid/GridItem.js'
import GridContainer from '../../components/Grid/GridContainer.js'
import Table from '../../components/Table/Table.js'
import Tasks from '../../components/Tasks/Tasks.js'
import CustomTabs from '../../components/CustomTabs/CustomTabs.js'
import Danger from '../../components/Typography/Danger.js'
import Card from '../../components/Card/Card.js'
import CardHeader from '../../components/Card/CardHeader.js'
import CardIcon from '../../components/Card/CardIcon.js'
import CardBody from '../../components/Card/CardBody.js'
import CardFooter from '../../components/Card/CardFooter.js'
import GlAuthContext from '../../../../contexts/googleLoginAuth.js'

import { bugs, website, server } from '../../variables/general.js'

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from '../../variables/charts.js'

import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle.js'

const useStyles = makeStyles(styles)

export default function Dashboard() {
  const classes = useStyles()
  const { state } = useContext(GlAuthContext)
  let testState = state.loginCheck

  const getLoginCheck = () => {
    testState = state.loginCheck
  }

  const setDashboard = useMemo(() => {
    getLoginCheck()
  }, [state.loginCheck])

  const gridItem = (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>용량</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Used Space</p>
              <h3 className={classes.cardTitle}>
                49/50 <small>GB</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                  <Warning />
                </Danger>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  Get more space
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Revenue</p>
              <h3 className={classes.cardTitle}>$34,245</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>FORK</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Fixed Issues</p>
              <h3 className={classes.cardTitle}>75</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                Tracked from Github
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Followers</p>
              <h3 className={classes.cardTitle}>+245</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  )

  return testState === true && <div>{gridItem}</div>
}
