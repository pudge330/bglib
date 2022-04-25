## bglib.noop()

An empty 'noop' function that does nothing. This can be useful when a paramater is supposed to be a callback and nothing is provided to avoid getting errors.

#### Usage

```javascript
function someFunction(callback) {
	if (!bglib.DT.isFunction(callback)) {
		callback = bglib.noop;
	}
	
	Some Code…

	//--call callback
	callback();
}
```