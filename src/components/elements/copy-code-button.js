import React, { useCallback, useState } from 'react'

export const CopyCodeButton = ({ targetRef }) => {
  const [copied, setCopied] = useState(false)
  const onCopy = useCallback(async () => {
    try {
      const text = targetRef.current?.innerText || ''
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (e) {
      // noop
    }
  }, [targetRef])

  return (
    <button
      type="button"
      aria-label="코드 복사"
      onClick={onCopy}
      style={{
        position: 'absolute',
        top: 8,
        right: 8,
        fontSize: 12,
        padding: '4px 8px',
        borderRadius: 4,
        border: '1px solid #d0d7de',
        background: copied ? '#e6f4ea' : '#fff',
      }}
    >
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}

export default CopyCodeButton
