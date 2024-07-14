const jwt = require("jsonwebtoken")

function verifyTokenAdmin(request, response, next) {
    const bearerHeader = request.headers['authorization']

    if (bearerHeader === undefined || bearerHeader === null) {
        return response.status(401).json({ message: "No token provided." })
    }

    const bearerToken = bearerHeader.split(' ')[1]

    jwt.verify(bearerToken, process.env.ADMIN_SECRET_KEY, (error, result) => {
        if(error) {
            console.log(error)
            return response.status(403).json({ message: "FORBIDDEN."})
        }

        if (!result.role) {
            return response.status(401).json({ message: "Authentication failed. Admin isn't assigned a role."})
        }

        request.admin = result
        next()
    })
}

module.exports = verifyTokenAdmin