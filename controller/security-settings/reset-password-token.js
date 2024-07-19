const jwt = require("jsonwebtoken")

async function resetPasswordVerifyToken(request, response) {
    try {
        const { token } = request.params
        jwt.verify(token, process.env.RESET_PASSWORD_SECRET, (error, result) => {
            if(error) {
                console.log(error)
                return response.status(400).json({ message: "The reset link is expired"})
            }

            return response.status(200).json({ success: true, email: result.email})
        })
    } catch (error) {
        response.status(500).json({ message: "An error occurred"})
    }
}

module.exports = resetPasswordVerifyToken