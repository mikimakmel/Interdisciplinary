const mongoose = require('mongoose')

const question_schema = new mongoose.Schema({
    id: { type: Number, index: 1, required: true },
	question: { type: String, required: true },
	answers: { type: [String], required: true },
	correct: { type: Number, required: true }
})

module.exports = mongoose.model('questions', question_schema)