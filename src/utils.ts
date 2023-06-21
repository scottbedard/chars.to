import { Buffer } from 'buffer'

export function unescape (str: string) {
  return (str + '==='.slice((str.length + 3) % 4))
    .replace(/-/g, '+')
    .replace(/_/g, '/')
}

export function escape (str: string) {
  return str.replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}

export function encode (str: string, encoding: string = 'utf8') {
  return escape(Buffer.from(str, encoding).toString('base64'))
}

export function decode (str: string, encoding: string = 'utf8') {
  return Buffer.from(unescape(str), 'base64').toString(encoding)
}
