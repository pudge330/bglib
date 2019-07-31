const timer = require("grunt-timer");
const util = require("util");
const bglib = require("./BGLibConfig");

var finalConfig = {};
//--full lib
finalConfig = bglib.buildGruntConfig({
	bglib: {
		src: ["base:all", "fn:all", "mod:all"]
		,srcStart: ["src/licenses.all.js", "src/wraps/wrap-start.js","src/bglib.js","src/modules/Polyfills.js"]
		,srcEnd: ["src/wraps/wrap-end.js"]
		,dest: "dist/bglib.js"
	}
	,jlyte: {
		src: ["JLyte"]
		,srcStart: ["src/licenses.jlyte.js", "src/wraps/jlyte-wrap-start.js","src/bglib.js","src/modules/Polyfills.js"]
		,srcEnd: ["src/wraps/jlyte-wrap-end.js"]
		,dest: "dist/bglib-jlyte.js"
	}
	,ezScrollerDeps: {
		src: [
			'base:all',
			'fn.rand', 'fn.formatDecimal', 'fn.request', 'fn.interpolate', 'fn.iosVersion',
			'Element', 'ElementalData'
		]
		,srcStart: ["src/wraps/wrap-start.js","src/bglib.js","src/modules/Polyfills.js"]
		,srcEnd: ["src/wraps/wrap-end.js"]
		,dest: "dist/bglib-ezscroller-deps.js"
	}
	// ,customBuild: {
	// 	src: [/* deps go here */]
	// 	,srcStart: ["src/wraps/wrap-start.js","src/bglib.js","src/modules/Polyfills.js"]
	// 	,srcEnd: ["src/wraps/wrap-end.js"]
	// 	,dest: "dist/bglib-custom.js"
	// }
}, finalConfig);

module.exports = function(grunt) {
	timer.init(grunt, { deferLogs: true });
	//--configuration
	grunt.initConfig({
		concat: Object.assign({
			options: {separator: "\n"}
		}, finalConfig.concat)
		,uglify: {
			options: {
				mangle: true
				,output: {
					comments: 'some'
				}
			},
			dist: {
				files: finalConfig.uglify
			}
		}
		,jshint: {
			options: {
				laxcomma: true
			}
            ,all: [
            	'src/bglib.js'
            	,'src/modules/*.js'
            ]
        }
	});
	//--load
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	//--tasks
	grunt.registerTask('default', [
		'concat'
		,'uglify'
	]);
};