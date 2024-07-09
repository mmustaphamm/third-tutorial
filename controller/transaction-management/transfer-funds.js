const Joi = require("joi")
const { findSortCode } = require("../../model/account-service")
const { getUserById } = require("../../model/account-service")
const { 
    getAccount, 
    getAccountBalance, 
    updateBalanceAfterWithdrawal,
    updateBalance
 } = require("../../model/transaction-management/index")

async function transferFunds(request, response){
    try {
        const { accountHolderName, sortCode, accountNumber, amount } = request.body

        // validate user data
        const schema = Joi.object({
            accountHolderName: Joi.string().min(2).message('Must be more than two characters').max(30).required(),
            sortCode: Joi.string().length(6).message('Must be 6 characters').required(),
            accountNumber: Joi.string().length(10).message('Must not be more or less than 10 digits').required(),
            amount: Joi.string().required()
         }).unknown(false)
      
         const { error, value } = schema.validate({accountHolderName, sortCode, accountNumber, amount})

         if (error) {
            return response.status(400).json({ message: error.details[0].message})
         }

         const userData = value

         if (Number(amount) < 0 ) {
            return response.status(400).json({ message: "Amount should not be less than 0" })
         }

        //  get sortCode and check if it matches with the system's sort code
         const getSortCode = await findSortCode(userData.sortCode)

         if (getSortCode[0] == null || getSortCode[0] == undefined) {
            return response.status(400).json({ message: "Invalid sort code"})
         }

         //check if account holder name matches
        //  console.log(request.user)
        //  if(userData.accountHolderName !== request.user.name) {
        //     return response.status(400).json({ message: "Account name does not exist" })
        //  }

         const owner = await getUserById(request.user.id)

         if(!owner.isVerified) {
            return response.status(400).json({ message: "you are not a verified user, please submit an identity document"})
         }

        // check balance to see if its sufficient for a successful transfer
         if (Number(owner.balance) < Number(userData.amount)) {
            return response.status(400).json({ message: "Insufficient funds" })
         }

        //  verify if the destination account exist
        const destinationAccount = await getAccount(userData.accountNumber)
        if (!destinationAccount) {
            return response.status(400).json({ message: "Invalid recipient account number." })
        }

        // withdraw money from account
        const balanceAfterWithWithdrawal = Number(owner.balance) - Number(userData.amount)

        // update the userData on the db with the new balance
        await updateBalanceAfterWithdrawal(String(balanceAfterWithWithdrawal), request.user.id)

        //credit recipient account with amount
        const recipientBalance = await getAccountBalance(userData.accountNumber)
        const recipientTotalBalance = Number(recipientBalance) + Number(amount)

        // update the db with the recipient amount
        await updateBalance(String(recipientTotalBalance), accountNumber)
        return response.status(200).json({ status: true, message: "Your funds has been sent successfully." })
        
    } catch (error) {
       console.log(error)
       return response.status(500).json({ message: "An error occurred"})
    }
}

module.exports = transferFunds