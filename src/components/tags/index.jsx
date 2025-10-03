// @flow
import React from 'react'

export const Tags = ({ tags, selectTag, selectExposureGb }) => {
  let tagList = tags.map((tag, index) => (
    <li key={index} style={{ display: 'inline-block' }}>
      <a
        className="tag-contents"
        style={{
          display: 'inline-block',
          border: '1px solid #e6e6e6',
          textDecoration: 'none',
          borderRadius: '1.25rem',
          padding: '0 0.75rem',
          fontSize: '0.75rem',
          lineHeight: '1.5625rem',
          height: '25px',
        }}
        role="button"
        href="#!"
        aria-label={`태그 선택: ${tag.fieldValue}`}
        onClick={function() {
          selectTag(tag.fieldValue)
          selectExposureGb('TAG')
        }}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            selectTag(tag.fieldValue)
            selectExposureGb('TAG')
          }
        }}
      >
        {tag.fieldValue}({tag.totalCount})
      </a>
    </li>
  ))
  return (
    <div>
      <ul
        style={{
          display: 'block',
          listStyle: 'none',
          margin: '0 -0.625rem',
          padding: '0',
        }}
      >
        <li style={{ display: 'inline-block' }}>
          <a
            className="tag-contents"
            style={{
              display: 'inline-block',
              border: '1px solid #e6e6e6',
              textDecoration: 'none',
              borderRadius: '1.25rem',
              padding: '0 0.75rem',
              fontSize: '0.75rem',
              lineHeight: '1.5625rem',
              height: '25px',
            }}
            role="button"
            href="#!"
            aria-label="모든 태그 보기"
            onClick={function() {
              selectExposureGb('TAG-ALL')
            }}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                selectExposureGb('TAG-ALL')
              }
            }}
          >
            ALL
          </a>
        </li>
        {tagList}
      </ul>
    </div>
  )
}
