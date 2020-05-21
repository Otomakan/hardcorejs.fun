const {promises: fs} = require('fs')
const path = require('path')  
const faParse = require('../../gulpUtils/faParser')

const mdContent = path.join(__dirname, 'mdContent')
// Our walker takes 2-4 arguments
// currentDir is the path of the directory we are trying to recursively read
// targetList is an array of regex that we will try to match to our filenames
// exlusionList is an array of file or directory names we want to avoid
// allFilesPaths is the return value of our function 
// it is an array with all the file paths we are interested in

const findFiles = async (currentDir, targetList, exclusionList, allFilesPaths) => {
	exclusionList = exclusionList || []
	allFilesPaths = allFilesPaths || []
	const file = await fs.stat(currentDir)
	const fileName =  path.basename(currentDir)
	for (let i = 0; i < exclusionList.length; i++) {
		const targetReg = exclusionList[i]
		if(fileName.match(targetReg)){
			return
		}
	}
	if(file.isDirectory()) {
		// readdir shows all the files in a given directory
		const directories = await fs.readdir(currentDir)
		const inTarget = path.join(mdContent, path.relative(path.join(__dirname, 'contentFA'), currentDir))
			try {
			await fs.mkdir(inTarget);
			} catch(e){

			}
		await Promise.all(	directories.map(async dir => {
			const nextFile = path.join(currentDir, dir)
			await findFiles(nextFile, targetList, exclusionList, allFilesPaths)
		}))
	} else {
		for (let i = 0; i < targetList.length; i++) {
			const targetReg = targetList[i]
			if(fileName.match(targetReg)){
				allFilesPaths.push(currentDir)
				await convertFAtoMD(currentDir)

			}
		}
	}
	return allFilesPaths
}


const convertFAtoMD = async (filePath) => {
	try {
	const fileContent = await fs.readFile(filePath)
	const jsoned = faParse(fileContent.toString())
	const {template, title, subtitle, meta_description, author, tags, content} = jsoned
	const newFileContent =
`---
	layout: ${template}
	title: ${title}
	meta_description: ${meta_description}
	author: ${author}
	subtitle: ${subtitle}
	categories:
---
${content}`

	const targetPath = path.relative(path.join(__dirname, 'contentFA'), filePath)
	await fs.writeFile(path.join(mdContent, targetPath).slice(0, -2) + 'md' , newFileContent)

	}catch(e) {
		console.log("ERROR at ", filePath)
		console.log(e)
	}
}

const main = async () => {
	const allFaFilePaths = await findFiles(__dirname,[/\.fa/g], [/2019-09-22-animations-in-flutter.md/])
	allFaFilePaths.forEach(filePath=> {
	})

}

main()