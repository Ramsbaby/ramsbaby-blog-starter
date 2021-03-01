import React from 'react'

export const TagItem = ({ tags }) => {
  const tagStyle = {
    display: 'inline-block',
    marginRight: '1rem',
  }

  const h6Style = {
    color: '#007bff',
  }

  return (
    <div>
      {tags.map((val, idx) => (
        <div key={`tagDiv_` + idx} style={tagStyle}>
          <h6 style={h6Style}>{'#' + val}</h6>
        </div>
      ))}
    </div>
  )
}
