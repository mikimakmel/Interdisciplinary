const mongoose = require('mongoose')

const emission_schema = new mongoose.Schema({
	country: { type: String, required: true },
	emissions: { type: Number, required: true },
	percentage: { type: String, required: true }
})

module.exports = mongoose.model('emissions', emission_schema)