const dbConnection = require("../../config/db-connection")

async function findAdminByEmail(email) {
    const query = 'SELECT * from admin WHERE email = ?'
    return new Promise((resolve, reject) => {
        dbConnection.query(query, [email], (error, result)=>{
            if(error){
                reject(error)
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

async function getUsersByAdmin(sql, offset, limit) {
    return new Promise((resolve, reject) => {
        dbConnection.query(sql, [offset, limit], (error, result)=>{
            if(error){
                reject(error)
            } else {
                resolve(result)
            }
        })
    })
}

async function getUserById(id) {
    const query = 'SELECT * from account WHERE id = ?'
    return new Promise((resolve, reject) => {
        dbConnection.query(query, [id], (error, result)=>{
            if(error){
                reject(error)
            } else {
                resolve(result)
            }
        })
    })
}

async function deleteUserr(id) {
    const query = 'DELETE FROM account WHERE id = ?'
    return new Promise((resolve, reject) => {
        dbConnection.query(query, [id], (error, result)=>{
            if(error){
                reject(error)
            } else {
                resolve(result)
            }
        })
    })
}

async function updateUsers(id, data) {
    const query = 'UPDATE account SET ? WHERE id = ?'
    return new Promise((resolve, reject) => {
        dbConnection.query(query, [data, id], (error, result)=>{
            if(error){
                reject(error)
            } else {
                resolve(result)
            }
        })
    })
}

async function updateUserWithEmail(email, data) {
    const query = 'UPDATE accountss SET ? WHERE emailAddress = ?'
    return new Promise((resolve, reject) => {
        dbConnection.query(query, [data, email], (error, result)=>{
            if(error){
                reject(error)
            } else {
                resolve(result)
            }
        })
    })
}


module.exports = {
    findAdminByEmail,
    createAdminAcct,
    getUsersByAdmin,
    getUserById,
    updateUsers,
    deleteUserr,
    updateUserWithEmail
}