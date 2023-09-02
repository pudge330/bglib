/* config loading test env, may possibly want to make a module */

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
}, finalConfig);

bglib.dump(finalConfig);
