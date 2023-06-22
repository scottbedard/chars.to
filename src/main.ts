import './style.css'
import './dark-mode'
import { decode, encode } from './utils'
import loader from '@monaco-editor/loader'

// find monaco target element
const monacoEl = document.getElementById('monaco')

if (!monacoEl) {
  throw new Error('Monaco element not found')
}

// set the default or initial value
let value = `function greeting() {
  return 'Hello from chars.to! 👋'
}
`

try {
  if (window.location.hash) {
    value = decode(window.location.hash.slice(1))
  }
} catch { }

// load the editor
const monaco = await loader.init()

const editor = monaco.editor.create(monacoEl, {
  automaticLayout: true,
  fontFamily: '"Source Code Pro", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  fontSize: 16,
  language: 'typescript',
  lineDecorationsWidth: 0,
  lineHeight: 24,
  minimap: {
    enabled: false,
  },
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

// listen for events
document.addEventListener('keydown', e => {
  if (e.key === 's' && e.metaKey) {
    e.preventDefault()
    
    window.location.hash = encode(editor.getValue())
  }
})
