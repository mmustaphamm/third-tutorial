require("dotenv").config()
const express = require("express")
const route = require('./routes/routes')
const app = express()
const port = 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', route)

app.listen(port, ()=> {
    console.log(`Now listening on port ${port}`)
})