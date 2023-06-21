import './style.css'

import 'monaco-editor/esm/vs/editor/editor.all.js'
import * as monaco from 'monaco-editor'

const monacoEl = document.getElementById('monaco')

if (!monacoEl) {
  throw new Error('Monaco element not found')
}

monaco.editor.create(monacoEl, {
  value: 'console.log(\'Hello, world 👋\')',
  language: 'javascript',
});