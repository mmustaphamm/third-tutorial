const dbConnection = require("../../config/db-connection")

async function findAdminByEmail(email) {
    const query = 'SELECT * from admin WHERE email = ?'
    return new Promise((resolve, reject) => {
        dbConnection.query(query, [email], (error, result)=>{
            if(error){
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

async function createAdminAcct(adminData) {
    const query = 'INSERT INTO admin (full_name, created_at, email, password, role) VALUES (?, ?, ?, ?, ?)';
    const { full_name, created_at, email, password, role } = adminData;
    const values = [full_name, created_at, email, password, role]
    dbConnection.query(query, values, (error, result) => {
        if (error) {
            throw error
        }
        return result
    })
}


module.exports = {
    findAdminByEmail,
    createAdminAcct
}