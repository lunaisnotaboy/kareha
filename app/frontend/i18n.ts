import { I18n } from '@/utils/i18n'
import { locale } from '@/config'
import { markRaw } from 'vue'

export const i18n = markRaw(new I18n(locale))

// I don't want to write it in this file, but for some reason Vetur
// doesn't recognize it if I don't write it here
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $t: typeof i18n['t']
    $ts: typeof i18n['ts']
  }
}
