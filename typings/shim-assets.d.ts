declare module '*.vue'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.svg'

declare module '*.vue' {
  const component: JSX.Element
  export default component
}

declare module '*.module.less' {
  const classes: { readonly [key: string]: string }
  export default classes
}
