import './style.css'
import { decode, encode } from './utils'
import loader from '@monaco-editor/loader'

const monacoEl = document.getElementById('monaco')

if (!monacoEl) {
  throw new Error('Monaco element not found')
}

let value = `function greeting() {
  return 'Hello from chars.to! 👋'
}
`

try {
  if (window.location.hash) {
    value = decode(window.location.hash.slice(1))
  }
} catch { }

const monaco = await loader.init()

const editor = monaco.editor.create(monacoEl, {
  fontFamily: '"Source Code Pro", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  fontSize: 16,
  language: 'typescript',
  lineDecorationsWidth: 0,
  lineHeight: 24,
  padding: {
    top: 16,
  },
  renderLineHighlight: 'none',
  scrollbar: {
    verticalScrollbarSize: 12,
  },
  scrollBeyondLastLine: false,
  value,
});

document.addEventListener('keydown', e => {
  if (e.key === 's' && e.metaKey) {
    e.preventDefault()
    
    window.location.hash = encode(editor.getValue())
  }
})
