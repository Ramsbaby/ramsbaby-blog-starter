import React from 'react'

export const TagItem = ({ tags }) => {
  return (
    <div className="thumb-tags" aria-label="태그들">
      {tags.map((val, idx) => (
        <span key={`tag_${idx}`} className="thumb-tag">
          #{val}
        </span>
      ))}
    </div>
  )
}
