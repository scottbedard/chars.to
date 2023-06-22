import './dark-mode'
import './style.css'
import { decode, encode } from './utils'
import { editor } from './editor'

/**
 * Constants
 */
const defaultName = 'Unnamed characters'

/**
 * Elements
 */
const saveEl = document.getElementById('save')

const clearEl = document.getElementById('clear')

const nameEl = document.getElementById('name') as HTMLInputElement

if (!clearEl || !nameEl) {
  throw new Error('one or more element not found')
}

/**
 * Editor
 */
let value = `function greet() {
  // welcome to chars.to 👋
  // this is a work in progress, don't use for anything important
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

/**
 * Event listeners
 */
clearEl.addEventListener('click', () => {
  window.location.href = ''
})

saveEl?.addEventListener('click', () => {
  window.location.hash = encode({
    name: nameEl.value ?? defaultName,
    value: editor.getValue(),
  })
})

document.addEventListener('keydown', e => {
  if (e.key === 's' && e.metaKey) {
    e.preventDefault()
    
    window.location.hash = encode({
      name: nameEl.value ?? defaultName,
      value: editor.getValue(),
    })
  }
})
