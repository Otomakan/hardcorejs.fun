

console.log(bob)
// undefined

bob = 'Bob'
console.log(bob)
// "Bob"

var bob
console.log(bob)
// "Bob"

function getBob2() {
	// In strict mode this will throw an error
  var bob = bob2 = 'bob2'
}
getBob2();

console.log(bob, bob2)
// Bob bob2


var counter = 0 

for (var i = 0; i < 10; i++) {
	// I want to create a new counter but it turns out to be the same!
	var counter = i
}

counter += 1
// If blocks were scopes this would still be === 1
console.log(counter)
// logs 10