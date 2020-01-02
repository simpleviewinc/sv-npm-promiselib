[![Build Status](https://travis-ci.org/simpleviewinc/sv-npm-promiselib.svg?branch=master)](https://travis-ci.org/simpleviewinc/sv-npm-promiselib)

# @simpleview/promiselib
Promise utilities

## Getting Started

```
npm install @simpleview/promiselib
```

```js
const promiseLib = require("@simpleview/promiselib");
```

## API

### promisifyCached

`promisifyCached` provides caching micro-optimizations in cases when you execute `util.promisify` the same method many times. In example, calling it for each instance of an object is very expensive, and this eliminates the expense.

You use this method exactly like you would use Node's `util.promisify()`.

* fn - `function` - The function you want to promisify.

```js
var cbFunction = function(cb) { return cb(null, "someValue"); }
var promisified = promiseLib.promisifyCached(cbFunction);
```

### promisifyMethods

`promisifyMethods` is used for creating a `.promises` object which contains promisifed variants of methods on the normal prototype.

* object instance - `object` - The object which contains the methods and will be used for scope.
* methods - `array` of `string` - Array of method names to promisify.

In the following block each instance of `MyClass` will have `this.promises.methodA` and `this.promises.methodB` and both to the context of their specific instances.

```js
var MyClass = function() {
	this.promises = promiseLib.promisifyMethods(this, ["methodA", "methodB"]);
};
MyClass.prototype.methodA = function(cb) {};
MyClass.prototype.methodB = function(cb) {};
```