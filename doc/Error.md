# Error

At first when installing the linting packages, I found I had a conflict between
`eslint-config-react-app` and `@typescript-eslint` in determining the plugin
"@typescript-eslint" uniquely.

I started with this:

* `npm install --save-dev eslint`
* `npm install --save-dev eslint-config-react-app`
* `npm install --save-dev eslint-plugin-react`
* `npm install --save-dev @typescript-eslint/parser`
* `npm install --save-dev @typescript-eslint/eslint-plugin`  
  or, instead:  
  `npm install --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin --legacy-peer-deps`
* `npm install --save-dev stylelint`  
  or, instead:  
  `npm install --save-dev stylelint --legacy-peer-deps`
* `npm install --save-dev stylelint-config-standard`  
  or, instead:  
  `npm install --save-dev stylelint-config-standard --legacy-peer-deps`

And when the automatic linting didn't work, I had to investigate and
troubleshoot. I executed the following command and got an error:

* `npx eslint .`

    ```(text)
    Oops! Something went wrong! :(

    ESLint: 8.52.0

    ESLint couldn't determine the plugin "@typescript-eslint" uniquely.

    - <redacted-path>/react-ts/node_modules/@typescript-eslint/eslint-plugin/dist/index.js (loaded in "../../.eslintrc.json")
    - <redacted-path>/react-ts/node_modules/eslint-config-react-app/node_modules/@typescript-eslint/eslint-plugin/dist/index.js (loaded in "../../.eslintrc.json » eslint-config-react-app#overrides[0]")

    Please remove the "plugins" setting from either config or remove either plugin installation.

    If you still can't figure out the problem, please stop by https://eslint.org/chat/help to chat with the team.
    ```

Trying again:

* Get rid of `eslint-config-react-app`, at least.
* Uninstall
  * `npm uninstall @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-react-app eslint-plugin-react`
* Install
  * `npm install --save-dev eslint-plugin-react`
  * `npm install --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin --legacy-peer-deps`
