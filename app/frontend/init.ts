import { createApp, defineAsyncComponent } from 'vue'
import { defaultStore } from '@/store'
import { lang } from '@/config'
import { i18n } from '@/i18n'

export const main = async () => {
  if (_DEV_) {
    (window as any).$store = defaultStore
  }

  //#region See: https://css-tricks.com/the-trick-to-viewport-units-on-mobile
  const vh = window.innerHeight * 0.01

  document.documentElement.style.setProperty('--vh', `${vh}px`)
  window.addEventListener('resize', () => {
    const vh = window.innerHeight * 0.01

    document.documentElement.style.setProperty('--vh', `${vh}px`)
  })
  //#endregion

  //#region Set language attribute
  const html = document.documentElement

  html.setAttribute('lang', lang || 'en')
  //#endregion

  const app = createApp(
    defineAsyncComponent(() => import('@/ui/visitor.vue'))
  )

  if (_DEV_) {
    app.config.performance = true
  }

  app.config.globalProperties = {
    $store: defaultStore,
    $t: i18n.t,
    $ts: i18n.ts
  }

  app.mount('#app')
}
