const { getUserById } = require("../../model/account-service")

async function checkBalance(request, response) {
    try {

        const { id } = request.user

        const userData = await getUserById(id)

        if (!userData) {
            return response.status(404).json({ message: "This user does not exist."})
        }
        // return the balance of the user
        return response.status(200).json({ success: true, balance: Number(userData.balance) })
        
    } catch (error) {
        console.log(error)
        return response.status(500).json({ message: "Internal server error"})
    }
}

module.exports = checkBalance