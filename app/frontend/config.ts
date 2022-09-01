const address = new URL(location.href)

export const host = address.host
export const hostname = address.hostname
export const url = address.origin
export const apiUrl = `${url}/api`
export const lang = localStorage.getItem('lang')
export const langs = _LANGS_
export const locale = JSON.parse(localStorage.getItem('locale')!)
export const debug = localStorage.getItem('debug') === 'true'
