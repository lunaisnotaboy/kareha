import { globalEvents } from '@/events'
import tinycolor from 'tinycolor2'
import { ref } from 'vue'

export type Theme = {
  id: string
  name: string
  author: string
  desc?: string
  base?: 'dark' | 'light'
  props: Record<string, string>
}

import lightTheme from '@/themes/_light.json5'
import darkTheme from '@/themes/_dark.json5'

export const themeProps = Object.keys(lightTheme.props).filter(key => !key.startsWith('X'))

export const getBuiltinThemes = () => Promise.all(
  [
    'l-rosepinedawn',

    'd-rosepine'
  ].map(name => import(`../themes/${name}.json5`).then(({ default: _default }): Theme => _default))
)

export const getBuiltinThemesRef = () => {
  const builtinThemes = ref<Theme[]>([])

  getBuiltinThemes().then(themes => builtinThemes.value = themes)

  return builtinThemes
}

let timeout = null

export function applyTheme(theme: Theme, persist = true) {
  if (timeout) { window.clearTimeout(timeout) }

  document.documentElement.classList.add('_themeChanging_')

  timeout = window.setTimeout(() => {
    document.documentElement.classList.remove('_themeChanging_')
  }, 1000)

  const colorSchema = theme.base === 'dark' ? 'dark' : 'light'

  // Deep copy
  const _theme = JSON.parse(JSON.stringify(theme))

  if (_theme.base) {
    const base = [lightTheme, darkTheme].find(x => x.id === _theme.base)

    if (base) { _theme.props = Object.assign({}, base.props, _theme.props) }
  }

  const props = compile(_theme)

  for (const tag of document.head.children) {
    if (tag.tagName === 'META' && tag.getAttribute('name') === 'theme-color') {
      tag.setAttribute('content')
    }
  }
}

function compile(theme: Theme): Record<string, string> {
  function getColor(val: string): tinycolor.Instance {
    if (val[0] === '@') {
      return getColor(theme.props[val.substr(1)])
    } else if (val[0] === '$') {
      return getColor(theme.props[val])
    } else if (val[0] === ':') {
      const parts = val.split('<')
      const func = parts.shift()!.substr(1)
      const arg = parseFloat(parts.shift()!)
      const color = getColor(parts.join('<'))

      switch (func) {
        case 'darken': return color.darken(arg)
        case 'lighten': return color.lighten(arg)
        case 'alpha': return color.setAlpha(arg)
        case 'hue': return color.spin(arg)
        case 'saturate': return color.saturate(arg)
      }
    }

    return tinycolor(val)
  }

  const props = {}

  for (const [k, v] of Object.entries(theme.props)) {
    if (k.startsWith('$')) { continue }

    props[k] = v.startsWith('"') ? v.replace(/^"\s*/, '') : genValue(getColor(v))
  }

  return props
}

function genValue(c: tinycolor.Instance): string {
  return c.toRgbString()
}
