---
	layout: blog-page
	title: Const vs Var vs Let
	meta_description: A primer on the different variable declarations in Javascript. const vs var vs let
	author: Jack Misteli
	subtitle: A primer on the different variable declarations in Javascript
	categories:
---

<p class='prelude'></p>

<h1>Scoping in Javascript</h1>
<p>In programming, the scope of a variable refers to where a variable can be accessed. The global scope means a variable can be accessed anywhere in the code. A local scope is accessible only in the local scope as defined y the programming language rule.</p>

<p>It's a bit abstract right now. Let's imagine a prison. The warden (manager of the prison) can go anywhere. On the other hand, the prisoners can only be in their cell or maybe sometimes in communal areas. The warden is a globally scoped variable, the prisoners are locally scoped.</p>

<p>It is a bit tricky to come up with good comparisons to explain scopes. All comparisons fall short one way or the other.</p>

<p>First we can compare scopes to laws. We have international laws, national laws and local laws. National laws come to effect at a local level but local laws don't have effect outside of the local jurisdictions (there are cases of extraterritorial jurisdiction of laws but let's keep things simple here!). </p>

<pre><code>
var stateLaw = `You can't just go around killing people`

function regionOne () {
	var regionOneLaw = `don't dance in front of the city hall at 3am`
	console.log(regionOneLaw)
	// will log  'don't dance in front of the city hall at 3am'
	console.log(stateLaw)
	// will log `You can't just go around killing people`
}

console.log(regionOneLaw)
//will log undefined because the regional law only works in the region

function regionTwo () {
	var regionTwoLaw = `be polite to people over 100 years old`
	console.log(regionOneLaw)
	//will log undefined because the regional law only works in the region
}
</code></pre>

<h1>Scoping in Javascript</h1>

<p>The thing is that scoping is a bit more complicated than that in Javascript. That's because a block does not necessarily contain a scope (a block is anything between brackets<code>{ }</code>.</p>
<p>So you can do some super weird things with var:</p>

<pre><code>
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
</code></pre>

<p>There are a lot of different issues here which are all solved by <code>let</code>. 

<ul>Advantages of let</ul>
<li><p>First of all, we can't modify or assign the <code>let</code> variable before it is assigned.</p>
<pre><code>
console.log(bob)
// undefined

bob = 'Bob'
console.log(bob)
// "Bob"

let bob
console.log(bob)
// "Bob"
</code></pre>
<p> So this code will throw a reference error: "ReferenceError: Cannot access 'bob' before initialization".
</li>
<li></li>
</ul>


