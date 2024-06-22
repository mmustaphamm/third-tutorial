const express = require("express")
const dotenv = require("dotenv")
const route = require('./routes/routes')
dotenv.config()
const app = express()
const port = 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', route)

app.listen(port, ()=> {
    console.log(`Now listening on port ${port}`)
})