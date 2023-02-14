const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const cors = require('cors')
const app = express()
dotenv.config()

// import routes
const serveurRoutes = require('./routes/serveur')

// cors
app.use(cors())

// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// routes

app.use('/api/serveur', serveurRoutes)

module.exports = app;