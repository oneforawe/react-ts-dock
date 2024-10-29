# Creation of the Repo

Notes:

* The commands below were not executed in the order shown, but the order
  shown is more organized and should be appropriate.
* To distinguish commands executed in the host system versus those executed in
  the container system, I use the symbol `>` for the host system command line
  prompt and the symbol `$` for the container system command line prompt.

## Strategy

The project template code in this repo is intended to be downloaded/cloned to a
host system but will run from within a container system via Docker in order to
keep the app environment and dependencies isolated and independent of the host
system.  Ideally, this keeps the host system clean and the container system
reproducible and consistent, especially in development.  The code will be
mounted into the container from the host system, so live edits can be made from
within the host system while developing in a live-edit mode, and those edits
will be seen to immediately affect the running container processes in that
case.  Processes within the container may also modify the code, and those
changes will be likewise immediately available in the host code.  So, for
instance, during the process of creating this project, after installing
node/npm/npx in the container, `npx create-react-app` can be executed in the
container to create a React project template that is available in the host
system for further development.

## Prerequisites

This project template has prerequisites or co-requisites, such as:

* Development
  * editors and extensions (especially Visual Studio Code)
* Web-Development
  * shell (bash or zsh, etc)
  * version control (git)
  * secure connections (ssh)
  * browser (for example: Chrome, DevTools, Redux DevTools)
  * containerization (Docker: Docker Desktop, Docker Engine)

## Initialize Git, Docker, React

The following shell (bash/zsh) commands were used to initialize the repository
in a host system.

* Create and enter the project folder/directory.  
  `> mkdir react-ts-dock`  
  `> cd react-ts-dock`
* Create initial project documentation.  
  Create top-level `README.md` file and begin adding content.  
  Create documentation folder: `> mkdir doc`  
  Create `/doc/Creation.md` document and begin adding content.
* Git: initialize and add config files and remote.
  * Initialize the project as a git repository.  
    `> git init`
  * Create a `.config` folder to hold config files, samples, and templates.  
    `> mkdir .config`
  * Create a `user.gitconfig_template` file in that `.config` folder.
  * Create a `user.gitconfig` file in that `.config` folder, based on the
    template, specifying a developer (in my case, me, the repo author) to
    contribute to the repo.  This file is optional, depending on the method of
    connecting to the remote source of the repo.
  * Create a `.gitignore` file, in particular ignoring the optional file
    `> .config/user.gitconfig`.
  * Create a `.gitconfig` file at the project root, referring to that
    `.gitignore` file and the optional `user.gitconfig` file.  (If no
    `user.gitconfig` file exists in the `.config` folder, git should silently
    ignore the error.)
  * Apply the `.gitconfig` file to the repo.  
    `> git config --local include.path ../.gitconfig`
  * Set up git remote (optionally using ssh, where ssh config has already been
    set up with alias and key for github).  
    `> git remote add origin git@github:oneforawe/react-ts-dock.git`  
    `> git push --set-upstream origin main`
* Docker: initialize and enter container.
  * Create the initial Docker infrastructure that will create a container for
    the React app.  
    Create `Dockerfile`, `docker-compose.yml`, and `.dockerignore`.  
    (Discovered that Alpine may not be the best image to use with Node; instead
    use Bitnami/Minideb, a minimal Debian image.)  
    Arrange to use a node manager (nvm) to install node, preparing to use node
    to create the React project.
  * Create the Docker image and build and run the container.  
    `> docker compose build && docker compose up -d`
  * Enter the container.  
    `> docker compose exec node-dev-for-app bash --login`

While in the container, initialize the React app using the version of Node
(npx) installed with the Docker files.

* React: initialize the React app in the docker container.
  * In the project folder `~/react-ts`, initialize the react-app.  
    `$ npx create-react-app react-app --template typescript`
  * Enter the React app and check live-edits.  
    `$ cd react-app`  
    At this point, the initial React app should be able to run in development
    mode using `npm start` in the container, with the app visible at
    <http://localhost:3000/> in a host browser, and the files should be
    editable in both host and container, being roughly immediately seen to
    change in each place and with changes to the React code immediately visible
    in the browser on the host.

## Remove Warning

The command below was used to remove a [warning](./Warnings.md) related to
Create-React-App and Babel when executing `$ npm run build`.

* `$ npm install --save-dev @babel/plugin-proposal-private-property-in-object`

## Reorganize

* TypeScript config  
  Get a more-commented TypeScript config file (and edit to combine with the
  create-react-app original).  
  `$ mv tsconfig.json tsconfig-copy.json && npx tsc --init`
* Dependencies  
  Move some NPM packages in `package.json` from `dependencies` to
  `devDependencies`.
  * `$ npm install --save-dev @types/node @types/react @types/react-dom @types/jest`
  * `$ npm install --save-dev @testing-library/react @testing-library/user-event @testing-library/jest-dom`
  * `$ npm install --save-dev react-scripts`  
    (`--save-dev` so can use `npm audit --omit=dev` to see cleaner audit;
    [reference](https://github.com/facebook/create-react-app/issues/11174))
  * `$ npm install --save-dev typescript@^4`  
    (`@^4` to fix dependency issue found with `react-scripts` and, later, `craco`)

## Improve Imports

The packages [craco](https://craco.js.org) and
[react-app-alias](https://github.com/oklas/react-app-alias) enable import
aliases and abbreviations and generally enable more concise import statements.
These packages need additional `json5` support so the `tsconfig.json` (a JSON5
file with comments) does not have syntax errors due to the comments and other
differences from the normal JSON syntax.

* add packages
  * `$ npm install --save-dev @craco/craco @craco/types`
  * `$ npm install --save-dev react-app-alias`
  * `$ npm install --save-dev json5`
* new `react-app/.config` folder with two new files
  * new file: `craco.config.js`
  * new file: `tsconfig.paths.json`
* modified: `tsconfig.json`
  * Add the line `"extends": "./.config/tsconfig.paths.json",` to incorporate
    the paths config for path aliases.
  * Add the line `"baseUrl": "./src",` to resolve non-relative import paths.
* modified: `package.json`
  * In the scripts, change the four `react-scripts` commands with `craco`
    commands, so that, for instance `react-scripts start` becomes `craco start`.
  * Add the line `"cracoConfig": "./.config/craco.config.js",` to incorporate
    the craco config.

At this point the source files for the React app were reorganized and modified,
for instance, to start using non-relative import paths (in `src/index.tsx` and
later elsewhere).

## Linting

Automatic code-linting can be implemented using [ESLint](https://eslint.org)
with [Stylistic](https://eslint.style/) and [Stylelint](https://stylelint.io),
along with the `.vscode/settings.json` file, so fixes are applied automatically
each time a file is saved.

* new folder: `.vscode`
* new file: `.vscode/settings.json`

I didn't use the auto-configuration and setup with `npm init @eslint/config`,
since it had errors when it attempts to install all of the following:  
`eslint@latest`  
`eslint-plugin-react@latest`  
`@typescript-eslint/eslint-plugin@latest`  
`@typescript-eslint/parser@latest`

Some of these packages already come with `react-scripts`. Instead, I avoided
[warnings](./Warnings.md) by installing the following:

* `$ npm install --save-dev eslint`
* `$ npm install --save-dev @stylistic/eslint-plugin`
* `$ npm install --save-dev stylelint`
* `$ npm install --save-dev stylelint-config-standard-scss`
* `$ npm install --save-dev --save-exact prettier`

See the [troubleshoot](./Troubleshoot.md) file for some notes on how to get the
linting auto-fixing to work.
