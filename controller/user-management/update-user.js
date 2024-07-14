const { getUserById, updateUsers } = require("../../model/user-management/index")
const Joi = require("joi")
const updateUser = async (request, response)=> {
    try {
        const userId = request.params.id

        const schema = Joi.object({
            firstName: Joi.string().min(2).message('Must be more than two characters').max(30).optional(),
            lastName: Joi.string().min(2).message('Must be more than two characters').max(30).optional(),
            gender: Joi.string().valid('male', 'female').optional(),
            email: Joi.string().email().optional(),
            address: Joi.string().optional(),
            phoneNumber: Joi.string().regex(/^(\+234)\d{10}$/).optional(),
         }).unknown(false)
      
         const { error, value } = schema.validate(request.body)
      
         if (error) {
            return response.status(400).json({ message: error.details[0].message})
         }

        // look if id exist on the db
        const user = await getUserById(userId)
        if(user.length === 0) {
            return response.status(400).json({ message: "Invalid user id" })
        }

        const idToUpdate = user[0].id

        const updateData = value
        // update the usertable with the new user fields
        await updateUsers(idToUpdate, updateData)

        return response.status(200).json({ message: "User update successfully" })
    } catch (error) {
        console.log(error)
        return response.status(500).json({ message: "An error occurred"})
    }

}

module.exports = updateUser