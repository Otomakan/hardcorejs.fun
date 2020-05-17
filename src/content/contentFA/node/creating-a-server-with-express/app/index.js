const express = require('express')
const app = express() 
const port = 4000
// These 3 functions don't exist yet
const productDao = require('./productDao')
const getProductTemplate = require('./getProductTemplate')
const populateTemplate = require('./populateTemplate')

// Here, we pass two arguments to app.get: the route name, and the handler
app.use(express.static('public'))


// Returns all products 
app.get('/product', (req, res) => {
	const allProducts = productDao.getAll()
	res.send(allProducts) 
})

app.get('/product/:id', (req, res) => {
	const productId = req.params.id
	const allProducts = productDao.getInfo(productId)
	res.send(allProducts) 
})

app.post('/product', (req, res) => {
	const { name, price }= req.query
	productDao.addProduct({name, price})
})

app.listen(port, () => console.log(`Server running on: http://localhost:${port}`))

// Express allows us to access named parameters by adding ":" in front of the route
// app.get('/product/:id', function (request, response) {
// 	// We can access the productId in the Response params object
// 	// For example if the used tries to access "/product/abc"
// 	// productId === 'abc'
// 	const productId = request.params.id

// 	const product = getProductInformation(productId)

// 	const template = getProductTemplate()

// 	const finalHTML = populateTemplate(template, product)
//   response.send(finalHTML)
// })
