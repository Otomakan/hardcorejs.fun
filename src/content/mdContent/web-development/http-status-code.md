---
	template: blog-page
	title: Basics of HTTP status codes
	meta_description: 
	author: Jack Misteli
	subtitle: 
	categories:
---
 
<p>HTTP status codes tell the browsers (or us developers) what is happening with the requested resource. HTTP requests are classified based on the outcome of the request. There are 3 main categories and to know in which cate a status code is in, you just have to look at the first number.</p>
<ul>
	<li><em>Informational responses</em> start with 1  (100–199)</li>
<li><bold>Success</em> start with 2 (200–299)</li>
<li><em>Redirect</em> start with 3 (300–399)</li>
<li><em>Client errors</em> start with 4 (400–499)</li>
<li> <em>Server errors</em> start with 5 (500–599).</li>
</ul>

<p>It is super important to return the appropriate response to a project. Very often you might have a 200 response back from your server but then the body looks something like this:</p>

<pre><code>
{requestIsValid:false}
</code></pre>

<p>If the request is invalid we should always return some sort 4**. the reason why its so important is that it allows us to write consistant code. For example, we might have a web application that needs to make API request. We might want our fetch function to errors to a specific file (<a href='/javascript/promises-in-real-world-javascript.html)>Check out our article about custom fetched</a>) </p>

<pre><code>
const myFetch = (url, options) => {
	return new Promise((resolve, reject) => {
	fetch(url, options).then(
		data => {
			const isSuccess = res.status.toString()[0] === '2'
			if(!isSuccess){
				const logMessage = `Request  to ${url} with Options ${options} failed with status code ${res.status}
			} else {
				// Do something with successful request
			}
		})
	})
}

</code></pre>

<p>You can see that with this code if we get a 200 but the request actually failed, our code will process the response like a successful call. This is extremely hard to debug, and forces us to write some extra code to handle these custom errors.</p>

