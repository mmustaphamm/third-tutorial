const Joi = require("joi")
const { getUserById, updateUsers } = require("../../model/user-management/index")
const bcrypt = require("bcrypt")

async function changePassword(request, response) {
    try {
        const schema = Joi.object({
            current_password: Joi.string().required(),
            new_password: Joi.string().required(),
            confirm_new_password: Joi.string().required(),
         }).unknown(false)
      
         const { error, value } = schema.validate(request.body)
      
         if (error) {
            return response.status(400).json({ message: error.details[0].message})
         }

         const { current_password, new_password, confirm_new_password } = value

         if(new_password !== confirm_new_password) {
            return response.status(400).json({ message: "confirm password does not match with the new password." })
         }

         const { id } = request.user

         const userData = await getUserById(id)

         const match = await bcrypt.compare(current_password, userData[0].password)

         if(!match) {
            return response.status(400).json({ message: "Current password is invalid or does not match with existing password."})
         }

         const newPassword = await bcrypt.hash(new_password, 10)

         await updateUsers(id, {password: newPassword})

         return response.status(200).json({ message: "your password has been changed successfully."})
    } catch (error) {
        console.log(error)
    }
}

module.exports = changePassword