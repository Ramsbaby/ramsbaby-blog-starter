const BODY = 'body'

type Selector = string

export const getElements = (selector: Selector): NodeListOf<Element> =>
  document.querySelectorAll(selector)

export const getElement = (selector: Selector): Element | null =>
  document.querySelector(selector)

export const addClass = (element: Element, className: string): void =>
  element.classList.add(className)

export const removeClass = (element: Element, className: string): void =>
  element.classList.remove(className)

export const hasClass = (element: Element, className: string): boolean =>
  element.classList.contains(className)

export const getBody = (): Element => document.body

export const addClassToBody = (className: string): void =>
  addClass(getBody(), className)
export const removeClassToBody = (className: string): void =>
  removeClass(getBody(), className)
export const hasClassOfBody = (className: string): boolean =>
  hasClass(getBody(), className)

export const getRect = (selector: Selector): DOMRect => {
  const el = getElement(selector)
  if (!el) throw new Error(`Element not found for selector: ${selector}`)
  return el.getBoundingClientRect()
}

export const getPosY = (selector: Selector): number => getRect(selector).y

export const getDocumentHeight = (): number =>
  document.documentElement.offsetHeight
