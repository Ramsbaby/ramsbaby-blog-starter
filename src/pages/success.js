import React from 'react'
import { Layout } from '../layout'
import metaConfig from '../../gatsby-meta-config'

export default function SuccessPage({ location }) {
  return (
    <Layout location={location} title="구독 완료" siteMetadata={metaConfig}>
      <div style={{ maxWidth: 720, margin: '40px auto', padding: '0 16px' }}>
        <h1>구독 요청이 접수되었습니다</h1>
        <p>
          입력하신 이메일로 확인 메일이 발송될 수 있습니다. 스팸함도 함께
          확인해주세요.
        </p>
        <p>
          운영 환경에서는 관리자에서 공급사(Buttondown/Mailchimp)를 연결하면
          자동 발송이 활성화됩니다.
        </p>
        <a href="/">홈으로 돌아가기</a>
      </div>
    </Layout>
  )
}
