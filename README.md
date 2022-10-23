# React Template

This TypeScript based template is designed to get you up and running with a bunch of awesome front-end technologies.

The primary goal of this project is to provide a stable foundation upon which to build modern web applications. Its purpose is not to dictate your project structure or to demonstrate a complete real-world application, but to provide a set of tools intended to make front-end development robust, easy, and, most importantly, fun.

## Tips & Tricks
- [favicon generator](https://www.favicon-generator.org/)
- compression
  - SVG: [SVGO](https://github.com/svg/svgo) or [SVGOMG](https://jakearchibald.github.io/svgomg/)
  - [PNG & JPEG](https://tinypng.com/)
  - [fonts](https://www.fontsquirrel.com/tools/webfont-generator)
- [10 npm Security Best Practices](https://snyk.io/blog/ten-npm-security-best-practices/)
- redux
  - [recipes](https://redux.js.org/recipes/recipe-index)
  - [style guide](https://redux.js.org/style-guide/style-guide)
  - [redux toolkit](https://redux.js.org/redux-toolkit/overview)
- [TypeScript docs](https://www.typescriptlang.org/docs/)
- [end-to-end testing](https://www.cypress.io/)
- [organized & efficient UI](https://storybook.js.org/)
- [one option of `./src` architecture](https://www.robinwieruch.de/react-folder-structure)
- Git Hooks
  - [husky](https://github.com/typicode/husky)
  - [lint-staged](https://github.com/okonet/lint-staged)
- Linaria
  - https://pustelto.com/blog/css-vs-css-in-js-perf
  - https://github.com/callstack/linaria/blob/master/docs/BENEFITS.md#why-use-linaria
  - https://github.com/stylelint/stylelint/issues/4119
  - https://github.com/callstack/linaria/issues/409#issuecomment-593968972
  - https://github.com/callstack/linaria/blob/master/docs/DYNAMIC_STYLES.md

## Features
- support for `.css` & `.js` files
- TypeScript
- linaria
- Normalize.css
- browserslist
- ESLint
- Prettier
- stylelint
- Babel
- web-vitals
- webpack
  - code splitting (css & js)
  - tree shaking
  - terser
- Jest & React Testing Library
- optional libraries
  - styled-media-query
  - @reduxjs/toolkit
  - polished
  - js-cookie
  - axios
  - @loadable/component (enable code splitting)

## Installation

Install the project dependencies.

```bash
$ npm i
```

We recommend using the [Redux DevTools Chrome Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd). Using the chrome extension allows your monitors to run on a separate thread and affords better performance and functionality. It comes with several of the most popular monitors, is easy to configure, filters actions, and doesn't require installing any packages in your project.

## Running the Project

After completing the [installation](#installation) step, you're ready to start the project!

```bash
$ npm run start  # Start the development server
```

While developing, you will probably rely mostly on `npm run start` however, there are additional scripts at your disposal:

|`npm run <script>` |Description|
|-------------------|-----------|
|`build`            |Build prod app to ./build|
|`lint:css`         |Lint the project for potential errors|
|`lint:css:fix`      |Lint the project and fixes all correctable errors|
|`lint:js`          |Lint the project for potential errors|
|`lint:js:fix`       |Lint the project and fixes all correctable errors|
|`start`            |Serve your dev app at `localhost:3000`|
|`start:prod`       |Serve your prod app at `localhost:8080`|
|`test`             |Run unit tests with Jest|
|`test:watch`       |Run `test` in watch mode to re-run tests when changed|
|`test:coverage`    |Generate information about coverage to ./coverage|

## Testing

To add a unit test, create a `.spec.tsx` or `.test.tsx` file anywhere inside of `./src`. Jest and webpack will automatically find these files.
