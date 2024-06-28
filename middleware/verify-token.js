const jwt = require("jsonwebtoken")

function verifyToken(request, response, next) {
    const bearerHeader = request.headers['authorization']

    if (bearerHeader === undefined || bearerHeader === null) {
        return response.status(401).json({ message: "No token provided." })
    }

    const bearerToken = bearerHeader.split(' ')[1]

    jwt.verify(bearerToken, process.env.SECRET_KEY, (error, result) => {
        if(error) {
            console.log(error)
            return response.status(403).json({ message: "FORBIDDEN."})
        }
        console.log(result)
        next()
    })
}

module.exports = verifyToken