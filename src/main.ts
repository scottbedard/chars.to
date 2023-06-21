import './style.css'
import * as monaco from 'monaco-editor'
// // import 'monaco-editor/esm/vs/editor/editor.all.js'
// // @ts-ignore
// import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
// // @ts-ignore
// import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
// // @ts-ignore
// import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
// // @ts-ignore
// import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
// // @ts-ignore
// import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

// // @ts-ignore
// self.MonacoEnvironment = {
//   getWorker(_: string, label: string) {
//     if (label === 'json') {
//       return new jsonWorker()
//     }
//     if (label === 'css' || label === 'scss' || label === 'less') {
//       return new cssWorker()
//     }
//     if (label === 'html' || label === 'handlebars' || label === 'razor') {
//       return new htmlWorker()
//     }
//     if (label === 'typescript' || label === 'javascript') {
//       return new tsWorker()
//     }
//     return new editorWorker()
//   },
// }

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
  value,
})

document.addEventListener('keydown', e => {
  if (e.key === 's' && e.metaKey) {
    e.preventDefault()
    
    window.location.hash = btoa(encodeURIComponent(editor.getValue()))
  }
})
