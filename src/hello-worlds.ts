import { editor } from './editor'
import { languageEl } from './elements'

// generate basic hello world variables for each language
const c = 
`#include <stdio.h>
int main() {
  // may the force be with you
  printf("Hello, World!");

  return 0;
}
`

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
  "Hello Typescript, let's make something awesome"
)
`

const vue =
`<template>
  <div>
    <h1>Greetings, {{ name }}!</h1>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const name = ref('Professor Farnsworth')
</script>
`

const greetings: Record<string, string> = {
  c,
  css,
  html,
  javascript,
  rust,
  typescript,
  vue,
}

// listen for meta + click events to insert a hello world
languageEl.addEventListener('mousedown', e => {
  if (e.metaKey) {
    editor.setValue(greetings?.[languageEl.value] ?? '')
  }
})

// also listen for meta + enter to insert the current language hello world
languageEl.addEventListener('keydown', e => {
  if (e.key === 'Enter' && e.metaKey) {
    editor.setValue(greetings?.[languageEl.value] ?? '')
  }
})