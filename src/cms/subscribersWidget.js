import React from 'react'
import CMS from 'netlify-cms-app'

const SubscribersControl = () => {
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const url = origin + '/admin/subscribers'
  const style = {
    width: '100%',
    minHeight: '70vh',
    border: 0,
    background: 'transparent',
  }

  return (
    <div style={{ padding: '8px 0' }}>
      <iframe title="Subscribers" src={url} style={style} />
    </div>
  )
}

CMS.registerWidget('subscribers', SubscribersControl, () => null)
