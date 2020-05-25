---
template: blog-page
title:  "Why should we use a CDN"
categories:
		- JS
tags:
		- bacon
meta_description: "CDNs make our sites faster, more secured, more reliable and widely available."
author: Jack Misteli
---

Content Delivery networks are an amazing resource to improve our sites. We describe them in more tdetails in our article <a href="/web-development/cdn/what-is-a-cdn.html"> What is a CDN</a>.

## TL;DR

- Reliability: We want our site to always be up.
- Security: It makes our sites more secure.
- Speed: It improves page load.
- Availability: This  is connected to reliability. A CDN makes sure our site is available at all times in all region.
- Scalability: When your site grows from 10 to a millions visitors, a CDN takes care of your static content delivery. So you can focus on your product instead of scaling issues.

## 5 reasons to use a CDN

### A CDN provides a more reliable delivery

Any website should aim at having 100% uptime. This means that when a user enters our URL it should always see the content of our site. A CDN alone will not guarantee 100% uptime but it goes a long way to improve uptime with very little configuration.

### To improve the security of your site

If you're a small static site security is not a super big issue. But if we have any intention to scale, we should all care about security. CDN often have great tools to protect our sites against Distributed Denial Of Service (DOS) attacks.

Then from one CDN provider to the other we can find some additional tools to make our site safer, but DDOS are the most common ones.

A few CDN providers also have built-in SSL to make sure our site always uses HTTPS.

### To Make our content available in different geographical zones

Managing content delivery across the world is not an easy task. We have to make sure that each user gets content delivered from really close to where they make their request. CDN providers are really good at caching content, and finding the fastest path to remote users.
<img src='/assets/images/web-development/cdn-model.png' alt='An illustration of how CDNs can improve delivery'/>

### Need For speed: improve you pages load time

CDNs can make your page load much faster.Cloudflare (not a sponsor) has<a href="https://www.cloudflare.com/learning/cdn/performance/"> a nice write up on how a CDN improves load times</a>. To sum it up, a CDN serves content from computers closer to the user by caching content in edge servers (computers closer to the users). It also has some hardware optimization and can minify the content before it reaches the users.

#### How to choose the fastest CDN

To pick up a fast CDN a recommend using: <a href='https://www.cdnperf.com'><https://www.cdnperf.com/></a>. All we have to do is enter the name of our target region and see which providers are the fastest.

Here is a screenshot taken the 15th of May 2020 showing the 8 best performing CDN in Asia.

<img src='/assets/images/web-development/cdnperf-screenshot.JPG' alt='Screenshot of CDN perf showing the 10 fastest CDN providers in Asia'/>

#### The consequences of having a slow site

According to <a href='http://loadstorm.com/2014/04/infographic-web-performance-impacts-conversion-rates/'>LoadStorm</a>:

- 25% of all internet users will stop using  a website if it takes more than 4 seconds to load.
- 74% of mobile users will abandon site with over 5 seconds load time.
- 46% of users will not come back to a slow site.

### It allows us to scale our sites horizontally and vertically

#### Vertical Scaling

Vertical scaling is connected to reliability and speed. In this context, it means that we are able to serve quality content regardless of the number of users.

<p class='case-study'>
We have a new blog which probably gets 50 visitors a month. One day a big blog notices us, and send tens of thousands of users our way. This is a lof of more bandwidth we have to deal with. If things are not setup up properly on our hand our servers could be overloaded. The consequence is extremely slow page loads and maybe even our blog going completely down. Having a CDN can prevent this horror show and help up us get as close as possible to 100% uptime and constant fast page loads.
</p>

#### Horizontal Scaling

Horizontal scaling is related to our previous definition of availability.

<p class='case-study'>
 For example, let's imagine most of our users are located in India and in the United States and our servers our located in the US. Without a CDN maybe the US users will have a super fast experience. On the other hand, our Indian users might experience very slow page loads. CDNs can solve that issue for us, and make sure our audience in India gets access to the fastest load time possible.
</p>
