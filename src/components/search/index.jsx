import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'

import './index.scss'

export const Search = props => {
  const [input, setInput] = useState('')
  const nameInput = useRef()

  const changeHandler = e => {
    //역슬래시 제거
    if (e.target.value.toString().indexOf('\\') != -1) {
      const cleanValue = e.target.value.toString().replace(/\\/gi, '')
      setInput(cleanValue)
      if (nameInput.current) {
        nameInput.current.value = cleanValue
      }
      e.preventDefault()
      return false
    }
    setInput(e.target.value)
    props.inputSearchWord(e.target.value)
    props.selectExposureGb('SEARCH')
  }

  const onFormSubmit = e => {
    e.preventDefault()
  }

  return (
    <form
      onSubmit={onFormSubmit}
      className="inputContainer"
      role="search"
      aria-label="사이트 검색"
    >
      <div className="search-input-wrapper">
        <input
          type="text"
          name="input"
          placeholder="검색할 단어를 입력해보세요."
          value={input}
          onChange={changeHandler}
          ref={nameInput}
          className="search-input"
          role="searchbox"
          aria-label="검색어 입력"
          autoComplete="off"
          spellCheck={false}
        />
        <span className="search-icon">🔍</span>
      </div>
    </form>
  )
}

export default Search

Search.propTypes = {
  inputSearchWord: PropTypes.func.isRequired,
  selectExposureGb: PropTypes.func.isRequired,
}
