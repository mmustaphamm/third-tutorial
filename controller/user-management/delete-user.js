const {deleteUserr, getUserById} = require("../../model/user-management/index")

const deleteUser = async (request, response) => {
    try {
        const userId = request.params.id

        // get the user by id

        const user = await getUserById(userId)
        if(user.length === 0) {
            return response.status(404).json({ message: "User not found"})
        }

        // delete the user

        await deleteUserr(userId)

        return response.status(200).json({ success: true, message: "user deleted successfully"})
        
    } catch (error) {
        console.log(error)
        return response.status(500).json({ message: "An error occurred"})
    }
}

module.exports = deleteUser