import loader from '@monaco-editor/loader'
import { getCache } from './cache'

const monacoEl = document.getElementById('monaco')

if (!monacoEl) {
  throw new Error('monaco element not found')
}

export const monaco = await loader.init()

export const editor = monaco.editor.create(monacoEl, {
  automaticLayout: true,
  fontFamily: '"Source Code Pro", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  fontSize: getCache('fontSize', 14),
  language: 'typescript',
  lineDecorationsWidth: 0,
  lineHeight: getCache('lineHeight'),
  lineNumbersMinChars: 4,
  minimap: {
    enabled: getCache('minimap', true),
  },
  lineNumbers: getCache('lineNumbers', true),
  padding: {
    bottom: 12,
    top: 12,
  },
  renderLineHighlight: 'none',
  scrollbar: {
    verticalScrollbarSize: 12,
  },
  scrollBeyondLastLine: false,
})
