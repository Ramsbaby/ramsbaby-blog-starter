// @flow
import React from 'react'
import * as styles from './Sidebar.module.scss'

const Sidebar = props => {
  return (
    <nav className={styles['sidebar']} aria-label="사이드바 내비게이션">
      <div className={styles['sidebar__inner']}>{props.children}</div>
    </nav>
  )
}

export default Sidebar
