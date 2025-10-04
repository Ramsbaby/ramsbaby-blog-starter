import React from 'react'

import './index.scss'

export const PostDate = ({ date, timeToRead }) => {
  return (
    <p className="post-date">
      {date}
      {typeof timeToRead === 'number' && <> · {timeToRead} min read</>}
    </p>
  )
}
