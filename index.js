require("dotenv").config()
const express = require("express")
const swaggerUI = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jsdoc')
const route = require('./routes/routes')
const adminRoute = require('./routes/admin-routes')
const morgan = require('morgan')
const app = express()
const port = 5000
const cors = require('cors')

const swaggerOption = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            version: "1.0.0",
            title: "Api's for Sesi Banking Services",
            description: "Modern banking services",
            contact: {
                name: "Sesi",
                email: "bankinginfo@gmail.com"
            },
            servers: ["http://localhost:5000"],
        },
    },
    apis: ["./routes/*.js"]
}

const swaggerDocs = swaggerJSDoc(swaggerOption)
app.use(cors())
app.use(morgan('tiny'))
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/admin', adminRoute)
app.use('/api', route)

app.get('/test', (request, response) => {
    return response.status(200).json({
        status: 200,
        message: "App is healthy"
    })
})

app.listen(5000, ()=> {
    console.log(`Now listening on port ${port}`)
})