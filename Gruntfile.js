var path = require('path');

module.exports = function(grunt) {
  var browsers    = grunt.option('browsers'),
      reporters   = grunt.option('r');

  // Reporters: spec,beep,html,dots,progress
  if (reporters) {
    reporters = reporters.split(',');
  }

  // Browsers: PhantomJS,Chrome,Firefox,IE
  if (browsers) {
    browsers = browsers.split(',');
  }

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    karma: {
      options: {
        browsers: browsers || ['PhantomJS'],
        configFile: 'karma.conf.js',
        reporters: reporters || ['spec']
      },
      burrito: {
        singleRun: true
      },
      auto: {
        autoWatch: true,
        singleRun: false
      }
    },

    handlebars: {
      sample_hbs_compile: {
        options: {
          amd: true,
          namespace: 'Templates',
          processName: function(filePath) {
            var ext = path.extname(filePath);
            return path.basename(filePath).slice(0, -ext.length);
          }
        },
        files: {
          'templates.js': [
            'templates/**/*.hbs',
          ]
        }
      }
    }

  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('templates', ['handlebars']);
  grunt.registerTask('test', ['karma:burrito']);
  grunt.registerTask('auto', ['karma:auto']);

  grunt.registerTask('default', ['auto']);
};