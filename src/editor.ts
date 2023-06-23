import { getCache } from './cache'
import { monacoEl } from './elements'
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
  scrollBeyondLastLine: getCache('scrollBeyondLastLine'),
  quickSuggestions: false,
})
