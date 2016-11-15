module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= pkg.license %> */\n',
        bower_concat:{
            all: {
                    options: { separator : ";\n" },
                    dest: {
                        "js":"lib/bower-concat.js",
                        "css":"lib/bower-concat.css"
                    },
                    exclude: [ // Alreay included in packery dist
                    ],
                    dependencies: {
                    },                        
                    mainFiles: {
                    }  
            }
        },
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            all: {
                src: ['lib/*.js'], 
                dest: 'dist/emojiBin.js'
            }
        },
        concat_css: {
            options: {              
            },
            all: {
                src: ["lib/*.css"],
                dest: "dist/emojiBin.css"
            }
        },
        cssmin:{
            options: {
            },
            all: {
                files: {
                  'dist/emojiBin.min.css': ['dist/emojiBin.css']
                }
            }
        },
        htmlmin: {                                  
            all: 
            {                                     
                options: {},
                files: {                                
                    'dist/index.html': 'index.html'
                }
            }
        },                 
        uglify: {
            options: {
            }, 
            dist: {
                src: 'dist/emojiBin.js',
                dest: 'dist/emojiBin.min.js'
            }
        },
        connect: {
            all: {
                livereload: true,
                port: 8000,
                base: './'
            }
        },        
        watch: {
            gruntfile: {
                files: 'Gruntfile.js'
            },
            scripts: {
                files: ['index.html','lib/*.js','lib/*.css'],
                tasks: ['build'],
                options: {
                    spawn: false,
                    livereload: 35729
                },
            }           
        }
    });

    // These plugins provide necessary tasks
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
   
    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-concat-css');
 
    // Default task

    grunt.registerTask('default', ['bower_concat','concat','concat_css','uglify','cssmin','htmlmin']);
    grunt.registerTask('build', ['bower_concat','concat','concat_css','uglify','cssmin','htmlmin']);
    grunt.registerTask('serve', ['connect','watch']);//     

};

