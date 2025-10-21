import React, { useEffect, useState } from 'react'
import { graphql } from 'gatsby'
import { Layout } from '../layout'
import metaConfig from '../../gatsby-meta-config'

export default function AdminSubscribers({ location, data }) {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [tried, setTried] = useState([])
  const newsletterAction =
    data?.settings?.nodes?.[0]?.newsletterAction ||
    process.env.GATSBY_NEWSLETTER_API ||
    ''

  useEffect(() => {
    async function load() {
      try {
        const candidates = []
        // 1) 개발 중 로컬 백엔드 우선 시도
        if (typeof window !== 'undefined') {
          const host = window.location.hostname
          const isLocal = host === 'localhost' || host === '127.0.0.1'
          if (isLocal) {
            candidates.push('http://localhost:8080/api/subscribers')
          }
        }
        // 2) 개발 프록시
        candidates.push('/.proxy/newsletter/api/subscribers')
        // 3) 동일 오리진(배포시 역프록시)
        candidates.push('/api/subscribers')
        // 4) 설정값(원격 API)
        if (newsletterAction) {
          candidates.push(newsletterAction)
        }

        let resp
        let lastErr
        const triedList = []
        for (const url of candidates) {
          try {
            triedList.push(url)
            resp = await fetch(url, {
              credentials: 'omit',
              mode: 'cors',
              headers: { Accept: 'application/json' },
              cache: 'no-store',
            })
            if (resp.ok) break
            lastErr = new Error(`HTTP ${resp.status}`)
          } catch (e) {
            lastErr = e
          }
        }
        setTried(triedList)
        if (!resp || !resp.ok) throw lastErr || new Error('failed to fetch')
        const data = await resp.json()
        setRows(data)
      } catch (e) {
        setError(
          '구독자 목록을 불러오지 못했습니다. 배포 URL에서 다시 시도하세요.'
        )
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [newsletterAction])

  return (
    <Layout location={location} title="Subscribers" siteMetadata={metaConfig}>
      <div style={{ maxWidth: 960, margin: '40px auto', padding: '0 16px' }}>
        <h1>구독자 목록</h1>
        {loading && <p>불러오는 중…</p>}
        {error && (
          <div>
            <p style={{ color: 'crimson' }}>{error}</p>
            {tried.length > 0 && (
              <details style={{ marginTop: 8 }}>
                <summary>시도한 엔드포인트 보기</summary>
                <ul>
                  {tried.map(u => (
                    <li key={u}>
                      <a href={u} target="_blank" rel="noreferrer">
                        {u}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            )}
          </div>
        )}
        {!loading && !error && (
          <div style={{ overflowX: 'auto' }}>
            <div style={{ margin: '6px 0 10px', display: 'flex', gap: 12 }}>
              <Badge rows={rows} label="전체" filter={() => true} />
              <Badge
                rows={rows}
                label="활성"
                filter={r => r.status === 'active'}
              />
              <Badge
                rows={rows}
                label="대기"
                filter={r => r.status === 'pending'}
              />
              <Badge
                rows={rows}
                label="해지"
                filter={r => r.status === 'unsubscribed'}
              />
            </div>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: 14,
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      textAlign: 'left',
                      borderBottom: '1px solid #ddd',
                    }}
                  >
                    ID
                  </th>
                  <th
                    style={{
                      textAlign: 'left',
                      borderBottom: '1px solid #ddd',
                    }}
                  >
                    Email
                  </th>
                  <th
                    style={{
                      textAlign: 'left',
                      borderBottom: '1px solid #ddd',
                    }}
                  >
                    Status
                  </th>
                  <th
                    style={{
                      textAlign: 'left',
                      borderBottom: '1px solid #ddd',
                    }}
                  >
                    Created
                  </th>
                  <th
                    style={{
                      textAlign: 'left',
                      borderBottom: '1px solid #ddd',
                    }}
                  >
                    Confirmed
                  </th>
                  <th
                    style={{
                      textAlign: 'left',
                      borderBottom: '1px solid #ddd',
                    }}
                  >
                    Unsubscribed
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map(r => (
                  <tr key={r.id}>
                    <td
                      style={{
                        padding: '6px 8px',
                        borderBottom: '1px solid #f0f0f0',
                      }}
                    >
                      {r.id}
                    </td>
                    <td
                      style={{
                        padding: '6px 8px',
                        borderBottom: '1px solid #f0f0f0',
                      }}
                    >
                      {r.email}
                    </td>
                    <td
                      style={{
                        padding: '6px 8px',
                        borderBottom: '1px solid #f0f0f0',
                      }}
                    >
                      {r.status}
                    </td>
                    <td
                      style={{
                        padding: '6px 8px',
                        borderBottom: '1px solid #f0f0f0',
                      }}
                    >
                      {r.createdAt || '-'}
                    </td>
                    <td
                      style={{
                        padding: '6px 8px',
                        borderBottom: '1px solid #f0f0f0',
                      }}
                    >
                      {r.confirmedAt || '-'}
                    </td>
                    <td
                      style={{
                        padding: '6px 8px',
                        borderBottom: '1px solid #f0f0f0',
                      }}
                    >
                      {r.unsubscribedAt || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p style={{ marginTop: 16 }}>
          배포 환경에서 `/admin/subscribers` 로 접속해 목록을 확인하세요.
        </p>
      </div>
    </Layout>
  )
}

function Badge({ rows, label, filter }) {
  const n = rows.filter(filter).length
  return (
    <span
      style={{
        background: '#eef2ff',
        color: '#1e40af',
        borderRadius: 999,
        padding: '4px 10px',
        fontSize: 12,
      }}
    >
      {label}: {n}
    </span>
  )
}

export const pageQuery = graphql`
  query {
    settings: allSettingsJson {
      nodes {
        newsletterAction
      }
    }
  }
`
