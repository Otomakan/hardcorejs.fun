---
	template: blog-page
	title: 
	meta_description: 
	author: Jack Misteli
	subtitle: 
	categories:
---

<p class="prelude">Promises are probably one of the most discussed topic in Javacript for the past 5-10 years. So one more article is obviously what you need!</p>

<h1>What are promises</h1>

<p>Promises are bits of code that will tell another part of your code to wait before it is executed.</p>

<p>In the following example the promise is "After I get the groceries you can eat them".</p>

<div class="horizontal-codes">
<pre><code class="executable">

const buyCake = (returnPromisedValue, reject) => {
		returnPromisedValue('cake')
}
// Today we are only buying cake 
const gettingGroceries = new Promise((resolve, reject) => buyCake(resolve, reject))
const eat = (food) => {console.log('Eating', food)}

// We get the groceries, then we eat the groceries
gettingGroceries.then(groceries =>  eat(groceries))

// console will log "Eating cake"

</code>
<div class="code-description"> Level 1: always succeeding Promise</div>
</pre>


</div>
<p>A few things in this code. <code>buyCake</code> is called an executor function. We call it executor because it executes the promise. As you can see the executor function takes to arguments which are usually called <code>resolve</code> and <code>reject</code>. Resolve returns a value in case the promise goes as expected (that's why I called it <code>'returnPromisedValue'</code>).</p>

<h2>What if something goes wrong with my Promise: Promise rejection</h2>

<pre><code class='executable'>

const buyCake = (returnPromisedValue, reject) => {
	try {
		if (Math.random() > 0.2)
			throw new Error('You slipped on a banana peel on your way there')
		returnPromisedValue('cake')
	} catch (error) {
		reject(new Error('something went wrong with our cake shopping: ' + error.toString()))
	}
}

// Today we are only buying cake 
const gettingGroceries = new Promise(buyCake)
const eat = (food) => {console.log('Eating', food)}

// We get the groceries, then we eat the groceries
gettingGroceries
	.then(groceries =>  {eat(groceries);})
	.catch(error => { 
		console.log(error.toString());
})

// While we are doing the groceries we can do other things in the meantime
const callVance = () => {console.log('calling Vance'); console.log('called Vance')}
callVance()
//  The console will first log ('calling Vance' then 'called Vance', then log the error message or 'Eating cake')
</code></pre>

<p>The last piece of code is very important to understand. One really powerful feature of promises is that they allow us to do things while we are waiting for another to finish. In the code, we can imagine that we were waiting calling Vance while walking to the cake shop (things are a bit more tricky than that but it's good enough for now).</p>

<h1>I said real world promises!</h1>

<p>Alright, our promise is OK, but it don't make much sense. We could accomplish the same results as above without promises. Promises make sense when there is a delay in time. The most common use case is when we are waiting for an api call.</p>

<p>Here we are going to use the native <code>fetch</code> function. You can <a href=" https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch">find out more about it on MDN's website</a>. As you can see fetch also returns a promise! <a href="/javascript/making-a-nicer-fetch"> I also wrote a little post about how you can change fetch's behavior to fit your coding style </a> (because as you will see it's a bit wordy).</p>

<pre><code>
// (I removed the error catches to make things more readable.
// But don't forget to catch your errors)

const buyCake = (returnPromisedValue, reject) => {
	fetch('/assets/data/shopping/cakes.json')
		.then(data =>{
			data.json().then(cakes => {
				console.log(cakes)
				// cakes === ['Chocolate Cake', 'Cheese Cake', 'Balaclava']
				const firstCake = cakes[0]
				// firstCake === 'Chocolate Cake'
				returnPromisedValue(firstCake)
			})
		})
}

const gettingGroceries = new Promise(buyCake)
const eat = (food) => {console.log('Eating', food)}
gettingGroceries
	.then(groceries =>  {eat(groceries);})

console.log('Singing WonderWall')

// This code will log
// Singing WonderWall
// Eating Chocolate Cake
</code></pre>

<h1>Getting Promises to work together</h1>

<p>When we do API calls,  it is very common to have to do multiple calls.  The first thing you have to ask yourself is : are my calls dependant or not.
 </p>
<h5>Example of dependant calls</h5>
<pre><code>

const orderFirstCake = () => {
	getAllCakes.then( allCakes =>{
		if (allCakes.includes)
		const firstCake = allCakes[]
		orderCake(firstCake).then(res => {
			console.log(res)
		}).catch(err => {
			console.log('something went wrong when ordering the cake')
			throw err
		})
	}).catch(err=> {
		console.log('something went wrong getting all the cakes')
		throw err
	})
}
</code></pre>
<ul>In plain English this code means (C == client, S == Server):
<li>C: "Please tell me about all the cake Options you have"</li> 
<li>S: "We have Chocolate Cake, Cheese Cake and  Balaclava"]</li>
<li>C: "Please Give me a Chocolate Cake (aka option one)"</li>
<li>S: "Here is your chocolate cake"</li>
</ul>


<pre><code>

<ul id='cake-price-list'>
</ul>

<script>
const getCakePrice = (cake) => {
	return new Promise((resolve, reject) => {
		const kebabCake = cake.replace(' ', '-').toLowerCase()
		fetch('/assets/data/shopping/prices/' + kebabCake + '.json').then(data => 
			data.json().then(cakePrice => resolve(cakePrice))
		)
	})
}

const allCakes = ['Chocolate Cake', 'Cheese Cake', 'Balaclava']
const cakePriceList = document.getElementById('cake-price-list')
allCakes.forEach((cake) => {
	getCakePrice(cake).then(cakePrice => {
		const newPriceItem = document.createElement('ul')
		newPriceItem.innerHTML = cake + ': ' + cakePrice.value + cakePrice.currency
		cakePriceList.appendChild(newPriceItem)
	}
	)
})
</script>
</code></pre>

<iframe class='example-container' src="./cakePriceExample.html"></iframe>

<p>In this code snippet we don't care in what order we get the price of each cake. I added some useless data to the chocolate-cake file, so on a slow network (or simulated slow network) you can see that Chocolate Cake should appear at the end of the list.</p>




<p>You might have noticed that all the consecutive <code>.then</code> can get very messy. That's why today we prefer to use the <code>async/await</code> notation. To make our code cleaner. </p>
<requirements>
fetch https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
try catch
forEach
</requirements>

