# Warnings

## Babel

When compiling a build (and sometimes when running the app in development mode),
a warning comes up advising to declare and add a package as an explicit
dependency.

* `> npm run build`

    ```(text)
    $ npm run build

    > react-ts@0.1.0 build
    > craco build

    Creating an optimized production build...
    One of your dependencies, babel-preset-react-app, is importing the
    "@babel/plugin-proposal-private-property-in-object" package without
    declaring it in its dependencies. This is currently working because
    "@babel/plugin-proposal-private-property-in-object" is already in your
    node_modules folder for unrelated reasons, but it may break at any time.

    babel-preset-react-app is part of the create-react-app project, which
    is not maintianed anymore. It is thus unlikely that this bug will
    ever be fixed. Add "@babel/plugin-proposal-private-property-in-object" to
    your devDependencies to work around this error. This will make this message
    go away.

    Compiled successfully.
    ```

So this package has been added:

* `> npm install --save-dev @babel/plugin-proposal-private-property-in-object`

Originally, the `--force` option was added to the command above to overcome some
seemingly unrelated dependency issues for linting (see Dependency Issues below).
But then, after getting rid of those dependency issues (at least temporarily),
installing again showed the following message:

```(text)
npm WARN deprecated @babel/plugin-proposal-private-property-in-object@7.21.11: This proposal has been merged to the ECMAScript standard and thus this plugin is no longer maintained. Please use @babel/plugin-transform-private-property-in-object instead.
```

This message is expected and irrelevant because the fundamental issue is lack of
maintenance and explicitly declaring this unmaintained dependency.

### Dependency Issues

The installation was forced with this command

* `> npm install --save-dev @babel/plugin-proposal-private-property-in-object --force`

to overcome the warnings and errors below.

```(text)
> npm install --save-dev @babel/plugin-proposal-private-property-in-object

npm WARN ERESOLVE overriding peer dependency
npm WARN While resolving: eslint-plugin-jest@25.7.0
npm WARN Found: @typescript-eslint/eslint-plugin@6.12.0
npm WARN node_modules/@typescript-eslint/eslint-plugin
npm WARN   dev @typescript-eslint/eslint-plugin@"^6.12.0" from the root project
npm WARN
npm WARN Could not resolve dependency:
npm WARN peerOptional @typescript-eslint/eslint-plugin@"^4.0.0 || ^5.0.0" from eslint-plugin-jest@25.7.0
npm WARN node_modules/eslint-plugin-jest
npm WARN   eslint-plugin-jest@"^25.3.0" from eslint-config-react-app@7.0.1
npm WARN   node_modules/eslint-config-react-app
npm WARN
npm WARN Conflicting peer dependency: @typescript-eslint/eslint-plugin@5.62.0
npm WARN node_modules/@typescript-eslint/eslint-plugin
npm WARN   peerOptional @typescript-eslint/eslint-plugin@"^4.0.0 || ^5.0.0" from eslint-plugin-jest@25.7.0
npm WARN   node_modules/eslint-plugin-jest
npm WARN     eslint-plugin-jest@"^25.3.0" from eslint-config-react-app@7.0.1
npm WARN     node_modules/eslint-config-react-app
npm WARN ERESOLVE overriding peer dependency
npm WARN While resolving: stylelint-config-recommended-scss@14.0.0
npm WARN Found: stylelint@15.11.0
npm WARN node_modules/stylelint
npm WARN   peer stylelint@"^15.10.0" from stylelint-config-recommended@13.0.0
npm WARN   node_modules/stylelint-config-recommended
npm WARN     stylelint-config-recommended@"^13.0.0" from stylelint-config-standard@34.0.0
npm WARN     node_modules/stylelint-config-standard
npm WARN   2 more (stylelint-config-standard, the root project)
npm WARN
npm WARN Could not resolve dependency:
npm WARN peer stylelint@"^16.0.2" from stylelint-config-recommended-scss@14.0.0
npm WARN node_modules/stylelint-config-recommended-scss
npm WARN   stylelint-config-recommended-scss@"^14.0.0" from stylelint-config-standard-scss@12.0.0
npm WARN   node_modules/stylelint-config-standard-scss
npm WARN
npm WARN Conflicting peer dependency: stylelint@16.1.0
npm WARN node_modules/stylelint
npm WARN   peer stylelint@"^16.0.2" from stylelint-config-recommended-scss@14.0.0
npm WARN   node_modules/stylelint-config-recommended-scss
npm WARN     stylelint-config-recommended-scss@"^14.0.0" from stylelint-config-standard-scss@12.0.0
npm WARN     node_modules/stylelint-config-standard-scss
npm ERR! code ERESOLVE
npm ERR! ERESOLVE could not resolve
npm ERR!
npm ERR! While resolving: stylelint-config-standard-scss@12.0.0
npm ERR! Found: stylelint@15.11.0
npm ERR! node_modules/stylelint
npm ERR!   peer stylelint@"^15.10.0" from stylelint-config-recommended@13.0.0
npm ERR!   node_modules/stylelint-config-recommended
npm ERR!     stylelint-config-recommended@"^13.0.0" from stylelint-config-standard@34.0.0
npm ERR!     node_modules/stylelint-config-standard
npm ERR!       dev stylelint-config-standard@"^34.0.0" from the root project
npm ERR!   peer stylelint@"^15.10.0" from stylelint-config-standard@34.0.0
npm ERR!   node_modules/stylelint-config-standard
npm ERR!     dev stylelint-config-standard@"^34.0.0" from the root project
npm ERR!   1 more (the root project)
npm ERR!
npm ERR! Could not resolve dependency:
npm ERR! peer stylelint@"^16.0.2" from stylelint-config-standard-scss@12.0.0
npm ERR! node_modules/stylelint-config-standard-scss
npm ERR!   dev stylelint-config-standard-scss@"^12.0.0" from the root project
npm ERR!
npm ERR! Conflicting peer dependency: stylelint@16.1.0
npm ERR! node_modules/stylelint
npm ERR!   peer stylelint@"^16.0.2" from stylelint-config-standard-scss@12.0.0
npm ERR!   node_modules/stylelint-config-standard-scss
npm ERR!     dev stylelint-config-standard-scss@"^12.0.0" from the root project
npm ERR!
npm ERR! Fix the upstream dependency conflict, or retry
npm ERR! this command with --force or --legacy-peer-deps
npm ERR! to accept an incorrect (and potentially broken) dependency resolution.
npm ERR!
npm ERR!
npm ERR! For a full report see:
npm ERR! /Users/<username>/.npm/_logs/2024-01-02T18_43_00_332Z-eresolve-report.txt

npm ERR! A complete log of this run can be found in: /Users/<username>/.npm/_logs/2024-01-02T18_43_00_332Z-debug-0.log
```

## Linting

I initially stated that "Code-linting with [ESLint](https://eslint.org) (with
[typescript-eslint](https://typescript-eslint.io)) and
[Stylelint](https://stylelint.io) is great."

Then I found that
[things are changing](https://typescript-eslint.io/blog/deprecating-formatting-rules/)
with ESLint: deprecation of formatting rules and moving to the Stylistic
project.  So I then needed to investigate and change code appropriately.

As they were initially installed:

* `npm install --save-dev eslint`
* `npm install --save-dev eslint-plugin-react`
* `npm install --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin --legacy-peer-deps`
* `npm install --save-dev stylelint --legacy-peer-deps`
* `npm install --save-dev stylelint-config-standard --legacy-peer-deps`
* `npm install --save-dev stylelint-config-standard-scss --legacy-peer-deps`

See an [error](./Error.md) I had to fix initially when trying to install
`eslint-config-react-app`.

And working to revise with [ESLint Stylistic](https://eslint.style/)...
Uninstalling:

* `npm uninstall eslint eslint-plugin-react @typescript-eslint/parser @typescript-eslint/eslint-plugin stylelint stylelint-config-standard stylelint-config-standard-scss`

And installing (and setting versions in order to avoid dependency issues):

* `npm install --save-dev eslint`
* `npm install --save-dev @typescript-eslint/eslint-plugin@^5.5.0`
* `npm install --save-dev @typescript-eslint/parser@^5.0.0`
* `npm install --save-dev eslint-plugin-react`
* `npm install --save-dev @stylistic/eslint-plugin`
* `npm install --save-dev stylelint`
* `npm install --save-dev stylelint-config-standard`
* `npm install --save-dev stylelint-config-standard-scss`

Then I thought I should investigate whether these ESLint packages are still
needed when stylistic is used (and with `react-scripts`, which seems to already
have some of these packages that come along):  
`@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`, and
`eslint-plugin-react`

So I found that I could uninstall them and everything seems to still work
properly:

* `npm uninstall @typescript-eslint/eslint-plugin`
* `npm uninstall @typescript-eslint/parser`
* `npm uninstall eslint-plugin-react`

Also, later, I decided to see if I can get rid of `stylelint-config-standard`,
since `stylelint-config-standard-scss`  extends (and should include) it, I
think, and it seems that everything still works (as well as before, though the
full formatting solution hasn't been found yet).

* `npm uninstall stylelint-config-standard`

## Craco

I initially stated that "The packages [craco](https://craco.js.org) and
[craco-alias](https://github.com/risen228/craco-alias) enable import aliases
and abbreviations and generally enable more concise import statements."

But I found that `craco-alias` is deprecated; needed to switch to
[react-app-alias](https://github.com/oklas/react-app-alias) instead.

As they were initially installed:

* `npm install @craco/craco`
* `npm install --save-dev craco-alias`
* new file: `craco.config.js`
* new file: `tsconfig.paths.json`
* modified: `tsconfig.json`

And working to revise with `react-app-alias`...

* `npm install --save-dev @craco/craco`
* `npm install --save-dev react-app-alias`
* new file: `craco.config.js`
* new file: `tsconfig.paths.json`
* modified: `tsconfig.json`

This helped me to get rid of warnings and dependency issues too.
