# CSS Configuration Reference

Usage of "kebab-case" and "camelCase" (or "lowerCamelCase" as opposed to
"UpperCamelCase" or "PascalCase").

* Selector Class Patterns
  * kebab-case: `^([a-z][a-z0-9]*)(-[a-z0-9]+)*$`
  * camelCase:  `^[a-z][A-Za-z0-9]*$`
* Possible usage in stylelint configs
  * Use kebab-case:  
    `"selector-class-pattern": "^([a-z][a-z0-9]*)(-[a-z0-9]+)*$",`
  * Use camelCase:  
    `"selector-class-pattern": "^[a-z][A-Za-z0-9]*$",`
  * Use kebab-case or camelCase:  
    `"selector-class-pattern": "(^([a-z][a-z0-9]*)(-[a-z0-9]+)*$)|(^[a-z][A-Za-z0-9]*$)",`
