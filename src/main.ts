import './style.css'
import 'monaco-editor/esm/vs/editor/editor.all.js'
import * as monaco from 'monaco-editor'

const monacoEl = document.getElementById('monaco')

if (!monacoEl) {
  throw new Error('Monaco element not found')
}

const defaultValue = `
function echoCatchPhrase() {
  console.log('Wubba-lubba-dub-dub!')
}
`

const editor = monaco.editor.create(monacoEl, {
  value: window.location.hash
    ? window.atob(window.location.hash.slice(1))
    : defaultValue,
  language: 'javascript',
})

const getCurrentValue = () => window.btoa(editor.getValue())

document.addEventListener('keydown', e => {
  if (e.key === 's' && e.metaKey) {
    e.preventDefault()
    
    window.location.hash = getCurrentValue()
  }
})
