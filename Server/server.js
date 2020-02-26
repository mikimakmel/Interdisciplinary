const express = require('express')
const cors = require('cors')
const generalCtl = require('./controller/general.ctl')

const app = express()
const port = process.env.PORT || 3000
app.set('port', port)
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/*** All routes ***/
app.get('/getAllQuestions', generalCtl.getAllQuestions)
app.get('/getAllLifes', generalCtl.getAllLifes)
app.get('/getAllEmissions', generalCtl.getAllEmissions)

// in case of a wrong route creating a fallback.
app.all('*', (req, res) => { res.send("Wrong route, please try again.") })

app.listen(port, () => console.log(`Listening on port ${port}`))