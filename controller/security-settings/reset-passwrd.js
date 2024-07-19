const bcrypt = require("bcrypt")
const { updateUserWithEmail } = require("./../../model/user-management/index")

async function resetPasswrd(request, response) {
    try {
        const { email, new_password, confirm_password } = request.body

        if (new_password !== confirm_password) {
            return response.status(400).json({ message: "password mismatch"})
        }

        const hashPassword = await bcrypt.hash(new_password, 10)

        await updateUserWithEmail(email, { password: hashPassword })

        return response.status(200).json({ message: "password reset successfully" })

    } catch (error) {
        console.log(error)
        response.status(500).json({ message: "An error occurred"})
    }
}

// function reset(request, response){
//     const { email, new_password, confirm_password } = request.body

//     if (new_password !== confirm_password) {
//         return response.status(400).json({ message: "password mismatch" })
//     }

//     bcrypt.hash(new_password, 10).then( hashPassword => {
//         updateUserWithEmail(email, { password: hashPassword }).then()
//     }).catch(error=> {
//         console.log(error)
//         response.status(500).json({ message: "An error occurred"})
//     })
// }

module.exports = resetPasswrd

