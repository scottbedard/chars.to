import { emitter } from './utils'

const clearEl = document.getElementById('clear')

if (!clearEl) {
  throw new Error('Clear element not found')
}

clearEl.addEventListener('click', () => {
  emitter.emit('clear')
})
