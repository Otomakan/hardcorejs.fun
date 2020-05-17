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

const getInfo = (productId) => {
	if(allProducts[productId]) {
		return allProducts[productId]
	} else {
		throw new Error('The product with id ' + productId + ' does not exist')
	}
}

const addProduct = (product) => {
	const createId = () => Math.random()
	const productId = createId()
	allProducts[productId] = product
}

const getAll = () => {
	return allProducts
}


module.exports = {getInfo, addProduct, getAll}