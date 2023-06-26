import { editor } from './editor'
import { getCache, setCache } from './cache'
import {
  fontSizeEl,
  lineHeightEl,
  lineNumbersEl,
  minimapEl,
  resetEl,
  scrollBeyondLastLineEl,
} from './elements'

/**
 * Constants
 */
const syncSettings = () => {
  fontSizeEl.value = getCache('fontSize').toString()
  lineHeightEl.value = getCache('lineHeight').toString()
  lineNumbersEl.checked = getCache('lineNumbers')
  minimapEl.checked = getCache('minimap')
  scrollBeyondLastLineEl.checked = getCache('scrollBeyondLastLine')

  editor.updateOptions({
    fontSize: Number(fontSizeEl.value),
    lineHeight: Number(lineHeightEl.value),
    lineNumbers: lineNumbersEl.checked ? 'on' : 'off',
    minimap: { enabled: minimapEl.checked },
    scrollBeyondLastLine: scrollBeyondLastLineEl.checked,
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

scrollBeyondLastLineEl.addEventListener('input', () => {
  setCache('scrollBeyondLastLine', scrollBeyondLastLineEl.checked)
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
