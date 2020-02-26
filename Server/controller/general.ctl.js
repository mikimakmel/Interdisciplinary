const Question = require('../models/question')
const Life = require('../models/life')
const Emission = require('../models/emissions')

module.exports = {

    async getAllQuestions(req, res) {
        console.log("getAllQuestions()")
        const docs = await Question.find({})

        if (docs) res.json(docs)
        else res.status(404).send("not found")
    },

    async getAllLifes(req, res) {
        console.log("getAllLifeExpectancys()")
        const docs = await Life.find({})

        if (docs) res.json(docs)
        else res.status(404).send("not found")
    },

    async getAllEmissions(req, res) {
        console.log("getAllEmissions()")
        const docs = await Emission.find({})

        if (docs) res.json(docs)
        else res.status(404).send("not found")
    }

}