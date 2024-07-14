const Joi = require("joi")
const { getUserById} = require("../../model/user-management/index")

async function getSingleUser(request, response) {
    try {

        const userid = request.params.id

        const user = await getUserById(userid)

        if(user.length ===0 ){
            return response.status(404).json({ message: "User not found"})
        }
        return response.status(200).json({ success: true, data: user})
    } catch (error) {
        console.log(error)
        return response.status(500).json({ message: "An error occurred"})
    }
}

module.exports = getSingleUser
