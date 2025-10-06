// custom typefaces
require('typeface-noto-sans-kr')
require('typeface-catamaran')

// polyfill
require('intersection-observer')

const metaConfig = require('./gatsby-meta-config')
const React = require('react')
const { Spinner } = require('./src/components/Loading/Spinner')

exports.onInitialClientRender = () => {
  if (metaConfig.share.facebookAppId) {
    window.fbAsyncInit = function() {
      FB.init({
        appId: metaConfig.share.facebookAppId,
        xfbml: true,
        version: 'v3.2',
      })
      FB.AppEvents.logPageView()
    }
    ;(function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) {
        return
      }
      js = d.createElement(s)
      js.id = id
      js.src = 'https://connect.facebook.net/en_US/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    })(document, 'script', 'facebook-jssdk')
  }
}

exports.wrapPageElement = ({ element }) => {
  return React.createElement(
    React.Suspense,
    { fallback: React.createElement(Spinner) },
    element
  )
}

// PWA: 서비스워커 업데이트 토스트 표시
exports.onServiceWorkerUpdateReady = () => {
  const containerId = 'sw-update-toast'
  let container = document.getElementById(containerId)
  if (!container) {
    container = document.createElement('div')
    container.id = containerId
    container.style.position = 'fixed'
    container.style.right = '16px'
    container.style.bottom = '16px'
    container.style.zIndex = '99999'
    document.body.appendChild(container)
  }
  const root = document.createElement('div')
  root.style.background = 'rgba(0,0,0,0.85)'
  root.style.color = '#fff'
  root.style.padding = '10px 12px'
  root.style.borderRadius = '8px'
  root.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)'
  root.style.display = 'flex'
  root.style.gap = '8px'
  root.style.alignItems = 'center'
  root.innerHTML = '<span>새 콘텐츠가 준비되었습니다.</span>'
  const btn = document.createElement('button')
  btn.textContent = '업데이트'
  btn.style.background = '#1a73e8'
  btn.style.color = '#fff'
  btn.style.border = 'none'
  btn.style.padding = '6px 10px'
  btn.style.borderRadius = '6px'
  btn.style.cursor = 'pointer'
  btn.onclick = () => window.location.reload()
  root.appendChild(btn)
  container.appendChild(root)
}
