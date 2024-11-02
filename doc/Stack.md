# Tech Stack

The main stack of technologies:

* OS:
  [GNU/Linux](https://en.wikipedia.org/wiki/Linux) or
  [MacOS](https://en.wikipedia.org/wiki/MacOS) or
  [Windows](https://en.wikipedia.org/wiki/Microsoft_Windows)
  (with or without
  [WSL](https://learn.microsoft.com/en-us/windows/wsl/))
* Container:
  [Docker](https://www.docker.com/): Docker Engine, Docker Desktop  
  (where the docker container is essentially a virtual machine to contain and
  isolate the development environment from the host system)
* Languages:
  [JavaScript](https://developer.mozilla.org/en-US/docs/Glossary/JavaScript)/[TypeScript](https://www.typescriptlang.org)
  (with
  [JSX](https://react.dev/learn/writing-markup-with-jsx)/[TSX](https://react.dev/learn/typescript#typescript-with-react-components)),
  [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML),
  [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)/[SCSS](https://sass-lang.com/guide/)
* RunTime:
  [Node.js](https://nodejs.org/en)
  (non-browser JavaScript runtime, with
  [npm](https://docs.npmjs.com/about-npm),
  [npx](https://docs.npmjs.com/cli/v10/commands/npx)
  tools)
* RunTime Manager:
  [nvm](https://github.com/nvm-sh/nvm) and
  [nvm-windows](https://github.com/coreybutler/nvm-windows)
* Package Manager:
  [npm](https://nodejs.org/en/learn/getting-started/an-introduction-to-the-npm-package-manager)
  (using the
  [npm](https://www.npmjs.com/)
  registry)
* Frontend Framework:
  [React.js](https://react.dev)
* Meta-Framework:
  None
  (still using the legacy
  [create-react-app](https://legacy.reactjs.org/docs/create-a-new-react-app.html)
  to initiate)
* Editor/IDE:
  [VSCode](https://code.visualstudio.com/) (Micosoft Visual Studio Code)
  with various
  [extensions](https://code.visualstudio.com/docs/editor/extension-marketplace)
* Linting:
  * Markdown linting with
    [markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)
  * JavaScript/TypeScript linting with [ESLint](https://eslint.org) and
    [Stylistic](https://eslint.style/)  
    (where stylistic is integrated in the config file `.config/.eslintrc.json`)
  * CSS/SCSS linting with [Stylelint](https://stylelint.io) (validation) and
    [Prettier](https://prettier.io/) (formatting)
  * JSON linting with [Prettier](https://prettier.io/)
  * Bash shell linting with
    [ShellCheck](https://marketplace.visualstudio.com/items?itemName=timonwong.shellcheck)
