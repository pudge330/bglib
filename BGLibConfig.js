const util = require("util");

//--load function/module config
var bglibFuncsMods = require("./grunt-config.json");

//--shuffle function for testing sort algorithm
//--@https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

//--move item in array
//--@https://stackoverflow.com/questions/5306680/move-an-array-element-from-one-array-position-to-another
function move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
}

//--special dump for full objects
function dump() {
	var args = Array.prototype.slice.call(arguments);
	for (var i = 0; i < args.length; i++) {
		console.log(util.inspect(args[i], false, null, true))
	}
};

function getDeps(name) {
	var cnf = bglibFuncsMods[name];
	var final = [];
	var deps = [].concat(cnf.deps);
	while (deps.length) {
		if (final.indexOf(deps[0]) === -1) {
			var dep = deps.shift();
			final.push(dep);
			var tmpCnf = bglibFuncsMods[dep];
			deps = deps.concat(tmpCnf.deps);
		}
		else {
			deps.shift();
		}
	}
	return final;
};

function uniqueDeps(arr1, arr2) {
	for (var i = 0; i < arr2.length; i++) {
		if (arr1.indexOf(arr2[i]) === -1) {
			arr1.push(arr2[i]);
		}
	}
	return arr1;
};

function findModIndex(arr, mod) {
	var index = -1;
	for (var i = 0; i < arr.length; i++) {
		if (arr[i][0] == mod) {
			index = i;
			i = arr.length - 1;
		}
	}
	return index;
};

function sortGruntConfig(cnf) {
	for (var o = 0; o < cnf.length; o++) {
		cnf[o].sort(function(a, b) {
			var nameA = a[0].toUpperCase();
			var nameB = b[0].toUpperCase();
			if (nameA < nameB) {
				return -1;
			}
			if (nameA > nameB) {
				return 1;
			}
			return 0;
		});
	}
	for (var o = 0; o < cnf.length; o++) {
		var tmpFn = [], tmpBaseFn = [];
		var idxToRemove = [];
		for (var i = 0; i < cnf[o].length; i++) {
			if (cnf[o][i][0].match(/^fn\./)) {
				tmpFn.push(cnf[o][i]);
				idxToRemove.push(i);
			}
			else if (cnf[o][i][0].match(/^base\./)) {
				tmpBaseFn.push(cnf[o][i]);
				idxToRemove.push(i);
			}
		}
		for (var i = idxToRemove.length - 1; i >= 0; i--) {
			cnf[o].splice(idxToRemove[i], 1);
		}
		var sortFn = function(a, b) {
			var aName = a[0].toUpperCase();
			var bName = b[0].toUpperCase();
			if (aName < bName) {
				return -1;
			}
			else if (aName > bName) {
				return 1;
			}
			return 0;
		};
		tmpFn.sort(sortFn);
		tmpBaseFn.sort(sortFn);
		var passed;
		do {
			passed = true;
			for (var i = 0; i < cnf[o].length; i++) {
				for (var j = 0; j < cnf[o][i][1].deps.length; j++) {
					var modIndex = findModIndex(cnf[o], cnf[o][i][1].deps[j]);
					if (i < modIndex) {
						cnf[o] = move(cnf[o], modIndex, i);
						// jump out of main loop and rerun do-while
						i = cnf[o].length - 1;
						passed = false;
					}
				}
			}
		} while (!passed);
		cnf[o] = tmpBaseFn.concat(tmpFn).concat(cnf[o]);
	}
	return cnf;
};

function buildGruntBaseConfig(libConfig) {
	var depsCnf = [];
	for (var buildKey in libConfig) {
		var cnf = libConfig[buildKey];
		var deps = [];
		for (var i = 0; i < cnf.src.length; i++) {
			if (deps.indexOf(cnf.src[i]) === -1) {
				deps.push(cnf.src[i]);
			}
			deps = uniqueDeps(deps, getDeps(cnf.src[i]));
		}
		var tmpDeps = [];
		for (var i = 0; i < deps.length; i++) {
			tmpDeps.push([deps[i], bglibFuncsMods[deps[i]]]);
		}
		depsCnf.push(tmpDeps);
	}
	var builtIns = ["base:all", "fn:all", "mod:all"];
	for (var i = 0; i < depsCnf.length; i++) {
		for (var j = 0; j < builtIns.length; j++) {
			var idx = findModIndex(depsCnf[i], builtIns[j]);
			if (idx !== -1) {
				depsCnf[i].splice(idx, 1);
			}
		}
	}
	return depsCnf;
};

module.exports = {
	buildGruntConfig: function(libConfig, existing) {
		existing = existing || {concat: {}, uglify: {}};
		existing.concat = existing.concat || {};
		existing.uglify = existing.uglify || {};
		var base = buildGruntBaseConfig(libConfig);
		base = sortGruntConfig(base);
		for (var i = 0; i < base.length; i++) {
			var tmp = [];
			for (var j = 0; j < base[i].length; j++) {
				tmp.push(base[i][j][1].src);
			}
			base[i] = tmp;
		}
		var ci = -1;
		for (var buildKey in libConfig) {
			ci++;
			var src = [];
			var cnf = libConfig[buildKey];
			existing.concat[buildKey] = {
				src: [].concat(cnf.srcStart).concat(base[ci]).concat(cnf.srcEnd)
				,dest: cnf.dest
			};
			existing.uglify[cnf.dest.replace(/\.js$/, ".min.js")] = cnf.dest
		}
		return existing;
	}
	,dump: dump
};