const { findUserByEmail } = require("../../model/account-service")
const jwt = require("jsonwebtoken")

async function resetPasswordLink(request, response) {
    try {
    const { email } = request.body

    const emailExist = await findUserByEmail(email)

    if (emailExist.length === 0) {
        return response.status(404).json({ message: "Email does not not exist."})
    }

    const obj = { email }

      // GENERATE JWT TOKEN 
    const token = jwt.sign(obj, process.env.RESET_PASSWORD_SECRET, { expiresIn: '10m' })

    const resetUrl = `http://localhost:5000/api/verify-token/${token}`
    return response.status(200).json({ success: true, resetUrl})
    } catch (error) {
        console.log(error)
        response.status(500).json({ message: "An error occurred"})
    }
}

module.exports = resetPasswordLink