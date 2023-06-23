import loader from '@monaco-editor/loader'

const monacoEl = document.getElementById('monaco')

if (!monacoEl) {
  throw new Error('monaco element not found')
}

export const monaco = await loader.init()

export const editor = monaco.editor.create(monacoEl, {
  automaticLayout: true,
  fontFamily: '"Source Code Pro", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  fontSize: 14,
  language: 'typescript',
  lineDecorationsWidth: 0,
  lineHeight: 20,
  lineNumbersMinChars: 4,
  minimap: {
    // enabled: false,
  },
  // lineNumbers: 'off',
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