const express = require("express")
const authRoutes = require('./routes/auth.routes')
const cookieParser = require('cookie-parser')
const postRoutes= require('./routes/post.routes')
const app = express()

app.use(cookieParser())
app.use(express.json())
app.use('/auth', authRoutes)

module.exports = app
