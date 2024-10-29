# Troubleshoot

## Linting

See the [development notes](./Development.md) for info on the intended editor
and extensions.

Note that the linting auto-fixing -- that is, auto-fixing of syntax and
formatting when saving files, comes from the `.vscode/settings.json` settings
such as `editor.formatOnSave` and `editor.codeActionsOnSave` + `source.fixAll`.

The `.vscode` folder with the `settings.json` file apparently must be at the
root folder when opening the project files in VS Code in order for auto-fixing
to work when editing in VS Code.

In other words, in order for auto-fixing to work when using VS Code:

* Either one must "Open Folder" at the root `react-ts-dock` folder,
* or one must place a copy of the `.vscode` folder (and its contents) in
  whatever folder is opened with VS Code, such as the `react-app` folder if one
  wants to just open that portion of the project.

You may need to install VSCode version 1.85 or greater for it to accept the
`settings.json` file as it is written.

Make sure that the linting extensions are not disabled when you want the linting
to be active.
