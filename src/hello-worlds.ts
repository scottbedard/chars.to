import { editor } from './editor'
import { languageEl } from './elements'

// generate basic hello world variables for each language

const css =
`h1 {
  color: red;
}
`

const html =
`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title></title>
</head>
<body>
  <h1>Hello, world!</h1>
</body>
</html>
`

const javascript =
`console.log(
  "Hello Javascript, let's make something we're not supposed to"
)
`

const rust =
`fn main() {
  println!("Hello fellow rustacean!");
}
`

const typescript =
`console.log(
  "Hello Typescript, let's make something awesome 🚀"
)
`

const greetings: Record<string, string> = {
  css,
  html,
  javascript,
  rust,
  typescript,
}

// listen for meta + click events to insert a hello world
languageEl.addEventListener('mousedown', e => {
  if (!e.metaKey) {
    return
  }

  e.preventDefault()

  editor.setValue(greetings?.[languageEl.value] ?? '')
})