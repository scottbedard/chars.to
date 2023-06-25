import { editor } from './editor'
import { languageEl } from './elements'

const c = 
`#include <stdio.h>
int main() {
  printf("Hello, world");

  return 0;
}
`

const clojure =
`(ns clojure.examples.hello
  (:gen-class))
(defn hello-world []
  (println "Hello, world!"))
(hello-world)
`

const cpp =
`#include <iostream>

int main() {
    std::cout << "Hello, world!";
    return 0;
}
`

const csharp = 
`namespace HelloWorld
{
    class Hello {         
        static void Main(string[] args)
        {
            System.Console.WriteLine("Hello, world!");
        }
    }
}
`

const css =
`body {
  background: #bada55;
}
`

const dart =
`void main() {
  print('Hello, world!');
}
`

const dockerfile =
`FROM scratch

COPY hello /

CMD ["/hello"]
`

const fsharp =
`printfn "Hello, world!"
`

const go =
`package main

import "fmt"

func main() {
    fmt.Println("Hello, world!")
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

const java =
`class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, world!"); 
    }
}
`

const javascript =
`function greet() {
  console.log('Hello, Javascript!');
}
`

const json =
`{
  "hello": "world"
}
`

const kotlin =
`fun main(args : Array<String>) {
  println("Hello, World!")
}
`

const less =
`@color: #bada55;

h1 {
  color: @color
}
`

const perl =
`#!/usr/bin/perl
  
use strict;
use warnings;
  
print("Hello World\n");
`

const php =
`<?php

class HelloWorld
{
    public function greeting(): string
    {
        return 'Hello, world!';
    }
}
`

const python =
`print("Hello, world!")
`

const ruby =
`class Hello
    def initialize(name)
        @name = name
    end
    def greet
        puts "Hello #{@name}!"
    end
end

hello = Hello.new("world")

hello.greet
`

const rust =
`fn main() {
  println!("Hello rustaceans!");
}
`

const scala =
`object Hello {
    def main(args: Array[String]) = {
        println("Hello, world!")
    }
}
`

const scss =
`$color: #bada55;

h1 {
  color: $color;
}
`

const shell =
`#!/bin/bash

echo "Hello, world!"
`

const sql =
`SELECT * FROM greetings WHERE phrase = "Hello, world!";
`

const typescript =
`function greet(): void {
  console.log('Hello, Typescript!');
}
`

const vue =
`<template>
  <div>
    <h1>{{ greeting }}</h1>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const greeting = ref('Hello world')
</script>
`

const xml =
`<?xml version="1.0" encoding="UTF-8"?>
<text>
  <para>hello world</para>
</text>
`

const yaml =
`version: 1.0

greetings:
    hello: Hello, world!
`

const greetings: Record<string, string> = {
  c,
  clojure,
  cpp,
  csharp,
  css,
  dart,
  dockerfile,
  fsharp,
  go,
  html,
  java,
  javascript,
  json,
  kotlin,
  less,
  perl,
  php,
  python,
  ruby,
  rust,
  scala,
  scss,
  shell,
  sql,
  typescript,
  vue,
  xml,
  yaml,
}

// listen for meta + click events to insert a hello world
languageEl.addEventListener('mousedown', e => {
  if (e.metaKey) {
    console.log(`hello world: [${languageEl.value}]`)
    editor.setValue(greetings?.[languageEl.value] ?? '')
  }
})

// also listen for meta + enter to insert the current language hello world
languageEl.addEventListener('keydown', e => {
  if (e.key === 'Enter' && e.metaKey) {
    console.log(`hello: [${languageEl.value}]`)
    editor.setValue(greetings?.[languageEl.value] ?? '')
  }
})