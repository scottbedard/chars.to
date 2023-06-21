import './style.css'
import 'monaco-editor/esm/vs/editor/editor.all.js'
import * as monaco from 'monaco-editor'

const monacoEl = document.getElementById('monaco')

if (!monacoEl) {
  throw new Error('Monaco element not found')
}

const getSavedValue = () => window.atob(decodeURI(window.location.hash.slice(1)))

const editor = monaco.editor.create(monacoEl, {
  value: getSavedValue(),
  language: 'javascript',
})

const getCurrentValue = () => window.btoa(encodeURI(editor.getValue()))

document.addEventListener('keydown', e => {
  if (e.key === 's' && e.metaKey) {
    e.preventDefault()
    
    window.location.hash = getCurrentValue()
  }
})
