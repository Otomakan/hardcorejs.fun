---
layout: blog-page
title:  "Turning strings to arrays with Split"
categories:
- JS
tags:
- Split
- Javascript
- String
- Native API
meta_description: "Split splice slice, it's all so confusing ! Split is the one that splits a string into an array. split split split "
author: Jack Misteli
---

Split makes it super easy to divide a string into whatever fits your needs. All you have to do is to pass a separator to the split function. A separator is a character, string or regex you want to use as a dividor. The split function will use that separator to split the string into an array of string everywhere. Here are a few examples.

# Basic string manipulation

## Convert sentences to Arrays

This is maybe the most simple example of the split.

<p class='module-name'></p>
const story = 'The fox likes crows. The crow hates foxes'
// We use the dot '.' as a separator
const allSentences = story.split('.')
// allSentences === [ 'The fox likes crows', ' The crow hates foxes' ]

//If we have multiple targets we can also use Regexes
// This regex will detect commas, exclamation points and question marks
const reg = /\.|!|\?/g
const dialog = 'Hey you! Come here! What is your name? My name is Jack'
const allDialogSentences = dialog.split(reg)
console.log(allDialogSentences)
// === [ 'Hey you', ' Come here', ' What is your name', ' My name is Jack' ]
<pre><code>

</code></pre>

## Convert a string to an Array

We can also convert each character to an array. To do so we have to enter an empty string
<p class='module-name'>stringToArray</p>
<pre><code>
const sentence = 'I love cheese'
const splitSentence = sentence.split('')
</code></pre>

# Reading a CSV file in Javascript

CSV very common file format to store data. We wrote <a href="/programming/what-is-csv.md">an article about it if you want to learn more about it.</a>

<p class='module-name'>getCsvRows.js</p>
<pre><code>
// csv contains some fake data
const csv =
`first_name,last_name,age
Jack,Misteli,27
Vanessa,Campari,37
Barry,Gana,12`

// the character \n means new line
const rows = csv.split('\n')
// We have four rows the first contains the table info and

const columnNames = rows[0].split(',')
// columnNames === [ 'first_name', 'last_name', 'age' ]

const rowValues = rows.slice(1, rows.length)
// we can divide all rows
const csvValuesParsed = rowValues.map(row => row.split(','))
console.log(csvValuesParsed)
//[
//  [ 'Jack', 'Misteli', '27' ],
//  [ 'Vanessa', 'Campari', '37' ],
//  [ 'Barry', 'Gana', '12' ]
//]

</code></pre>
