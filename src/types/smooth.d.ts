declare module 'smooth-scroll/dist/smooth-scroll.min' {
  export default class SmoothScroll {
    constructor(selector?: string, options?: any)
    animateScroll(dest: string | Element): void
    destroy(): void
  }
}

declare module 'smoothscroll-polyfill' {
  const smoothscroll: { polyfill(): void }
  export = smoothscroll
}
