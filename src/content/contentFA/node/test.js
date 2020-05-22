const path = require('path')

const relPath = path.relative('src\content\mdContent' , 'C:\WSLHome\TechDocs\blog\design\hardcorejs.fun\src\content\mdContent\javascript\13-04-2020-building-a-line-chart-with-d3\prev.md').split(path.sep)[0]
console.log(relPath)
console.log(path.parse('C:\WSLHome\TechDocs\blog\design\hardcorejs.fun\src\content\mdContent\javascript\13-04-2020-building-a-line-chart-with-d3\prev.md'))