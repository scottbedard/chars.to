# chars.to

[![Netlify](https://img.shields.io/netlify/cd0b4a1b-921b-4d5f-902a-7fe84a963ab3)](https://chars.to)
[![License](https://img.shields.io/github/license/scottbedard/chars.to?color=blue)](https://github.com/scottbedard/chars.to/blob/main/LICENSE)

This project was inspired by the excellent [Kopy.io](https://kopy.io).

While useful, there are two reasons I feel it's time to move on. First, their certificates have expired. This makes sharing proprietary or sensitive data completely off the table, and links that open with a security warning are pretty off putting.

Second, the utility of a paste bin is it's permanence. More often than not, someone's already solved the same problem, and we owe them a debt of gratitude. But if their solution is lost to time, we'll have to debug all over again. This project hopes to be a successor to Kopy. It is very similar, but has a handful of differences.

- Data never expires, everything is encoded in the url
- Monaco provides more modern feel
- Titles make the browser tab more readable
- Unsaved changes display a warning on exit
- Light and dark modes
- Reasonable mobile support
- Open source under the MIT license

[Start sending characters &rarr;](https://chars.to)

## Development

This project uses [`pnpm`](https://pnpm.io/installation) as the package manager. Once that is installed, run the following to create a dev environment.

```sh
pnpm install

pnpm run dev
```

The website should now be running at [`http://localhost:5173`](http://localhost:5173/)

## License

[MIT](https://github.com/scottbedard/chars.to/blob/main/LICENSE)

Copyright (c) 2023-present, Scott Bedard
