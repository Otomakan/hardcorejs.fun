

function promiseAllBlocking (arrayOfFunctions, callBack) {
	if (arrayOfFunctions.length === 0)
		return callBack()
	arrayOfFunctions[0](function(){
		promiseAllBlocking(arrayOfFunctions.slice(1, arrayOfFunctions.length), callBack)
	})
}

function timeOut (ms, cb ) {
	console.log('in timeOut')
	setTimeout(function(){
		console.log('it\'s time', ms )
		cb()
	}, ms )
} 

var allTimeout = [2000, 1000, 1500].map(function(ms) {return timeOut.bind(null, ms)})
// var allTimeout = [100, 1000, 1500].map(function(ms) {return function(cb){timeOut( ms, cb)}})

promiseAllBlocking(allTimeout, function(){console.log('done')})