var tests = [],
    assert, expect, should;

try {
  for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
      if (file.indexOf('/base/test') == 0) {
        tests.push(file);
      }
    }
  }
} catch (e) {}

require.config({

  baseUrl: '/base',

  paths: {
    chai       : './libs/chai/chai',
    handlebars : './libs/handlebars/handlebars',
    underscore : './libs/underscore/underscore',
    burrito    : './src/burrito'
  },

  shim: {
    handlebars: {
      exports: 'Handlebars'
    }
  },

  deps: ['chai', 'burrito', 'handlebars'].concat(tests),

  callback: function(chai, Burrito, Handlebars) {
    assert  = chai.assert;
    expect  = chai.expect;
    should  = chai.should();
    window.__karma__.start();
  }

});