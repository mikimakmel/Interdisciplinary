const mongoose = require('mongoose')

const life_schema = new mongoose.Schema({
	country: { type: String, required: true },
	rank: { type: Number, required: true },
	age: { type: Number, required: true }
})

module.exports = mongoose.model('lifes', life_schema)