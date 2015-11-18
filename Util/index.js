"use strict";

module.exports = {
	hyphenToFunctionName: function(str){
		let string = str.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
		return "on" + string.charAt(0).toUpperCase() + string.slice(1);
	},
	toType: function(obj) {
		return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
	}
}