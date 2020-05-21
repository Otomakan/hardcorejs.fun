
# Framed Autonomy 🐼

## What is Framed

Framed is a minimalistic(ish) static website generator written in Node and relying on gulp as a build system. The generated website is intended to feel like a dynamic site. The page transitions doesn't rely on third party librairies so the JS is super minimalistic. It relies on `document.write()` so if that's a no no for you please suggest some other methods!

## Why Framed

- Minimalistic. Framed is for building quickly fast website

- Adaptable. The code is not complicated you have full control over your sass, html and content. Framed is for developers who know how to code but don't have time to build.

- Dynamic. Framed can be use to
- Static. No or minimal hosting costs for the win!

## Getting Started 🚀

### Prerequisites 学

All you need is Node and npm installed and your machine. If you don't find out how here: <https://docs.npmjs.com/downloading-and-installing-node-js-and-npm.>

### Setup 造

First clone this repository, then run npm install

```
git clone https://github.com/Otomakan/framed-autonomy.git
cd framed-autonomy
npm install
```

## Usage ⽤

### Build your site

If all the packages were installed properly all you need to do is go in your command line and type
```gulp```
And a browser sync will start a local server on port 3000 and open a window in your favorite browser.
Gulp has a bunch of watch functions which will update the website when it detects a file change

### Customize it

Write your page templates in src/content/templates and the content of you page in a JSON format in src/content/contentJSON.
<<<<<<< HEAD

Gulp will read your template file and replace each ##key## in the template by the key provided in the JSON file.

Don't forget to tell Gulp which template you are using in the JSON file. Here is an example

```
{
 "template": "template-page",
 "title":"Template Page",
 "subtitle":"A Page about templates",
 "content":"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmodtempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodoconsequat. Duis aute irure dolor in reprehenderit in voluptate velit essecillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat nonproident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lore"
}
```

```
 #headme
<div class="body-wrapper">
<div class='container-template'>
 <div class='page-title'>
  <div class="title-text">
   <h1 >##title##</h1>
   <div id='blo'></div>
   <h2 class='page-subtitle'>##subtitle##</h2>
  </div>

 </div>
  <div class="page-content">
   <p>##content##</p>
  </div>
 </div>
```

Will generate in src/content

```
<div class='body-wrapper'>
 <div class='container-template'>
 <div class='page-title'>
  <div class='title-text'>
   <h1>Template Page</h1>
   <div id='blo'></div>
   <h2 class='page-subtitle'>A Page about templates</h2>  
   </div>
  </div>  
  <div class='page-content'>   <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmodtempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodoconsequat. Duis aute irure dolor in reprehenderit in voluptate velit essecillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat nonproident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lore</p>  </div> </div></div>
```

Unfortunately for now you have to write the  nav menu manually in utils/headernav.html. Hopefully you soon won't have to!
