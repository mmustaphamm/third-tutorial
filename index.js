require("dotenv").config()
const express = require("express")
const swaggerUI = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jsdoc')
const route = require('./routes/routes')
const adminRoute = require('./routes/admin-routes')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const port = 5000

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

const allowedOrigins = ['http://localhost:3000', 'http://another-example.com'];
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
};

const swaggerDocs = swaggerJSDoc(swaggerOption)
app.use(morgan('tiny'))
app.use(cors(corsOptions))
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

app.listen(port, ()=> {
    console.log(`Now listening on port ${port}`)
})