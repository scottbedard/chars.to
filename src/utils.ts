import { Buffer } from 'buffer'

export interface CharData {
  lang: string
  name: string
  value: string
}

export function decode(str: string) {
  try {
    return JSON.parse(Buffer.from(unescape(str), 'base64').toString('utf8')) as CharData
  } catch {
    console.error('failed to decode url')
    return { name: '', value: '', lang: 'auto' }
  }
}

export function encode(obj: CharData) {
  const str = JSON.stringify(obj)
  
  return escape(Buffer.from(str, 'utf8').toString('base64'))
}

export function escape(str: string) {
  return str.replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}

export function unescape(str: string) {
  return (str + '==='.slice((str.length + 3) % 4))
    .replace(/-/g, '+')
    .replace(/_/g, '/')
}

export function url() {
  const data: CharData = {
    lang: 'auto',
    name: '',
    value: '',
  }

  try {
    if (window.location.hash) {
      const obj = decode(window.location.hash.slice(1))
  
      if ('lang' in obj) {
        data.lang = obj.lang
      }
  
      if ('name' in obj) {
        data.name = obj.name
      }
  
      if ('value' in obj) {
        data.value = obj.value
      }
    }
  } catch { }

  return data
}