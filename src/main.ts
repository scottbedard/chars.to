import './dark-mode'
import './hello-worlds'
import './settings'
import './style.css'
import { encode, url } from './utils'
import { editor, setLanguage } from './editor'

import {
  clearEl,
  cogEl,
  faviconEl,
  languageEl,
  nameEl,
  saveEl,
  settingsEl,
} from './elements'

// set the page title and input, and update when it changes
const setName = (name: string) => {
  const cleaned = name.trim()

  if (cleaned.length) {
    document.title = cleaned
    nameEl.value = cleaned
  } else {
    document.title = 'Unnamed chars'
    nameEl.value = ''
  }

  syncFavicon()
}

setName(url.name)

// sync the favicon color
const syncFavicon = () => {
  if (
    url.name !== nameEl.value ||
    url.lang !== languageEl.value ||
    url.value !== editor.getValue()
  ) {
    faviconEl.setAttribute('href', 'code-2-unsaved.svg')

    return
  }

  faviconEl.setAttribute('href', 'code-2-idle.svg')
}

editor.onDidChangeModelContent(syncFavicon)

nameEl.addEventListener('input', () => {
  document.title = nameEl.value ? nameEl.value : 'Unnamed chars'

  syncFavicon
})

// set the initial language, and update editor when it changes
languageEl.value = url.lang

languageEl.addEventListener('change', () => {
  setLanguage(languageEl.value)
  syncFavicon()
})

// clear editor with undo-stops when trash button is clicked
clearEl.addEventListener('click', () => {
  const model = editor.getModel()

  if (model) {
    editor.pushUndoStop()

    editor.executeEdits('name-of-edit', [
      {
        range: model.getFullModelRange(),
        text: '',
      },
    ])

    editor.pushUndoStop()
  }

  editor.focus()

  syncFavicon()
})

// save when button is clicked or meta + s is pressed
const save = () => {
  setName(nameEl.value)

  url.lang = languageEl.value
  url.name = nameEl.value
  url.value = editor.getValue()

  window.location.hash = encode(url)

  editor.focus()

  syncFavicon()
}

saveEl.addEventListener('click', save)


// manage keyboard controls
document.addEventListener('keydown', e => {
  if (e.metaKey && e.key === 's') {
    e.preventDefault()
    save()
  }

  else if (e.metaKey && e.key === ';') {
    e.preventDefault()
    languageEl.focus()
  }
})

// open the settings modal when cog is clicked
cogEl.addEventListener('click', () => {
  settingsEl.showModal()
})

// listen for clicks outside the settings modal to close
settingsEl.addEventListener('click', e => {
  const rect = settingsEl.getBoundingClientRect()

  const isInsideRect = rect.top <= e.clientY
    && e.clientY <= rect.top + rect.height
    && rect.left <= e.clientX
    && e.clientX <= rect.left + rect.width;

  if (!isInsideRect) {
      settingsEl.close();
  }
})

// display unsaved changes warning
window.addEventListener('beforeunload', e => {
  if (
    url.name !== nameEl.value ||
    url.lang !== languageEl.value ||
    url.value !== editor.getValue()
  ) {
    e.preventDefault()
    e.returnValue = ''
  }
})
