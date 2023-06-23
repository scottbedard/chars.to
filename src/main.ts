import './dark-mode'
import './settings'
import './style.css'
import { decode, encode } from './utils'
import { editor, monaco } from './editor'

import {
  clearEl,
  cogEl,
  languageEl,
  nameEl,
  saveEl,
  settingsEl,
} from './elements'

/**
 * Constants
 */
const defaultName = 'Unnamed characters'

const save = () => {
  const name = nameEl.value ?? defaultName
    
  window.location.hash = encode({
    lang: languageEl.value,
    name: name,
    value: editor.getValue(),
  })

  setTitle(name)
}

const setLanguage = (lang: string) => {
  const model = editor.getModel()

  if (model) {
    monaco.editor.setModelLanguage(model, lang)
  }

  if (languageEl.value !== lang) {
    languageEl.value = lang
  }
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
 * Editor
 */
let language = 'auto'

try {
  if (window.location.hash) {
    const obj = decode(window.location.hash.slice(1))

    if ('value' in obj) {
      editor.setValue(obj.value)
    }

    if ('lang' in obj) {
      language = obj.lang
    }

    if ('name' in obj) {
      nameEl.value = obj.name
      setTitle(obj.name)
    }
  }
} catch { }

setLanguage(language)

editor.focus()

/**
 * Event listeners
 */
languageEl.addEventListener('input', () => {
  setLanguage(languageEl.value)
})

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
