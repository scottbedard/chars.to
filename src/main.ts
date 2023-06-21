import './style.css'
import 'monaco-editor/esm/vs/editor/editor.all.js'
import * as monaco from 'monaco-editor'

const monacoEl = document.getElementById('monaco')

if (!monacoEl) {
  throw new Error('Monaco element not found')
}

let value = `function greeting() {
  console.log('Hello from chars.to! 👋')
}
`

try {
  if (window.location.hash) {
    value = decodeURI(atob(window.location.hash.slice(1)))
  }
} catch { }

const editor = monaco.editor.create(monacoEl, {
  value,
  language: 'javascript',
})

document.addEventListener('keydown', e => {
  if (e.key === 's' && e.metaKey) {
    e.preventDefault()
    
    window.location.hash = btoa(encodeURIComponent(editor.getValue()))
  }
})
