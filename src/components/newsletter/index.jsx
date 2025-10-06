import React, { useRef } from 'react'
import './index.scss'

export const Newsletter = ({ provider = 'buttondown', actionUrl = '' }) => {
  const emailRef = useRef(null)
  const enabled = !!actionUrl

  // Accessible subscription form
  return (
    <section className="newsletter" aria-label="뉴스레터 구독">
      <h2 className="newsletter__title">뉴스레터 구독</h2>
      <p className="newsletter__desc">
        새 글과 업데이트를 이메일로 받아보세요.
      </p>
      <form
        className="newsletter__form"
        action={enabled ? actionUrl : undefined}
        method={enabled ? 'post' : undefined}
        target={enabled ? '_blank' : undefined}
        rel={enabled ? 'noopener noreferrer' : undefined}
        onSubmit={e => {
          if (!enabled) e.preventDefault()
        }}
      >
        <label htmlFor="newsletter-email" className="newsletter__label">
          이메일 주소
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          ref={emailRef}
          placeholder="you@example.com"
          className="newsletter__input"
          autoComplete="email"
        />
        <button
          type="submit"
          className="newsletter__button"
          disabled={!enabled}
        >
          {enabled ? '구독하기' : '준비중'}
        </button>
      </form>
      {enabled && provider === 'buttondown' && (
        <small className="newsletter__hint">
          Buttondown을 통해 안전하게 구독이 관리됩니다.
        </small>
      )}
      {!enabled && (
        <small className="newsletter__hint">
          구독 기능 준비중입니다. 관리자 설정 완료 후 활성화됩니다.
        </small>
      )}
    </section>
  )
}

export default Newsletter
