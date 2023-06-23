import { Buffer } from 'buffer'

export interface EncodedData {
  lang: string
  name: string
  value: string
}

export function unescape(str: string) {
  return (str + '==='.slice((str.length + 3) % 4))
    .replace(/-/g, '+')
    .replace(/_/g, '/')
}

export function escape(str: string) {
  return str.replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}

export function encode(obj: EncodedData) {
  const str = JSON.stringify(obj)
  
  return escape(Buffer.from(str, 'utf8').toString('base64'))
}

export function decode(str: string) {
  try {
    return JSON.parse(Buffer.from(unescape(str), 'base64').toString('utf8')) as EncodedData
  } catch {
    return { name: '', value: '', lang: 'auto' }
  }
}
