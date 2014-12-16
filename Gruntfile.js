'use strict';

module.exports = function(grunt) {
  require('time-grunt')(grunt);
  // Project Configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jasmine: {
      client: {
        src: 'static/client/app/**/*.js',
        options: {
          vendor: [
            'static/client/js/jquery.1.11.1.min.js',
            'static/client/js/bootstrap.js',
            'static/client/js/underscore.js',
            'static/client/js/backbone.js',
            'static/client/js/nprogress.js'
          ],
          specs: 'spec/**/*.spec.js',
          helpers: 'spec/**/*.helper.js'
        }
      }
    },
    nodeunit: {
      all: ['tests/**/test_*.js'],
      options: {
        reporter: 'default',
        reporterOptions: {
          output: 'report'
        }
      }
    },
    watch: {
      js: {
        files: ['gruntfile.js', 'application.js', 'lib/**/*.js', 'test/**/*.js'],
        options: {
          livereload: true
        }
      },
      html: {
        files: ['public/views/**', 'app/views/**'],
        options: {
          livereload: true
        }
      }
    },
    nodemon: {
      dev: {
        script: 'application.js',
        options: {
          args: [],
          ignore: ['public/**'],
          ext: 'js,html',
          nodeArgs: [],
          delayTime: 1,
          env: {
            PORT: 3000
          },
          cwd: __dirname
        }
      }
    },
    concurrent: {
      serve: ['nodemon', 'watch'],
      debug: ['node-inspector', 'shell:debug', 'open:debug'],
      options: {
        logConcurrentOutput: true
      }
    },
    env: {
      options: {},
      // environment variables - see https://github.com/jsoverson/grunt-env for more information
      local: {
        FH_USE_LOCAL_DB: true,
        FH_MONGODB_CONN_URL: "mongodb://127.0.0.1/FH_LOCAL",
        FH_SERVICE_MAP: function() {
          /*
           * Define the mappings for your services here - for local development.
           * You must provide a mapping for each service you wish to access
           * This can be a mapping to a locally running instance of the service (for local development)
           * or a remote instance.
           */
          var serviceMap = {
            'SERVICE_GUID_1': 'http://127.0.0.1:8010',
            'SERVICE_GUID_2': 'https://host-and-path-to-service'
          };
          return JSON.stringify(serviceMap);
        }
      }
    },
    'node-inspector': {
      dev: {}
    },
    open: {
      debug: {
        path: 'http://127.0.0.1:8080/debug?port=5858',
        app: 'Google Chrome'
      },
      platoReport: {
        path: './plato/index.html',
        app: 'Google Chrome'
      }
    },
    plato: {
      src: {
        options: {
          jshint: grunt.file.readJSON('.jshintrc')
        },
        files: {
          'plato': ['Gruntfile.js', 'libs/**/*.js', 'tests/**/*.js', 'static/client/app/**/*.js']
        }
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'libs/**/*.js', 'tests/**/*.js', 'static/client/app/**/*.js', 'spec/**/*.js'],
      options: grunt.file.readJSON('.jshintrc')
    }
  });

  // Load NPM tasks
  require('load-grunt-tasks')(grunt, {
    scope: 'devDependencies'
  });

  grunt.registerTask('analysis', ['plato:src', 'open:platoReport']);

  grunt.registerTask('serve', ['env:local', 'concurrent:serve']);
  grunt.registerTask('debug', ['env:local', 'concurrent:debug']);
  grunt.registerTask('default', ['serve']);
  grunt.registerTask('test', ['jasmine', 'nodeunit']);
};