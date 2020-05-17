const Handlebars = require("handlebars");


// Populate template will replace the content in our brackets by the values in the targets object
const populateTemplate = (template, targets) => {
	// You don't really need to understand how it workd for now
	let compiled = Handlebars.compile(template)
	return compiled(targets)
}

module.exports = populateTemplate