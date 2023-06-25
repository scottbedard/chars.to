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

nameEl.addEventListener('input', syncFavicon)

// set the initial language, and update editor when it changes
languageEl.value = url.lang

languageEl.addEventListener('change', () => {
  setLanguage(languageEl.value)
  syncFavicon()
})

// clear everything when the trash is clicked
clearEl.addEventListener('click', () => {
  document.title = ''
  nameEl.value = ''
  window.location.href = ''
})

// save when button is clicked or meta + s is pressed
const save = () => {
  setName(nameEl.value)

  window.location.hash = encode({
    lang: languageEl.value,
    name: nameEl.value,
    value: editor.getValue(),
  })
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
