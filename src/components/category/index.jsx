import React, { useCallback, useRef, Component } from 'react'
import PropTypes from 'prop-types'
import { rhythm } from '../../utils/typography'
import './index.scss'
import { Item } from './item'
import ScrollMenu from 'react-horizontal-scrolling-menu'

// One item component
// selected prop will be passed
const MenuItem = ({ text, selected, selectExposureGb }) => {
  return (
    <div
      className={`menu-item ${selected ? 'active' : ''}`}
      role="button"
      tabIndex={0}
      aria-pressed={selected ? true : false}
      onClick={function() {
        selectExposureGb('CATE')
      }}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          selectExposureGb('CATE')
        }
      }}
    >
      {text}
    </div>
  )
}

// All items component
// Important! add unique key
export const Menu = (list, selected, selectExposureGb) =>
  list.map(el => {
    const { name } = el

    return (
      <MenuItem
        text={name}
        key={name}
        selected={selected}
        selectExposureGb={selectExposureGb}
      />
    )
  })

const Arrow = ({ text, className }) => {
  return <div className={className}>{text}</div>
}

const ArrowLeft = Arrow({ text: '👈', className: 'arrow-prev' })
const ArrowRight = Arrow({ text: '👉', className: 'arrow-next' })

const selected = 'All'

export const Category = ({
  categories,
  category,
  selectCategory,
  selectExposureGb,
}) => {
  const containerRef = useRef(null)

  const scrollToCenter = useCallback(
    tabRef => {
      const { offsetWidth: tabWidth } = tabRef.current
      const { scrollLeft, offsetWidth: containerWidth } = containerRef.current
      const tabLeft = tabRef.current.getBoundingClientRect().left
      const containerLeft = containerRef.current.getBoundingClientRect().left
      const refineLeft = tabLeft - containerLeft
      const targetScollX =
        scrollLeft + refineLeft - containerWidth / 2 + tabWidth / 2

      containerRef.current.scroll({
        left: targetScollX,
        top: 0,
        behavior: 'smooth',
      })
    },
    [containerRef]
  )

  let list = categories.map((title, idx) => ({ name: title, key: idx }))
  list.unshift({ name: 'All' }) // 앞에 새로운 배열값 추가 (list.push는 뒤에 배열을 추가함)

  const menu = Menu(list, selected, selectExposureGb)

  return (
    <div
      className={'ScrollMenu-container'}
      role="navigation"
      aria-label="카테고리 선택"
    >
      <ScrollMenu
        data={menu}
        arrowLeft={ArrowLeft}
        arrowRight={ArrowRight}
        selected={selected}
        onSelect={selectCategory}
      />
    </div>
  )
}

Category.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  category: PropTypes.string.isRequired,
  selectCategory: PropTypes.func.isRequired,
  selectExposureGb: PropTypes.func.isRequired,
}
