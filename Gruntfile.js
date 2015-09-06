module.exports = function(grunt) {

  grunt.initConfig({
    
    bower: grunt.file.readJSON('bower.json'),

    clean: {
      all: {
        src: ['dist', 'app/compile/css', 'app/compile/templates']
      }
    },

    requirejs: {

      compileJs: {
        options: {
          baseUrl: "app",
          paths: {
              jquery: "libs/jquery/dist/jquery",
              text : "libs/requirejs-text/text",
              handlebars: "libs/handlebars/handlebars.amd.min",
              templates: "compile/templates/precompiled.handlebars",
          },
          name: "libs/almond/almond", // assumes a production build using almond
          include: ['main'],  
          out: "dist/embed.min.js",
          preserveLicenseComments: false
        }
      },

      compileCss: {
        options: {
          cssIn: 'app/compile/css/styles.css',
          out: 'app/compile/css/styles.min.css',
          optimizeCss: 'default'
        }
      }

    },

    less: {
      compile: {
        options: {
          paths: ["app/less"]
        },
        files: {
          "app/compile/css/styles.css": "app/less/styles.less"
        }
      }
    },

    connect: {
      server: {
        options: {
          port: 8002,
          base: '.',
          open: true,
          keepalive:true
        }
      }
    },

    handlebars: {
      compile: {
        options: {
          amd: true
        },
        src: ['app/templates/**/*.html'],
        dest: 'app/compile/templates/precompiled.handlebars.js'
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-handlebars');

  grunt.registerTask('compile', ['handlebars:compile','less:compile', 'requirejs:compileCss', 'requirejs:compileJs']);

  grunt.registerTask('default', ['clean', 'compile']);

};