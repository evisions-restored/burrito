define([
  'underscore'
], function(_) {

  var Burrito = {

    config: function(fn) {
      fn.call(Burrito);
    }

  };

  return Burrito;
});