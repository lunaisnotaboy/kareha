// PIZZAX --- A lightweight store

import { onUnmounted, Ref, ref, watch } from 'vue'

type StateDef = Record<string, {
  where: 'account' | 'device' | 'deviceAccount'
  default: any
}>

type ArrayElement<A> = A extends readonly (infer T)[] ? T : never

const $i: any = null // TODO: Add account functionality

export class Storage<T extends StateDef> {
  public readonly key: string
  public readonly keyForLocalStorage: string
  public readonly def: T
  public readonly state: { [K in keyof T]: T[K]['default'] }
  public readonly reactiveState: { [K in keyof T]: Ref<T[K]['default']> }

  constructor(key: string, def: T) {
    this.key = key
    this.keyForLocalStorage = `pizzax::${key}`
    this.def = def

    const deviceState = JSON.parse(localStorage.getItem(this.keyForLocalStorage) || '{}')
    const deviceAccountState = {} // TODO: Add account functionality
    const registryCache = {} // TODO: Add account functionality

    const state = {}
    const reactiveState = {}

    for (const [k, v] of Object.entries(def)) {
      if (v.where === 'device' && Object.prototype.hasOwnProperty.call(deviceState, k)) {
        state[k] = deviceState[k]
      } else if (v.where === 'account' && $i && Object.prototype.hasOwnProperty.call(registryCache, k)) {
        state[k] = registryCache[k]
      } else if (v.where === 'deviceAccount' && Object.prototype.hasOwnProperty.call(deviceAccountState, k)) {
        state[k] = deviceAccountState[k]
      } else {
        state[k] = v.default

        if (_DEV_) { console.log('Use default value', k, v.default) }
      }
    }

    for (const [k, v] of Object.entries(state)) {
      reactiveState[k] = ref(v)
    }

    this.state = state as any
    this.reactiveState = reactiveState as any
  }

  public set<K extends keyof T>(key: K, value: T[K]['default']): void {
    if (_DEV_) { console.log('set', key, value) }

    this.state[key] = value
    this.reactiveState[key].value = value

    switch (this.def[key].where) {
      case 'device': {
        const deviceState = JSON.parse(localStorage.getItem(this.keyForLocalStorage) || '{}')

        deviceState[key] = value

        localStorage.setItem(this.keyForLocalStorage, JSON.stringify(deviceState))

        break
      }
      case 'deviceAccount': {
        if ($i == null) { break }

        const deviceAccountState = JSON.parse(localStorage.getItem(this.keyForLocalStorage + '::' + $i.id) || '{}')

        deviceAccountState[key] = value

        localStorage.setItem(this.keyForLocalStorage + '::' + $i.id, JSON.stringify(deviceAccountState))

        break
      }
      case 'account': {
        if ($i == null) { break }

        const cache = JSON.parse(localStorage.getItem(this.keyForLocalStorage + '::cache::' + $i.id) || '{}')

        cache[key] = value

        localStorage.setItem(this.keyForLocalStorage + '::cache::' + $i.id, JSON.stringify(cache))

        // TODO: API registry

        break
      }
    }
  }

  public push<K extends keyof T>(key: K, value: ArrayElement<T[K]['default']>): void {
    const currentState = this.state[key]

    this.set(key, [...currentState, value])
  }

  public reset(key: keyof T) {
    this.set(key, this.def[key].default)
  }

  public makeGetterSetter<K extends keyof T>(key: K, getter?:(v: T[K]) => unknown, setter?: (v: unknown) => T[K]) {
    const valueRef = ref(this.state[key])
    const stop = watch(this.reactiveState[key], val => {
      valueRef.value = val
    })

    onUnmounted(() => {
      stop()
    })

    return {
      get: () => {
        if (getter) {
          return getter(valueRef.value)
        } else {
          return valueRef.value
        }
      },
      set: (value: unknown) => {
        const val = setter ? setter(value) : value

        this.state(key, val)

        valueRef.value = val
      }
    }
  }
}
