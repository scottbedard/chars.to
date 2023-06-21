import './style.css'
import 'monaco-editor/esm/vs/editor/editor.all.js'
import * as monaco from 'monaco-editor'

const monacoEl = document.getElementById('monaco')

if (!monacoEl) {
  throw new Error('Monaco element not found')
}

function utf8_to_b64(str) {
  return encodeURIComponent(str)
}

function b64_to_utf8(str) {
  return decodeURIComponent(str)
}

let value = `function echoCatchPhrase() {
  console.log('Wubba-lubba-dub-dub!')
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
