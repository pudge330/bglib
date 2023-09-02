const fs = require('node:fs');
const crypto = require('node:crypto');
const timer = require('grunt-timer');
const webpackConfig = require('./webpack.config');

module.exports = function(grunt) {
	// Init timer
	timer.init(grunt, { deferLogs: true });

	// Load tasks
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-webpack');

	// Configure tasks
	grunt.initConfig({
		concat: {
			options: {
				separator: "\n"
			},
			dev: {
				src: [
					'src/license.txt',
					'dist/bglib.js'
				],
				dest: 'dist/bglib.js'
			},
			prod: {
				src: [
					'src/license.txt',
					'dist/bglib.min.js'
				],
				dest: 'dist/bglib.min.js'
			}
		},
		copy: {
			dev: {
				expand: true,
				cwd: 'dist',
				dest: 'site/public_html/vendor/bglib',
				src: [
					'bglib.js'
				]
			},
			prod: {
				expand: true,
				cwd: 'dist',
				dest: 'site/public_html/vendor/bglib',
				src: [
					'bglib.min.js'
				]
			},
			bootstrap_css: {
				expand: true,
				cwd: 'site/node_modules/bootstrap/dist/css',
				dest: 'site/public_html/vendor/bootstrap/css',
				src: [
					'bootstrap*'
				]
			},
			bootstrap_js: {
				expand: true,
				cwd: 'site/node_modules/bootstrap/dist/js',
				dest: 'site/public_html/vendor/bootstrap/js',
				src: [
					'bootstrap*'
				]
			},
			bootstrap_icons: {
				expand: true,
				cwd: 'site/node_modules/bootstrap-icons/font',
				dest: 'site/public_html/vendor/bootstrap/icons',
				src: [
					'bootstrap-icons.css',
					'fonts/*'
				]
			},
			jquery: {
				expand: true,
				cwd: 'site/node_modules/jquery/dist',
				dest: 'site/public_html/vendor/jquery',
				src: [
					'jquery.min.js'
				]
			}
		},
		webpack: {
			dev: webpackConfig({ production: false }),
			prod: webpackConfig({ production: true })
		},
		watch: {
			dev: {
				files: [
					'src/**.js', 'src/**/**.js'
				],
				tasks: [
					'dev'
				],
				options: {
					spawn: false
				}
			}
		}
	});

	const updateHashes = function() {
		let html = fs.readFileSync('site/public_html/index.html').toString();
		if (fs.existsSync('dist/bglib.js')) {
			const contents = fs.readFileSync('dist/bglib.js').toString();
			const hash = crypto.createHash('sha256').update(contents).digest('hex');
			html = html.replace(
				/\"vendor\/bglib\/bglib\.js[a-zA-Z0-9\?\=]*\"/,
				`"vendor/bglib/bglib.js?v=${hash}"`
			);
		}
		if (fs.existsSync('site/public_html/css/site.css')) {
			const contents = fs.readFileSync('site/public_html/css/site.css').toString();
			const hash = crypto.createHash('sha256').update(contents).digest('hex');
			html = html.replace(
				/\"css\/site\.css[a-zA-Z0-9\?\=]*\"/,
				`"css/site.css?v=${hash}"`
			);
		}
		if (fs.existsSync('site/public_html/js/site.js')) {
			const contents = fs.readFileSync('site/public_html/js/site.js').toString();
			const hash = crypto.createHash('sha256').update(contents).digest('hex');
			html = html.replace(
				/\"js\/site\.js[a-zA-Z0-9\?\=]*\"/,
				`"js/site.js?v=${hash}"`
			);
		}
		if (fs.existsSync('site/public_html/js/site.js')) {
			const contents = fs.readFileSync('site/public_html/vendor/bootstrap/css/bootstrap.min.css').toString() +
							 fs.readFileSync('site/public_html/vendor/bootstrap/icons/bootstrap-icons.css').toString() +
							 fs.readFileSync('site/public_html/vendor/bootstrap/js/bootstrap.bundle.min.js').toString() +
							 fs.readFileSync('site/public_html/vendor/jquery/jquery.min.js').toString();
			const hash = crypto.createHash('sha256').update(contents).digest('hex');
			html = html.replace(
				/\"vendor\/bootstrap\/css\/bootstrap\.min\.css[a-zA-Z0-9\?\=]*\"/,
				`"vendor/bootstrap/css/bootstrap.min.css?v=${hash}"`
			);
			html = html.replace(
				/\"vendor\/bootstrap\/icons\/bootstrap-icons\.css[a-zA-Z0-9\?\=]*\"/,
				`"vendor/bootstrap/icons/bootstrap-icons.css?v=${hash}"`
			);
			html = html.replace(
				/\"vendor\/bootstrap\/js\/bootstrap\.bundle\.min\.js[a-zA-Z0-9\?\=]*\"/,
				`"vendor/bootstrap/js/bootstrap.bundle.min.js?v=${hash}"`
			);
			html = html.replace(
				/\"vendor\/jquery\/jquery\.min\.js[a-zA-Z0-9\?\=]*\"/,
				`"vendor/jquery/jquery.min.js?v=${hash}"`
			);
		}
		fs.writeFileSync('site/public_html/index.html', html);
	};

	// Register tasks
	grunt.registerTask('default', [
		'webpack',
		'concat'
	]);
	grunt.registerTask('dev', [
		'webpack:dev',
		'concat:dev'
	]);
	grunt.registerTask('prod', [
		'webpack:prod',
		'concat:prod'
	]);
	grunt.registerTask('copy:site_vendor', [
		'copy',
		'updateHashes'
	]);
	grunt.registerTask("updateHashes", updateHashes);
};