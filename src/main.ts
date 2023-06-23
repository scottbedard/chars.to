import './dark-mode'
import './settings'
import './style.css'
import { decode, encode } from './utils'
import { editor } from './editor'

/**
 * Constants
 */
const defaultName = 'Unnamed characters'

const save = () => {
  const name = nameEl.value ?? defaultName
    
  window.location.hash = encode({
    name: name,
    value: editor.getValue(),
  })

  setTitle(name)
}

const setTitle = (name?: unknown) => {
  if (!(typeof name === 'string')) {
    document.title = 'chars.to'

    return
  }

  const title = name.trim()

  document.title = title.length ? `chars.to - ${title}` : 'chars.to'
}

/**
 * Elements
 */
const saveEl = document.getElementById('save')

const clearEl = document.getElementById('clear')

const nameEl = document.getElementById('name') as HTMLInputElement

const cogEl = document.getElementById('cog')

const settingsEl = document.getElementById('settings') as HTMLDialogElement

if (!cogEl || !clearEl || !nameEl || !settingsEl) {
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
      setTitle(obj.name)
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
  setTitle()
})

saveEl?.addEventListener('click', save)

cogEl.addEventListener('click', () => {
  settingsEl.showModal()
})

settingsEl.addEventListener('click', e => {
  const  rect = settingsEl.getBoundingClientRect()

  const isInDialog = rect.top <= e.clientY
    && e.clientY <= rect.top + rect.height
    && rect.left <= e.clientX
    && e.clientX <= rect.left + rect.width;

  if (!isInDialog) {
      settingsEl.close();
  }
})

document.addEventListener('keydown', e => {
  if (e.key === 's' && e.metaKey) {
    e.preventDefault()
    save()
  }
})
