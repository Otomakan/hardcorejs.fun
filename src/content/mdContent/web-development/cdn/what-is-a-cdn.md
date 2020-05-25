---
template: blog-page
title:  "What is a CDN"
categories:
		- JS
tags:
		- bacon
meta_description: "Description in the range of 80 to 155 characters."
author: Jack Misteli
---


CDN stands for Content Delivery Network. A CDN is a network of computers which main purpose is to serve content over the internet.

It is important to remember that a CDN is just a network. The CDN does not host your files or applications.

## A Historical comparison

We can compare it the a physical mail posting network. Back in the horse riding days, countries would setup large network on their territory to support mail transport. They would setup things like post office, resting stations for the horses, maps, roads and more.

Let's say that Bob had to send a letter to Alice. Bob first  had to give the letter to the post office. Then at the post office they would have to figure out which post rider was going in Alice's direction. Then the rider would go to a post office near Alice's place. Then that post office or relay would have to find the next closest post office to alice and so on... Until we finally arrive at Alice's place.

<img src='/assets/images/web-development/ancient-postal-service.jpg' alt='The Louth-London Royal Mail, by Charles Cooper Henderson, 1820'/>

That process could be very long, and Bob might not trust the people at the post office. Maybe one of the carrier would steal or drop the letter. Maybe a carrier would just sneak a peak at what they are writting to each other.

So Bob can hire a company he trusts to deliver the letter. Maybe that company has better horses, pays their employees better...  So Bob trusts the carrier to bring the letter faster, more reliably and has more guarantee that nobody will sneak a peak.

Well a CDN does the same thing as the fancy carrier company. It helps our sites to be faster, safer, more reliable and more available to our users.

<img src='/assets/images/web-development/cdn-model.png' alt='An illustration of how CDNs can improve delivery'/>

## How CDNs optimize content delivery

There are a lot of very advanced techniques that CDN providers use to improve content delivery. Some of the most common are:

- Leveraging a dense and global computer network. Usually, a CDN providers uses  Internet service providers and network operators to host hosting their servers in order to be as close as possible to the final users and have less intermediaries.
- Extremely efficient caching
- Hardware and software optimization
- Minimisation

We wrote some more stuff about the benefits of using a CDN in our article <a href="/web-development/cdn/why-use-a-cdn.html"> Why use a CDN</a>.
