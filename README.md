Burrito
=======

Client side template string-to-dom parser with data attaching.

Tested with:

* Handlebars.js

```javascript
// Wrap your templates with Burrito
Burrito.wrap(Templates)
    // provide a function to sanitize safe strings
    .sanitize(function(str) {
      return new Handlebars.SafeString(str);
    })
    // register a utensil with your templating engine of choice
    .utensil(function(bind) {
      Handlebars.registerHelper('$', bind);
    });
```