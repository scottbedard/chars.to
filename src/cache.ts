export interface Cache {
  fontSize: number
  lineHeight: number
  lineNumbers: boolean
  minimap: boolean
}

export function getCache<T extends keyof Cache>(key: T, defaultValue: Cache[T]): Cache[T] {
  const cached = localStorage.getItem(key)

  if (cached) {
    try {
      return JSON.parse(cached) as Cache[T]
    } catch {
      console.error(`Invalid cache [${key}]`)
    }
  }

  return defaultValue
}

export function setCache<T extends keyof Cache>(key: T, value: Cache[T]) {
  localStorage.setItem(key, JSON.stringify(value))
}
