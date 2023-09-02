const timer = require("grunt-timer");

module.exports = function(grunt) {
	timer.init(grunt, { deferLogs: true });

	//--configuration
	grunt.initConfig({
		sass: {
			bootstrap_dev: {
				options: {
					style: "expanded"
				},
				files: {
					"../public_html/css/bootstrap-plus.css": "css/scss/build-bootstrap.scss"
				}
			},
			bootstrap_prod: {
				options: {
					style: "compressed"
				},
				files: {
					"../public_html/css/bootstrap-plus.min.css": "css/scss/build-bootstrap.scss"
				}
			}
			,dev: {
				options: {
					style: "expanded"
				},
				files: {
					"../public_html/css/main.css": "css/scss/build.scss"
				}
			},
			prod: {
				options: {
					style: "compressed"
				},
				files: {
					"../public_html/css/main.min.css": "css/scss/build.scss"
				}
			}
		},
		autoprefixer: {
			options: {
				browsers: ["last 4 versions", "> 1%", "ie >= 9", "ff >= 3"]
			}
			,dev: {
				'../public_html/css/bootstrap-plus.css': '../public_html/css/bootstrap-plus.css',
				'../public_html/css/main.css': '../public_html/css/main.css'
			}
			,prod: {
				'../public_html/css/bootstrap-plus.min.css': '../public_html/css/bootstrap-plus.min.css',
				'../public_html/css/main.min.css': '../public_html/css/main.min.css'
			}
		},
		copy: {
			bootstrap_js: {
				expand: true,
				cwd: 'css/bootstrap-plus/dist/js',
				src: ['bootstrap-plus.min.js', 'jquery.min.js', 'bootstrap.bundle.min.js'],
				dest: '../public_html/js/vendor'
			},
			bglib_js: {
				expand: true,
				cwd: '../../dist',
				src: ['bglib.js', 'bglib.min.js'],
				dest: '../public_html/js/vendor'
			}
		}
	});

	//--load
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	//--tasks
	grunt.registerTask('default', [
		'sass',
		'autoprefixer',
		'copy'
	]);
	grunt.registerTask('build:styles', [
		'sass',
		'autoprefixer'
	]);
	grunt.registerTask('build:dev', [
		'sass:bootstrap_dev',
		'sass:dev',
		'autoprefixer:dev',
		'copy'
	]);
	grunt.registerTask('build:dev', [
		'sass:bootstrap_prod',
		'sass:prod',
		'autoprefixer:prod',
		'copy'
	]);
};