
const bcrypt = require("bcrypt")
const Joi = require("joi")
const { findAdminByEmail, createAdminAcct} = require("../../model/user-management/index")

async function createAdmin(request, response) {
   try {
   const schema = Joi.object({
      full_name: Joi.string().max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      role: Joi.string().valid("superadmin", "admin", "moderator").required()
   }).unknown(false)

   const { error, value } = schema.validate(request.body)

   if (error) {
      return response.status(400).json({ message: error.details[0].message})
   }
    const adminData = value
    const created_at = new Date()

    //hash admin password before saving to the db
    const hashPassword = await bcrypt.hash(adminData.password, 10)
    adminData.created_at = created_at

   //assign admin password to hashpassword
    adminData.password = hashPassword

   //check if admin with email already exist
   const existingAdmin = await findAdminByEmail(adminData.email)

   if (existingAdmin.length !== 0) {
      return response.status(400).json({ message: "Admin with the email already exists." })
   }

    await createAdminAcct(adminData)
    response.status(201).json({
       success: true,
       message: "Account created successfully",
      })
   } catch (error) {
    console.log(error)
    return response.status(500).json({ message: "Internal server error"})
   }
}

module.exports = createAdmin