module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      src: [
        'build/**/*.js',
        '!build/js/_bower.js'
      ]
    },
    bower_concat: {
      all: {
        dest: {
          'js': 'build/js/_bower.js',
          'css': 'build/scss/_bower.scss'
        },
        mainFiles: {
          bootstrap: [
            'dist/js/bootstrap.js',
            'dist/css/bootstrap.css'
          ]
        },
        dependencies: {
          bootstrap: ["jquery"]
        }
      },
    },
    sass: {
      expanded: {
        options: { outputStyle: 'expanded' },
        files: { 'public/css/client.css': 'build/scss/style.scss' }
      },
      compressed: {
        options: { outputStyle: 'compressed' },
        files: { 'public/css/client.min.css': 'build/scss/style.scss' }
      }
    },
    concat: {
      dist: {
        src: [
          'build/js/_bower.js',
          'build/js/app.js',
          'build/js/**/*.js',
          '!public/js/client.js',
          '!public/js/client.min.js'
        ],
        dest: 'public/js/client.js'
      }
    },
    uglify: {
      'public/js/client.min.js': 'public/js/client.js'
    },
    watch: {
      configFiles: {
        files: ['Gruntfile.js', 'package.json'],
        options: { reload: true }
      },
      scss: {
        files: ['build/scss/**/*.scss'],
        tasks: ['sass'],
        options: { livereload: true }
      },
      js: {
        files: ['build/js/**/*.js'],
        tasks: ['concat', 'uglify'], // removed jshint
        options: { livereload: true }
      },
      index: {
        files: ['public/index.html'],
        options: { livereload: true }
      }
    },
    replace: {
      production: {
        options: {
          patterns: [{
            match: /client\.js/,
            replacement: 'client.min.js'
          },{
            match: /client\.css/,
            replacement: 'client.min.css'
          }]
        },
        files: [
          { expand: true, flatten: true, src: ['public/index.html'] }
        ]
      },
      development: {
        options: {
          patterns: [{
            match: /client\.min\.js/,
            replacement: 'client.js'
          },{
            match: /client\.min\.css/,
            replacement: 'client.css'
          }]
        },
        files: [
          { expand: true, flatten: true, src: ['public/index.html'] }
        ]
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  // 'jshint' - bit harsh at the moment.
  grunt.registerTask('default', ['bower_concat', 'sass:expanded', 'concat', 'replace:development', 'watch']);
  grunt.registerTask('deploy', ['bower_concat', 'sass:compressed', 'concat', 'uglify', 'replace:production']);
};
