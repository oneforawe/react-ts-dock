# React-TS-Dock

This repository is a template for [React](https://react.dev) app projects
written in [TypeScript](https://www.typescriptlang.org) and contained with
[Docker](https://www.docker.com/).  The React app code is based on the old
create-react-app "CRA" infrastructure (so has no meta-framework like Next.js).

See the [tech stack notes](./doc/Stack.md) for a fuller list of technologies
used.  You can see a [previous version](https://github.com/oneforawe/react-ts)
of this repo that doesn't use Docker and
[another version](https://github.com/oneforawe/react-next-ts) of this repo that
uses a more modern stack, but that version is still in development.

The purpose of this repo is:

* to act as a template to easily start new projects without re-writing common
  "boilerplate" code and configurations,
* to act as a reference to recall how to write certain patterns of code and
  accomplish certain tasks (such as achieving robust file-line-ending control
  with the repo code and steps below, to avoid issues later in development), and
* to demonstrate this particular approach and organization of code for any such
  Dockerized React TypeScript project, using a generic folder structure,
  [code linting](./doc/Development.md) (geared for usage with
  [VSCode](https://code.visualstudio.com/)), and optional features such as redux
  state management, helper hooks for cyclic state refreshing, services with
  external API calls, and so on.

See these external
[web dev notes](https://github.com/oneforawe/web-dev-notes/blob/main/setup-1.md)
for general notes and elaboration on setup with node.  See the
[development notes](./doc/Development.md) for tips on setting up the repo
properly with VSCode and some details on Docker and linting.  And see the
[creation notes](./doc/Creation.md) for details on how this repo was created and
how to re-create it.

## Usage

Note: To distinguish commands executed in the host system versus those executed
in the container system, I use the symbol `>` for the host system command line
prompt and the symbol `$` for the container system command line prompt.

To use this repo as a template starting point for your own project, first you
will get this repo set up properly to run the app.  And once the app can run and
you can verify that automatic linting is enabled in VSCode (via an extension to
allow editing from within the docker container), the repo will already be in a
git-initialized state (due to the set-up script) where you can develop your own
project from from there.  The set-up scripts referenced below include steps on
resetting and initializing the repo as part of setting up; open the scripts to
get further explanation.

To run the app in this repo, use a (virtual) terminal such as iTerm2 or Windows
Terminal or the embedded terminal in VSCode, running a shell such as GNU Bash or
PowerShell, and make sure that [git](https://git-scm.com) is installed and
execute the following instructions and commands.

0. See
  [web dev notes](https://github.com/oneforawe/web-dev-notes/blob/main/setup-1.md)
  and [development notes](./doc/Development.md) for requisites.

1. Get a local copy/clone of the repo.  
  `> git clone https://github.com/oneforawe/react-ts-dock.git`

2. Enter the repo and execute the appropriate set-up script.  
  `> cd react-ts-dock`  
  For Bash: `> bash ./tools/set-up.bash`  
  For PowerShell: `> .\tools\set-up.ps1`  
  Note that the scripts have explanations of each step. Doing each step yourself
  by hand and reading the explanations could be an educational exercise.

3. Optional:  
  Set up an account with [WeatherAPI.com](https://www.weatherapi.com/), get an
  API key, and edit the secrets file to include the API key as a string,
  otherwise the weather component will not show weather reports.

4. Create the project's docker image and container, and enter the container.

   * `> docker compose -f .devcontainer/docker-compose.yml build \`  
     `&& docker compose -f .devcontainer/docker-compose.yml up -d`
   * `> docker compose -f .devcontainer/docker-compose.yml exec node-dev-for-app bash --login`

5. In the container, enter the `react-app` directory, install the NPM packages,
  and then start the app in development/live-edit mode.

   * `$ cd react-app`
   * `$ npm install`
   * `$ npm start`

6. Test, Confirm, Play

   * In the host system, open a browser at `http://localhost:3000/` and ensure
     that the site is working: the DateTime Component should have accurate
     current date and time, the Counter Component should work intuitively, and
     if you've added an API key for the Weather Report Component, it should show
     data that is not "undefined".  If the site isn't working, then some
     troubleshooting is necessary to fix your set-up.
   * In the host system, open VSCode with a remote development extension, as
     described in the development notes section on
     [remote development](./doc/Development.md#remote-development), to edit
     files in the container.  Edit the `react-app/src/components/App.tsx` file,
     for instance, changing the text "View Source" to "View Source Now", and
     save the file.  You should immediately (or very quickly) see the text on
     the site in the browser change to reflect the edit.  Also, try making an
     edit to change the indentation of one of the JSX tags; when you save the
     file, the linting/formatting should automatically correct the indentation.
   * After testing the site and confirming live-editing and auto-linting as
     described above, feel free to play around with the site and code to
     become familiar with the project template.

7. When ready, you can develop the code to an appropriate starting point for
   your own project, start adding commiting your code to your repo, and add your
   own git-remote source if desired.

## To Do

A to-do list for continuing development of this template:

* Investigate the possibility of moving the `.prettierignore` file into the
  `react-app` (at `src/.config/`) with an edited `package.json` as seen in
  commit `342aa35` (though that set-up didn't work).  Or consider using a
  formatter other than Prettier for json, yaml, css, and scss.
* Investigate simplifying the process to automatically fix file-line-endings,
  especially forcing git to use the attributes file in the config folder and
  seeing if `git add --renormalize .` can work; that would simplify files and
  steps.  See the creation notes section on the
  [config folders](./doc/Creation.md#config-folders) for more detail on this
  issue.
