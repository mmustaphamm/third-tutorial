const Joi = require("joi")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { findAdminByEmail } = require("../../model/user-management")

const loginAdmin = async (request, response)=> {
    try {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required()
         }).unknown(false)
      
         const { error, value } = schema.validate(request.body)
      
         if (error) {
            return response.status(400).json({ message: error.details[0].message})
         }

         const adminInput = value
          //check if user with email already exist
        const existingAdmin = await findAdminByEmail(adminInput.email)
       
        if (!existingAdmin|| existingAdmin.length === 0) {
            return response.status(404).json({ message: "This email does not exist" })
        }

        // compare passwords using bcrypt
        const match = await bcrypt.compare(adminInput.password, existingAdmin[0].password)

        if (!match) {
            return response.status(401).json({ message: "Invalid password" })
        }

        const admin = {
            id: existingAdmin[0].id,
            email: existingAdmin[0].email,
            role: existingAdmin[0].role
        }

        // GENERATE ADMIN JWT TOKEN 
        const token = jwt.sign(admin, process.env.ADMIN_SECRET_KEY, {expiresIn: '1h'})

        return response.status(200).json({
            message: "Login successful", 
            token
        })

    } catch (error) {
        console.log(error)
        return response.status(500).json({ message: "An error occurred" })
    }
}

module.exports = loginAdmin