import './clear'
import './dark-mode'
import './style.css'
import { decode, encode, emitter } from './utils'
import loader from '@monaco-editor/loader'

// find monaco target element
const monacoEl = document.getElementById('monaco')

if (!monacoEl) {
  throw new Error('Monaco element not found')
}

// set the default or initial value
let value = `function greet() {
  // welcome to chars.to 👋
  // this is a work in progress, don't use it for anything important yet
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
  fontSize: 14,
  language: 'typescript',
  lineDecorationsWidth: 0,
  lineHeight: 20,
  minimap: {
    enabled: false,
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
  value,
});

editor.focus()

// listen for events
emitter.on('clear', () => {
  editor.setValue('')
})

document.addEventListener('keydown', e => {
  if (e.key === 's' && e.metaKey) {
    e.preventDefault()
    
    window.location.hash = encode(editor.getValue())
  }
})
