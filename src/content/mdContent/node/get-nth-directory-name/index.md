---
template: blog-page
title:  "Get the nth directory in Node" 
categories:
- JS
- Node
tags:
- node
- directory
- path
- folder
header: no
breadcrumb: true
meta_description: "How to get the name of a specific directory in Node."
author: Jack Misteli
---

<p class='prelude'>To build this blog I have recently been working on some Input Output in Node. <a href="/web-development/how-this-website-is-built/">This site</a> uses a <a href="/web-development/compiling-web-pages">custom static site builder</a> based on Gulp. You can learn more about Gulp in <a href="/web-development/how-to-use-gulp">this blog post</a>. The Node documentation can be <a href="https://nodejs.org/api/path.html">a bit hard to understand at first</a>, so here are some Node path helpers. If you are a bit scared by <code>path</code> just try to remember that is it just a string manipulation library. You enter a string and it returns a string.</p>

# Getting a specific directory

One thing I have to do is to classify each blog post by category. And I write each blog post in the folder matching its category like this:

<pre class='folder'>
├───javascript
│   ├───arrow-functions.md
│   ├───const-vs-var-vs-let.md
├───node
│   ├───counting-files-in-node.md
</pre>

In this example, I would like to turn this directory tree into:

<pre><code>
{
 "javascript": [
  "arrow-function",
  "const-vs-var-vs-let"
 ],
 "node": [
  "counting-files-in-node"
 ]
}
</code></pre>

In my case I have an absolute path <code>C:\rootDir\projectDir\src\content</code> in Windows (you might have noticed the slash direction).

# Getting a filename in NodeJS

Let's first see how we can extract the file name from a path:
<p class='module-name'>getFileName.js</p>
<pre><code>
const path = require('path')
const getFileName = (absolutePath) => {
 return path.baseName(absolutePath)
}
console.log(getFileName('C:\rootDir\projectDir\src\content\node\arrow-functions.md'))
// logs 'arrow-functions.md'
</code></pre>

Now

# Convert a path to an array

To convert a path to an array we just need to use <a href='/javascript/split-string'> the native string <code>split</code> function</a>. And use <code>path.sep</code> as the split target. The cool thing with <code>path.sep</code> is that it detects what our operating system uses to divide directories. So on POSIX: <code>path.sep === '/'</code> and on Windows, <code>path.sep ==='\' || '\\'</code>.

<p class='module-name'>pathToArray.js</p>
<pre><code>
const path = require('path')
const target = 'C:\rootDir\projectDir\src\content\node\arrow-functions.md'

const arrayPath = target.split(path.sep)
//arrayPath === [
//  'C:',
//  'rootDir',
//  'projectDir',
//  'src',
//  'content',
//  ',
//  'node',
//  'arrow-functions.md'
//]

//You can also try just opening your terminal and run 'node'
process.cwd().split(path.sep)
//and see what shows up for you
</code></pre>

To get a directory at a specific position all we have to do is:

<p class='module-name'>getNthDir.js</p>
<pre><code>

</code></pre>
<pre><code>
const path = require('path')
const getNthDirectory = (dir, dirNumber) => {
 return dir.split(path.sep)[dirNumber]
}
const getNthDirectoryFromEnd = (dir, dirNumber) => {
 const splitDir = dir.split(path.sep)
 return splitDir[splitDir.length - 1 - dirNumber]
}

// This string works on Windows, to test in on Linux or Mac machine please switch the path to
//  const target = 'C:/rootDir/projectDir/src/content/node/arrow-functions.md'

const target = 'C:\rootDir\projectDir\src\content\node\arrow-functions.md'
const fileName = getNthDirectoryFromEnd(target, 0)
//logs arrow-functions.md
const rootDirectory = getNthDirectory(target, 0)

</code></pre>

<!-- ## Get directory name relative to another directory

The path library also has an awesome function called <code>path.relative</code> which allows us to more easily break down an absolute path.

In our example, we don't care about <code>''C:\rootDir\projectDir\src\content'</code> because it might change from machine to machine. What I want is the directory name after the folder <code>'src\content'</code>.

<p class='module-name'>getRelativePath</p>
<pre><code>
const path = require('path')
const target = '/rootDir/projectDir/src/content/node/arrow-functions.md'

const relativePath = path.relative('src/content', target)

</code></pre> -->
