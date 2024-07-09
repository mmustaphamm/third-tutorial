const Joi = require("joi")
const { getUserById } = require("../../model/account-service")
const { updateBalance } = require("../../model/transaction-management/index")


async function depositFunds(request, response) {
    try {
        const schema = Joi.object({
            amount: Joi.number().required(),
         }).unknown(false)
      
         const { error, value } = schema.validate(request.body)
      
         if (error) {
            return response.status(400).json({ message: error.details[0].message})
         }

         const userData = value
         const { id } = request.user

        //  get user information from the db
         const user = await getUserById(id)

         if (Number(userData.amount) < 0) {
            return response.status(400).json({ message: "amount must be greater than 0"})
         }

        // compute the balance with the deposit amount
         const totalBalance = Number(user.balance) + Number(userData.amount)

        //  update the db with totalbalance
        await updateBalance(totalBalance, user.accountNumber)

        return response.status(200).json({ success: true, message: `you have successfully deposited ${userData.amount} in your account. Your balance is now ${totalBalance}`})

        
    } catch (error) {
        console.log(error)
        return response.status(500).json({ message: "An error occurred."})
    }
}

module.exports = depositFunds