import './dark-mode'
import './hello-worlds'
import './settings'
import './style.css'
import { encode, url } from './utils'
import { editor, setLanguage } from './editor'

import {
  clearEl,
  cogEl,
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
    document.title = '­' // <- deliberately hide the default title
    nameEl.value = ''
  }
}

setName(url.name)

// set the initial language, and update editor when it changes
languageEl.value = url.lang

languageEl.addEventListener('change', () => {
  setLanguage(languageEl.value)
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
