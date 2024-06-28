const Joi = require("joi")
const { findSortCode } = require("../../model/account-service")

async function transferFunds(request, response){
    try {
        const { accountHolderName, sortCode, accountNumber, reference, amount } = request.body
        const schema = Joi.object({
            accountHolderName: Joi.string().min(2).message('Must be more than two characters').max(30).required(),
            sortCode: Joi.string().length(6).message('Must be 6 characters').required(),
            accountNumber: Joi.string().min(2).message('Must be more than two characters').max(10).required(),
            amount: Joi.string().required()
         }).unknown(false)
      
         const { error, value } = schema.validate({accountHolderName, sortCode, accountNumber, amount})

         if (error) {
            return response.status(400).json({ message: error.details[0].message})
         }

         const userData = value

         console.log(request.data)

         const getSortCode = findSortCode(userData.sortCode)

         if (getSortCode.length !== 0) {
            return response.status(400).json({ message: "Invalid sort code"})
         }

         //check if account holder name matches



        
    } catch (error) {
       console.log(error)
       return response.status(500).json({ message: "An error occurred"})
    }
}

module.exports = transferFunds