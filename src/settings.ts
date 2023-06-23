import { editor } from './editor'
import { getCache, setCache } from './cache'

/**
 * Elements
 */
const fontSizeEl = document.getElementById('settings-font-size') as HTMLInputElement
const lineHeightEl = document.getElementById('settings-line-height') as HTMLInputElement
const lineNumbersEl = document.getElementById('settings-line-numbers') as HTMLInputElement
const minimapEl = document.getElementById('settings-minimap') as HTMLInputElement
const resetEl = document.getElementById('settings-reset') as HTMLButtonElement

/**
 * Constants
 */
const syncSettings = () => {
  fontSizeEl.value = getCache('fontSize', 14).toString()
  lineHeightEl.value = getCache('lineHeight', 24).toString()
  lineNumbersEl.checked = getCache('lineNumbers', true)
  minimapEl.checked = getCache('minimap', true)

  editor.updateOptions({
    fontSize: Number(fontSizeEl.value),
    lineHeight: Number(lineHeightEl.value),
    lineNumbers: lineNumbersEl.checked,
    minimap: { enabled: minimapEl.checked },
  })
}

syncSettings()

/**
 * Event handlers
 */
lineNumbersEl.addEventListener('input', () => {
  setCache('lineNumbers', lineNumbersEl.checked)
  syncSettings()
})

minimapEl.addEventListener('input', () => {
  setCache('minimap', minimapEl.checked)
  syncSettings()
})

fontSizeEl.addEventListener('input', () => {
  setCache('fontSize', Number(fontSizeEl.value))
  syncSettings()
})

lineHeightEl.addEventListener('input', () => {
  setCache('lineHeight', Number(lineHeightEl.value))
  syncSettings()
})

resetEl.addEventListener('click', () => {
  localStorage.clear()
  syncSettings()
})
