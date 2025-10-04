import React from 'react'

export const Spinner = () => (
  <div
    role="status"
    aria-label="로딩 중"
    style={{ display: 'flex', justifyContent: 'center', padding: '16px' }}
  >
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="#1a73e8"
        strokeWidth="4"
        opacity="0.25"
      />
      <path d="M22 12a10 10 0 00-10-10" stroke="#1a73e8" strokeWidth="4">
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 12 12"
          to="360 12 12"
          dur="0.8s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  </div>
)

export default Spinner
