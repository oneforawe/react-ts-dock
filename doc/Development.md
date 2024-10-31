# Development

This repo is designed for usage with the following IDE (integrated development
environment), configurations, and extensions.

The editor/IDE [VSCode](https://code.visualstudio.com/) (aka "Code", Visual
Studio Code from Microsoft) can perform automatic linting (syntax and style
flagging and enforcement / correction) and type-checking, as well as many other
useful tasks and functionalities, some provided by
[extensions](https://code.visualstudio.com/docs/editor/extension-marketplace)
that can be installed into the editor.

Included in this repo is the workspace settings (at `.vscode/settings.json`)
that controls the configuration of VSCode while working in this repo/project.

Note: A separate user settings file can control the configuration globally for a
user on a particular machine, and those user settings can be partly or wholy
overridden by the workspace settings file.

With VSCode installed, you can install these VSCode extensions to enable linting
and gain other useful features:

* Remote (Container) Development
  * Dev Containers: `ms-vscode-remote.remote-containers`  
    This extension is needed since the linting will rely on some NMP packages
    installed in the container, and so the editing will be done from the
    container.  
    **NOTE**: This extension is installed for host system, but the other extensions
    below should be installed when accessing the container, or it would be good
    to find a method to install the packages in the host system and then
    automatically have them sync or install for the container as well.
* Linting
  * Markdownlint: `DavidAnson.vscode-markdownlint`
  * Prettier: `esbenp.prettier-vscode`
  * ESLint: `dbaeumer.vscode-eslint`
  * Stylelint: `stylelint.vscode-stylelint`
  * ShellCheck: `timonwong.shellcheck`
  * Pylint: `ms-python.pylint` (not used but referenced in `settings.json`)
* General
  * GitLens: `eamodio.gitlens`  (you may want to usually keep this extension disabled)
  * Highlight Trailing White Spaces: `ybaumes.highlight-trailing-white-spaces`
* Recommended Utilities
  * CSS Navigation: `pucelle.vscode-css-navigation`
  * Indent 4-to-2: `compulim.indent4to2`

## Remote Development

To use VSCode for container development:

1. Start the container.
2. Open a new window of VSCode and in the main left menu, hover the cursor over
   each icon for a few seconds to see what each represents.
3. In the main left menu, select the icon to open the "Remote Explorer".
4. Find the `react-ts-docked` container, hover the mouse over it, and select the
   icon to "Attach in Current Window".
5. In the main left menu, select the icon to open the "Extensions".
6. Ensure that all of the desired extensions are installed in the container.
7. In the main left menu, select the icon to open the "Source Control".
8. If a button to "Manage Unsafe Repositories" is present, click on it and
   select the `react-ts-docked` container to allow VSCode to show the git status
   of the files in the file "Explorer" menu.

## ESLint and Stylelint

Besides running [ESLint](https://eslint.org/) and
[Stylelint](https://stylelint.io/) automatically when viewing and editing files
in VSCode, you can also run each of them in the container shell/terminal.

In the terminal, to run linting on many files and view issues with the files,
change directory into the sub-project root folder `react-app` and run the
following commands:

* `$ npx eslint src --ext .ts,.js,.tsx`
* `$ npx stylelint "**/*.{css,scss}" --ignore-pattern "build/*"`

If there are no errors or warnings, there will be no output.

To actually fix, use the option `--fix` with a command.  (With ESLint you can
also use `--fix-dry-run` for a simulation).

For more help:

* ESLint: use `$ npx eslint --help` or look
  [here](https://eslint.org/docs/latest/use/command-line-interface).
* Stylelint: see more options [here](https://stylelint.io/user-guide/options/).
