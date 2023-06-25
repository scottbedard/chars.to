## chars.to

![Netlify](https://img.shields.io/netlify/cd0b4a1b-921b-4d5f-902a-7fe84a963ab3)
[![License](https://img.shields.io/github/license/scottbedard/chars.to?color=blue)](https://github.com/scottbedard/chars.to/blob/main/LICENSE)

This project was inspired by the excellent [kopy.io](https://kopy.io). When their SSL certificates expired, I decided to build this as a successor. The functionality is mostly the same, but with a handful of small improvements.

- Saved pages do not expire
- Monaco was chosen for a better editor experience
- Pages may be titled for more readable browser tabs
- An unsaved changes warning is displayed on exit
- Light and dark modes have been added
- Project is open source under the MIT license

[Start sending code &rarr;](https://chars.to)

## Local development

The code for this project has been kept very minimal. There is no html templating language, javascript framework, or css preprocessor. To get started, [install pnpm](https://pnpm.io/installation) and run the following commands.

```
pnpm install

pnpm run dev
```

You should now see the website running at [`http://localhost:5173`](http://localhost:5173/).

## Privacy

Unlike kopy.io, all data is stored in the url. This means that your code is never stored in a database, and cannot be seen by anyone who does not have the URL. That said, **<ins>the URL is not encrypted and does not expire</ins>**.

Once a page has been shared, there is no way to invalidate the URL or destroy the data it contains.

## License

[MIT](https://github.com/scottbedard/chars.to/blob/main/LICENSE)

Copyright (c) 2023-present, Scott Bedard
