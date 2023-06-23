export const defaultCache = {
  fontSize: 14,
  lineHeight: 24,
  lineNumbers: true,
  minimap: true,
  scrollBeyondLastLine: true,
}

export function getCache<T extends keyof typeof defaultCache>(key: T): typeof defaultCache[T] {
  const cached = localStorage.getItem(key)

  if (cached) {
    try {
      return JSON.parse(cached) as typeof defaultCache[T]
    } catch {
      console.error(`Invalid cache [${key}]`)
    }
  }

  return defaultCache[key]
}

export function setCache<T extends keyof typeof defaultCache>(key: T, value: typeof defaultCache[T]) {
  localStorage.setItem(key, JSON.stringify(value))
}
