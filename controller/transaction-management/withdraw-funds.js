const Joi = require("joi")
const { getUserById } = require("../../model/account-service")
const { updateBalance } = require("../../model/transaction-management/index")

async function withdrawFunds(request, response) {
    try {
        const schema = Joi.object({
            amount: Joi.number().required(),
            accountNumber: Joi.number().required()
         }).unknown(false)
      
         const { error, value } = schema.validate(request.body)
      
         if (error) {
            return response.status(400).json({ message: error.details[0].message})
         }

         const userInput = value

         const { id } = request.user
         const user = await getUserById(id)

         if (Number(userInput.amount) < 0) {
            return response.status(400).json({ message: "You cannot withdraw an amount less than 0"})
         }

        //  check to see that the account number matches the one of the user
         if (user.accountNumber !== userInput.accountNumber) {
            return response.status(409).json({ message: "Account number does not match" })
         }
         
        // check if they have suffient balance to carry out the withdrawal

        if (Number(user.balance) < Number(userInput.amount)) {
            return response.status(400).json({ message: "Insufficient balance"})
        }

        const remainingBalance = Number(user.balance) - Number(userInput.amount)

        console.log(remainingBalance, user.balance)

        // update the db with the remaining balance after withdrawal
        await updateBalance(String(remainingBalance), user.accountNumber)

        return response.status(200).json({ succes: true, message: `You have successfully withdraw ${userInput.amount}. Your remaining balance is ${remainingBalance}`})

    } catch (error) {
        console.log(error)
        return response.status(500).json({ message: "An error occurred" })
    }
}

module.exports = withdrawFunds