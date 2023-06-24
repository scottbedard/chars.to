import 'monaco-volar'
import { getCache } from './cache'
import { languageEl, monacoEl } from './elements'
import { loadGrammars, loadTheme } from 'monaco-volar'
import { url } from './utils'
import * as monaco from 'monaco-editor-core'
import * as onigasm from 'onigasm'
import onigasmWasm from 'onigasm/lib/onigasm.wasm?url'

// load onigasm, a web-assembly port of the oniguruma regex library
await onigasm.loadWASM(onigasmWasm)

// load syntax color theme
const theme = await loadTheme(monaco.editor)

// create a monaco editor instance
export const editor = monaco.editor.create(monacoEl, {
  automaticLayout: true,
  fontFamily: '"Source Code Pro", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  fontSize: getCache('fontSize'),
  lineHeight: getCache('lineHeight'),
  lineNumbersMinChars: 4,
  minimap: {
    enabled: getCache('minimap'),
  },
  language: url.lang,
  lineNumbers: getCache('lineNumbers') ? 'on' : 'off',
  padding: {
    bottom: 12,
    top: 12,
  },
  renderLineHighlight: 'none',
  scrollbar: {
    verticalScrollbarSize: 12,
  },
  theme,
  value: url.value,
})

await loadGrammars(monaco, editor)

// expose setter to keep the languageEl in sync
export function setLanguage(lang: string) {
  const model = editor.getModel()

  if (model) {
    monaco.editor.setModelLanguage(model, lang)
  }

  languageEl.value = lang
}
