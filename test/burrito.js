define([
  'burrito',
  'handlebars',
  'templates',
  'underscore',
  'jquery'
], function(Burrito, Handlebars, Templates, _, $) {

  describe('Burrito', function() {

    var children = [
      {
        name: 'child1'
      },
      {
        name: 'child2'
      }
    ];

    var div = null;


    before(function() {

      _.each(Templates, function(fn, name) {
        Handlebars.registerPartial(name, fn);
      });

      Burrito.wrap(Templates)
          .sanitize(function(str) {
            return new Handlebars.SafeString(str);
          })
          .utensil(function(bind) {
            Handlebars.registerHelper('$', bind);
          });


    });

    beforeEach(function() {
      div = $('<div/>');
      $(document.body).append(div);
    });

    afterEach(function() {
      div.remove();
      div = null;
    });

    it('data - should set/get data', function() {  

      var data = { hello: 'world' };

      div.html(Burrito.template('item', data));


      expect(Burrito.data(div.children()[0])).to.equal(data);

    });


    it('data array - should set/get array data', function() {

      var data = { children: children };

      div.html(Burrito.template('item', data));

      var child = Burrito.data(div.find('.child'));

      expect(children[0]).to.equal(data.children[0]);
      expect(children[1]).to.equal(data.children[1]);

    });

    it('jQuery plugin - should set/get data', function() {
      var data = { children: children };

      div.html(Burrito.template('item', data));

      var child = div.find('.child').burrito();

      expect(children[0]).to.equal(data.children[0]);
      expect(children[1]).to.equal(data.children[1]);

    }); 

  });

});