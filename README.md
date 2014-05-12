Burrito
=======

Client side template string-to-dom parser with data attaching.

We love handlebars.  But they lack functionality that we think is extremely useful.  Namely 

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


var el = Burrito.template('template.name', { my: 'data' });

Burrito.data(el); // -> { my: 'data' }
```

Tested with:

* Handlebars
