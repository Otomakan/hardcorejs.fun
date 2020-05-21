'use strict';


// console.log(bob)
// // undefined

// bob = 'Bob'
// console.log(bob)
// // "Bob"

let bob = 'bob'
function getBob2() {
	// In strict mode this will throw an error
  let bob = bob2 = 'bob2'
}
getBob2();

console.log(bob, bob2)
console.log(bob2)
// Bob bob2


let counter = 0 

for (let i = 0; i < 10; i++) {
	// I want to create a new counter but it turns out to be the same!
	let counter = i
}

counter += 1
// If blocks were scopes this would still be === 1
console.log(counter)
// logs 10