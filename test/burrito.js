define([
  'burrito',
  'handlebars'
], function(Burrito) {

  describe('Burrito', function() {

    it('should load', function() {

      expect(Burrito).itself.respondTo('config');

    });

  });

});