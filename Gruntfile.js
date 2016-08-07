/*global module*/
/*jshint camelcase:false*/ // because of gruntConfig.qunit_junit
module.exports = function (grunt) {
    'use strict';

    var gruntConfig = {
        pkg: grunt.file.readJSON('package.json')
    };

    // convenience
    grunt.registerTask('default', ['lint', 'test']);
    grunt.registerTask('all', ['clean', 'lint', 'test', 'coverage', 'bundle']);

    // continuous integration
    grunt.registerTask('ci', ['lint', 'test', 'coverage']);

    // grunt.registerTask('ci', ['lint', 'coverage']);

    // clean
    grunt.loadNpmTasks('grunt-contrib-clean');
    gruntConfig.clean = {
        output: ['output']
    };


    // lint
    grunt.loadNpmTasks('grunt-contrib-jshint');
    gruntConfig.jshint = {
        options: { bitwise: true, camelcase: true, curly: true, eqeqeq: true, forin: true, immed: true,
            indent: 4, latedef: true, newcap: true, noarg: true, noempty: true, nonew: true, plusplus: true,
            quotmark: true, regexp: true, undef: true, unused: true, strict: true, trailing: true,
            maxparams: 3, maxdepth: 2, maxstatements: 50},
        all: [
            'Gruntfile.js',
            'src/js/**/*.js'
        ]
    };
    grunt.registerTask('lint', 'jshint');


    // test
    grunt.loadNpmTasks('grunt-contrib-qunit');
    gruntConfig.qunit = {
        src: ['src/test/index.html'],
        serve: { options: { urls: ['http://localhost:8082/test/index.html']}},
        bundle: ['output/bundle/test/index.html']
    };
    grunt.loadNpmTasks('grunt-qunit-junit');
    gruntConfig.qunit_junit = {
        options: {
            dest: 'output/testresults'
        }
    };


    // serve
    grunt.registerTask('wait', 'keep running until terminated', function () {
        /* var done =*/
        this.async();
    });
    grunt.loadNpmTasks('grunt-contrib-connect');
    gruntConfig.connect = {};
    gruntConfig.connect.test = {
        options: {
            port: 8082,
            base: 'src'
        }
    };
    grunt.registerTask('test', ['qunit_junit', 'connect:test', 'qunit:serve']);


    // watch
    grunt.loadNpmTasks('grunt-contrib-watch');
    gruntConfig.watch = {
        scripts: {
            files: ['src/**/*.*'],
            tasks: ['lint', 'test']
        }
    };


    // coverage
    grunt.loadNpmTasks('grunt-qunit-cov');
    gruntConfig['qunit-cov'] = {
        /*options: {
            vendor:'http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js'
        },*/
        test:
        {
            minimum: 1.0,
            baseDir: 'src',
            srcDir: 'src/js',
            depDirs: ['src/lib', 'src/test'],
            outDir: 'output/coverage',
            testFiles: ['src/test/index.html']
        }
    };
    grunt.registerTask('coverage', 'qunit-cov');


    // bundle
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    gruntConfig.requirejs = {
        bundle: {
            options: {
                name: 'main',
                appDir: 'src',
                baseUrl: 'js',
                mainConfigFile: 'src/js/requireConfig.js',
                dir: 'output/optimized'
            }
        }
    };
    grunt.loadNpmTasks('grunt-contrib-copy');
    gruntConfig.copy = {
        bundle: {
            files: {
                'output/bundle/': [
                    'output/optimized/index.html',
                    'output/optimized/lib/require.min.js',
                    'output/optimized/js/requireConfig.js',
                    'output/optimized/js/main.js'
                ]
            }
        }
    };
    grunt.registerTask('bundle', ['requirejs:bundle', 'copy:bundle']);


    // grunt
    grunt.initConfig(gruntConfig);
};
