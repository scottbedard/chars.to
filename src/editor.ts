import { getCache } from './cache'
import { languageEl, monacoEl } from './elements'
import { url } from './utils'
import loader from '@monaco-editor/loader'
import type monacoType from 'monaco-editor'

export const monaco = (await loader.init()) as typeof monacoType

export const editor = monaco.editor.create(monacoEl, {
  automaticLayout: true,
  fontFamily: '"Source Code Pro", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  fontSize: getCache('fontSize'),
  lineHeight: getCache('lineHeight'),
  lineNumbersMinChars: 4,
  minimap: {
    enabled: getCache('minimap'),
  },
  lineNumbers: getCache('lineNumbers') ? 'on' : 'off',
  padding: {
    bottom: 12,
    top: 12,
  },
  renderLineHighlight: 'none',
  scrollbar: {
    verticalScrollbarSize: 12,
  },
  quickSuggestions: false,
  scrollBeyondLastLine: getCache('scrollBeyondLastLine'),
  value: url.value,
})

// expose setter to keep the languageEl in sync
export function setLanguage(lang: string) {
  const model = editor.getModel()

  if (model) {
    console.log(`language: [${lang}]`)
    monaco.editor.setModelLanguage(model, lang)
  }

  languageEl.value = lang
}

setLanguage(url.lang)
