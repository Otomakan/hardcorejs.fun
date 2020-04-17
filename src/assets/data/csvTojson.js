const path = require('path')
const fs = require('fs')
const csv=require('csvtojson')
csv()
.fromFile(path.resolve(__dirname, './share-of-people-who-say-they-are-happy.csv'))
.then((jsonObj)=>{
		// console.log(jsonObj);
		// jsonObj is an array of objects which looks like this:
		// { Entity: 'Hungary', Code: 'HUN', Year: '1984', '(%)': '78.451881' },
		const finalObject = {	
			properties: {
			lineLabel: 'Country',
			xAxisLabel: 'Year',
			yAxisLabel: 'Happiness Percentage'
		},
		data:[]}
		const allCountriesData = finalObject.data
		jsonObj.forEach(entry=>{
			const index = allCountriesData.findIndex(ob=>ob.id == entry.Entity)
			const newData = [entry.Year, entry['(%)']]
			if(index === -1) {
				allCountriesData.push({
					id: entry.Entity,
					data: [newData]
				})
			} else {
				allCountriesData[index].data.push(newData)
			}
		})
		fs.writeFileSync(path.resolve(__dirname, './share-of-people-who-say-they-are-happy.json'), JSON.stringify(finalObject))
})