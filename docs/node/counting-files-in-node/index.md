<p class='prelude'>Recursively working with the filesystem is not super easy in NodeJS. So here is a little function we can use to help us.</p>

<pre><code>
// Here we want to work with async await so we use the promises module of fs
const {promises: fs} = require('fs')
const path = require('path')

// Our walker takes 2-4 arguments
// currentDir is the path of the directory we are trying to recursively read
// targetList is an array of regex that we will try to match to our filenames
// exlusionList is an array of file or directory names we want to avoid
// allFilesPaths is the return value of our function 
// it is an array with all the file paths we are interested in

const findFiles = async (currentPath, targetList, exclusionList, allFilesPaths) => {
	exclusionList = exclusionList || []
	allFilesPaths = allFilesPaths || []
	const file = await fs.stat(currentPath)
	const fileName =  path.basename(currentPath)
	for (let i = 0; i < exclusionList.length; i++) {
		const targetReg = exclusionList[i]
		if(fileName.match(targetReg)){
			return
		}
	}
	if(file.isDirectory()) {
		// readdir shows all the files in a given directory
		const directories = await fs.readdir(currentPath)
		await Promise.all(	directories.map(async dir => {
			const nextFile = path.join(currentPath, dir)
			await findFiles(nextFile, targetList, exclusionList, allFilesPaths)
		}))
	} else {
		for (let i = 0; i < targetList.length; i++) {
			const targetReg = targetList[i]
			if(fileName.match(targetReg)){
				allFilesPaths.push(currentPath)
			}
		}

	}
	return allFilesPaths
}

const main = async () => {
	const allMDFiles = await findFiles(__dirname,[/\.md/g], [/2019-09-22-animations-in-flutter.md/])
	console.log(allMDFiles.length)
}

main()


</code></pre>

<p>For this piece of code I used async/await because I feel like it is more readable than other examples I found on the web.</p>
