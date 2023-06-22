import './dark-mode'
import './style.css'
import { decode, encode } from './utils'
import loader from '@monaco-editor/loader'

// find all elements
const clearEl = document.getElementById('clear')
const monacoEl = document.getElementById('monaco')

if (!clearEl || !monacoEl) {
  throw new Error('one or more element not found')
}

// set the default or initial value
let value = `function greet() {
  // welcome to chars.to 👋
  // this is a work in progress, don't use it for anything important yet
}`

try {
  if (window.location.hash) {
    const obj = decode(window.location.hash.slice(1))

    if ('value' in obj) {
      value = obj.value
    }
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
clearEl.addEventListener('click', () => {
  window.location.href = ''
})

document.addEventListener('keydown', e => {
  if (e.key === 's' && e.metaKey) {
    e.preventDefault()
    
    window.location.hash = encode({
      name: 'hello',
      value: editor.getValue(),
    })
  }
})
