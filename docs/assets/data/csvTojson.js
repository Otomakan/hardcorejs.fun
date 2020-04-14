const path = require('path')
const fs = require('fs')
const csv=require('csvtojson')
csv()
.fromFile(path.resolve(__dirname, './share-of-people-who-say-they-are-happy.csv'))
.then((jsonObj)=>{
		console.log(jsonObj);
		jsonObj.forEach(entry=>{
			entry.country = entry.Entity
			entry.happinessPercentage = entry['(%)']
			delete entry['(%)']
			delete  entry.Entity
			delete entry.Code
		})
		fs.writeFileSync(path.resolve(__dirname, './share-of-people-who-say-they-are-happy.json'), JSON.stringify(jsonObj))
		fs.writeFileSync(path.resolve(__dirname, './share-of-people-who-say-they-are-happy-argentina.json'), JSON.stringify(jsonObj))

    /**
     * [
     * 	{a:"1", b:"2", c:"3"},
     * 	{a:"4", b:"5". c:"6"}
     * ]
     */ 
})