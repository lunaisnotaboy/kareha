import { markRaw, ref } from 'vue'
import { Storage } from '@/pizzax'

export const postFormActions = []
export const userActions = []
export const noteActions = []
export const noteViewInterruptors = []
export const notePostInterruptors = []

export const defaultStore = markRaw(new Storage('base', {
  tutorial: {
    where: 'account',
    default: 0
  },
  keepCw: {
    where: 'account',
    default: true
  },
  showFullAcct: {
    where: 'account',
    default: false
  },
  rememberNoteVisibility: {
    where: 'account',
    default: false
  },
  defaultNoteVisibility: {
    where: 'account',
    default: 'public'
  },
  animation: {
    where: 'device',
    default: true
  }
}))

const PREFIX = 'kux:'

type Plugin = {
  id: string
  name: string
  active: boolean
  configData: Record<string, any>
  token: string
  ast: any[]
}

import lightTheme from '@/themes/l-rosepinedawn.json5'
import darkTheme from '@/themes/d-rosepine.json5'

export class ColdDeviceStorage {
  public static default = {
    lightTheme,
    darkTheme,
    syncDeviceDarkMode: true,
    plugins: [] as Plugin[],
    mediaVolume: 0.5,
    sound_masterVolume: 0.3,
    sound_note: { type: 'None', volume: 0 },
    sound_noteMy: { type: 'luna/up', volume: 1 },
    sound_notification: { type: 'luna/pope2', volume: 1 },
    sound_chat: { type: 'luna/pope1', volume: 1 },
    sound_chatBg: { type: 'luna/waon', volume: 1 }
  }

  public static watchers = []

  public static get<T extends keyof typeof ColdDeviceStorage.default>(key: T): typeof ColdDeviceStorage.default[T] {
    const value = localStorage.getItem(PREFIX + key)

    if (value == null) {
      return ColdDeviceStorage.default[key]
    } else {
      return JSON.parse(value)
    }
  }

  public static set<T extends keyof typeof ColdDeviceStorage.default>(key: T, value: typeof ColdDeviceStorage.default[T]): void {
    if (value === undefined) {
      console.error(`attempt to store undefined value for key '${key}'`)

      return
    }

    localStorage.setItem(PREFIX + key, JSON.stringify(value))

    for (const watcher of this.watchers) {
      if (watcher.key === key) { watcher.callback(value) }
    }
  }

  public static watch(key, callback) {
    this.watchers.push({ key, callback })
  }

  public static ref<T extends keyof typeof ColdDeviceStorage.default>(key: T) {
    const v = ColdDeviceStorage.get(key)
    const r = ref(v)

    this.watch(key, v => {
      r.value = v
    })

    return r
  }

  public static makeGetterSetter<K extends keyof typeof ColdDeviceStorage.default>(key: K) {
    const valueRef = ColdDeviceStorage.ref(key)

    return {
      get: () => {
        return valueRef.value
      },
      set: (value: unknown) => {
        const val = value

        ColdDeviceStorage.set(key, val)
      }
    }
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: typeof defaultStore
  }
}
