const Joi = require("joi")
const { getUsersByAdmin } = require("../../model/user-management/index")
const moment = require("moment")

async function getAllUsers(request, response) {
    try {
        const inputSchema = Joi.object({
            page: Joi.number().integer().min(1).max(100).default(10),
            limit: Joi.number().integer().min(1).max(100).default(10),
            status: Joi.boolean().optional()
        })

        const { error, value } = inputSchema.validate(request.query)

        if (error) {
       return response.status(400).json({ message: error.details[0].message})
       }

       const { page, limit, status } = value

       const offset =  (page - 1) * limit

       let sql = "SELECT * FROM account"
       const whereClause = []  

    //    add filter by status if provided
    if (status) {
        whereClause.push(`isVerified = ${status}`)
    }

    if (whereClause.length > 0) {
        sql += ' WHERE ' + whereClause.join(' AND ')
    }

    // add pagination
    sql += ' ORDER BY createdAt DESC LIMIT ?'

    const users = await getUsersByAdmin(sql, offset, limit)
    return response.status(200).json({ success: true, data: users })
    } catch (error) {
        console.log(error)
        return response.status(500).json({ message: "An error occurred"})
    }
}

module.exports = getAllUsers
