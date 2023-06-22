if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
}

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
  document.documentElement.classList.remove('dark')
  syncIcons()
}

const setLight = () => {
  localStorage.theme = 'light'
  document.documentElement.classList.remove('dark')
  syncIcons()
}

const setDark = () => {
  localStorage.theme = 'dark'
  document.documentElement.classList.add('dark')
  syncIcons()
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