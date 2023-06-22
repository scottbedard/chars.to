import './dark-mode'
import './style.css'
import { decode, encode } from './utils'
import { editor } from './editor'

// find all elements
const clearEl = document.getElementById('clear')
const nameEl = document.getElementById('name') as HTMLInputElement

if (!clearEl || !nameEl) {
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

    if ('name' in obj) {
      nameEl.value = obj.name
    }
  }
} catch { }

editor.setValue(value)

editor.focus()

// listen for events
clearEl.addEventListener('click', () => {
  window.location.href = ''
})

document.addEventListener('keydown', e => {
  if (e.key === 's' && e.metaKey) {
    e.preventDefault()
    
    window.location.hash = encode({
      name: nameEl.value ?? 'Unnamed characters',
      value: editor.getValue(),
    })
  }
})
