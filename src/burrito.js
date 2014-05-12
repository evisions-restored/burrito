define([
  'jquery',
  'underscore'
], function($, _) {

  var Burrito = {

    templates: {},

    registry: {},

    attribute: 'data-burrito-id',

    namespace: 'burrito',

    id: 0,

    /** EXTERNAL **/

    wrap: function(fn) {

      if (_.isFunction(fn)) {
        $.when(fn.call(Burrito)).then(function(templates) {
          Burrito.templates = templates;
        });
      } else if (_.isObject(fn)) {
        Burrito.templates = fn;
      }

      return Burrito;
    },

    sanitize: function(fn) {
      Burrito.safe = function() {
        return fn.apply(Burrito, arguments);
      };

      return Burrito;
    },

    utensil: function(fn) {
      if (_.isFunction(fn)) {
        fn.call(Burrito, Burrito.bind);
      }

      return Burrito;
    },

    ingredients: function(fn) {
      Burrito.processData = function() {
        fn.apply(Burrito, arguments);
      };

      return Burrito;
    },


    data: function(el) {
      el = $(el);

      if (el && el.length > 0) {


        if (el.length == 1) {

          return el.data(Burrito.namespace);
        } else {
          
          return _.map(el, function(e, index) {

            return el.eq(index).data(Burrito.namespace);
          });
        }

      }
    },


    /** INTERNAL **/

    bind: function() {
      var id  = Burrito.id++,
          tag = [Burrito.attribute, '=', '"', id, '"'].join('');

      Burrito.store(id, Burrito.processData.apply(Burrito, arguments));

      return Burrito.safe(tag);
    },

    processData: function(data) {
      return data;
    },

    store: function() {
      var id   = arguments[0],
          data = arguments[1];

      if (arguments.length > 1) {

        Burrito.registry[id] = data;
      } else {

        return Burrito.registry[id];
      }

      return Burrito;
    },

    clear: function(id) {
      delete Burrito.registry[id];

      return Burrito;
    },

    template: function(name) {
      var template = Burrito.templates[name],
          args     = _.toArray(arguments).slice(1),
          nodes    = null,
          el       = null,
          payload  = '';

      if (_.isFunction(template)) {
        payload = template.apply(this, args);
      }

      var div      = document.createElement('div'),
          fragment = document.createDocumentFragment();

      div.innerHTML = payload;

      while (div.firstChild) {
        Burrito.addData($(div.firstChild));
        fragment.appendChild(div.firstChild);
      }

      if (fragment.childNodes.length > 1) {

        return fragment.childNodes;
      } else if (fragment.childNodes.length == 1) {

        return fragment.childNodes[0];
      }

      return fragment;
    },

    addData: function(node) {
      var selector = '[' + Burrito.attribute + ']',
          tags     = node.filter(selector).add(node.find(selector)),
          id       = null,
          len      = tags.length,
          el       = null,
          i        = 0;

      for (i = 0; i < len; ++i) {
        el = tags.eq(i);
        id = el.attr(Burrito.attribute);
        el.data(Burrito.namespace, Burrito.store(id));
        Burrito.clear(id);
      }
    },

    safe: function(tag) {

      return tag
    }

  };

  if ($.fn.burrito == null) {
    $.fn.burrito = function() {
      return Burrito.data(this);
    };
  }

  return Burrito;
});