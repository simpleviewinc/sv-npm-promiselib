const assert = require("assert");

const promiseLib = require("../");

describe(__filename, function() {
	describe("promisifyCached", function() {
		it("should cache the promisification", async function() {
			function fn(cb) { return cb(null, "done") };
			
			const fn1 = promiseLib.promisifyCached(fn);
			const fn2 = promiseLib.promisifyCached(fn);
			
			assert.strictEqual(fn1, fn2);
			
			assert.strictEqual(await fn1(), "done");
			assert.strictEqual(await fn2(), "done");
		});
		
		it("should not cache different methods", async function() {
			function fn(cb) { return cb(null, "done"); }
			function fnAnother(cb) { return cb(null, "done2"); }
			
			const fn1 = promiseLib.promisifyCached(fn);
			const fn2 = promiseLib.promisifyCached(fnAnother);
			
			assert.notStrictEqual(fn1, fn2);
			
			assert.strictEqual(await fn1(), "done");
			assert.strictEqual(await fn2(), "done2");
		});
	});
	
	describe("promisifyMethods", function() {
		it("should promisify and preserve context", async function() {
			function MyClass(value) {
				this.value = value;
				this.promises = promiseLib.promisifyMethods(this, ["method"]);
			}
			
			MyClass.prototype.notPromisified = function(cb) {}
			
			MyClass.prototype.method = function(cb) {
				return cb(null, this.value);
			}
			
			const foo = new MyClass("foo");
			const bar = new MyClass("bar");
			
			assert.strictEqual(await foo.promises.method(), "foo");
			assert.strictEqual(await bar.promises.method(), "bar");
			assert.strictEqual(foo.notPromisified, bar.notPromisified);
		});
	});
});