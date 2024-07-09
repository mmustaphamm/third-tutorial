const { getUserById } = require("../../model/account-service")
const { updateIdentityNumber } = require("../../model/transaction-management/index")
const Joi = require("joi")

async function verifyUser(request, response) {
    try {
        const schema = Joi.object({
            identityNumber: Joi.string().length(8).message('Must not be more or less than 8 characters').required(),
         }).unknown(false)
      
         const { error, value } = schema.validate(request.body)

         if (error) {
            return response.status(400).json({ message: error.details[0].message})
         }

         const { id } = request.user

        //  update the db with identity nUMBER
        await updateIdentityNumber(value.identityNumber, id)

        return response.status(200).json({ success: true, message: "Profile updated sucessfully"})
        
    } catch (error) {
        console.log(error)
        return response.status(500).json({ message: "An error occurred" })
        
    }
}

module.exports = verifyUser