import * as monaco from 'monaco-editor-core'

const syncIcons = () => {
  const auto = document.getElementById('auto-icon')
  const moon = document.getElementById('moon-icon')
  const sun = document.getElementById('sun-icon')
  
  auto?.classList.add('hidden')
  moon?.classList.add('hidden')
  sun?.classList.add('hidden')

  if (localStorage.theme === 'dark') {
    moon?.classList.remove('hidden')

    return
  }

  if (localStorage.theme === 'light') {
    sun?.classList.remove('hidden')

    return
  }

  auto?.classList.remove('hidden')
}

const setAuto = () => {
  localStorage.removeItem('theme')
  monaco.editor.setTheme('vs-light')
  document.documentElement.classList.remove('dark')
  syncIcons()
}

const setLight = () => {
  localStorage.theme = 'light'
  monaco.editor.setTheme('vs-light')
  document.documentElement.classList.remove('dark')
  syncIcons()
}

const setDark = () => {
  localStorage.theme = 'dark'
  monaco.editor.setTheme('vs-dark')
  document.documentElement.classList.add('dark')
  syncIcons()
}

if (!('theme' in localStorage)) {
  setAuto()
} else if (localStorage.theme === 'dark' || !window.matchMedia('(prefers-color-scheme: dark)').matches) {
  setDark()
} else {
  setLight()
}

document.getElementById('dark-mode')?.addEventListener('click', () => {
  if (localStorage.theme === 'dark') {
    return setLight()
  }

  if (localStorage.theme === 'light') {
    return setAuto()
  }

  setDark()
})

syncIcons()