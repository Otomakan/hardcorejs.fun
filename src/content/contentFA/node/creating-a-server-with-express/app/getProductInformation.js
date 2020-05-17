// The variable allProducts simulates our database
// Normally you would call a database like MySQL, MongoDB, Postgres ...
const allProducts = {
	'abc': {
		name: 'Deck of Cards',
		price: '5'
	},
	'cde': {
		name: 'Awesome Video Game',
		price: '50'
	},
		'efg': {
		name: 'Cheese Grater',
		price: '7'
	}
}

const getProductInformation = (productId) => {
	if(allProducts[productId]) {
		return allProducts[productId]
	} else {
		throw new Error('The product with id ' + productId + ' does not exist')
	}
}


module.exports = getProductInformation