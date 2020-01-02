const util = require("util");

const _cacheMap = new WeakMap();
function promisifyCached(fn) {
	if (_cacheMap.has(fn)) {
		return _cacheMap.get(fn);
	}
	
	const promisified = util.promisify(fn);
	_cacheMap.set(fn, promisified);
	
	return promisified;
}

// return obj with promise variants of all of the specified methods
function promisifyMethods(self, methods) {
	const returnData = {};
	for(let name of methods) {
		returnData[name] = promisifyCached(self[name]).bind(self);
	}
	return returnData;
}

module.exports = {
	promisifyCached,
	promisifyMethods
}