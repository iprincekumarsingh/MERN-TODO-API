const express = require('express')
require('dotenv').config()

const dbConn = require('./config/dbConn')
dbConn()


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

const todoRoutes = require('./routes/todo.route')

app.use('/api/v1/', todoRoutes)

module.exports = app