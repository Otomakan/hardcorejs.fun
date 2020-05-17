

function promiseAll (arrayOfFunctions, callBack) {
	function PromiseCounter (l, cb) {
		this.l = l
		this.cb = cb
		// We need that in order to have properly scoped `this` when we get into our increaseOrReturn function
		var that = this
	
		this.increaseOrReturn = function(){
			that.l -= 1
			if (that.l == 0) {
				return that.cb()
			}
		}
	}
	console.log('in promise all')
	const counter = new PromiseCounter(arrayOfFunctions.length, callBack)
	for (let i = 0; i < arrayOfFunctions.length; i ++) {
		arrayOfFunctions[i](counter.increaseOrReturn)
	}
}

function timeOut (ms, cb ) {
	setTimeout(function(){
		console.log('it\'s time', ms )
		cb()
	}, ms )
} 

var allTimeout = [2000, 1000, 1500].map(function(ms) {return timeOut.bind(null, ms)})
// var allTimeout = [100, 1000, 1500].map(function(ms) {return function(cb){timeOut( ms, cb)}})

console.log(allTimeout)
promiseAll(allTimeout, function(){console.log('done')})