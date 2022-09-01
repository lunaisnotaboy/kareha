declare module '@/themes/*.json5' {
  import { Theme } from '@/utils/theme'

  const theme: Theme

  export default theme
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<{}, {}, any>

  export default component
}

declare const _DEV_: boolean
declare const _LANGS_: string[][]

type FIXME = any
