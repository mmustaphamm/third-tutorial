const dbConnection = require('../config/db-connection')

async function createAccounts(userData) {
    const query = 'INSERT INTO account (firstName, lastName, gender, address, phoneNumber, createdAt, emailAddress, password, accountNumber, identityNumber) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const { firstName, lastName, gender, address, phoneNumber, createdAt, email, password, accountNumber, identityNumber } = userData;
    const values = [firstName, lastName, gender, address, phoneNumber, createdAt, email, password, accountNumber, identityNumber]
    return new Promise((resolve, reject) => {
        dbConnection.query(query, values, (error, result) => {
            if (error) {
                reject( error)
            }
            resolve(result)
        })
    })
}

async function findUserByEmail(email) {
    const query = 'SELECT * from account WHERE emailAddress = ?'
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

async function findEmail(email) {
    const query = 'SELECT emailAddress from account WHERE emailAddress = ?'
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

async function findSortCode(sortCode) {
    const query = 'SELECT sortCode from account WHERE sortCode = ?'
    return new Promise((resolve, reject) => {
        dbConnection.query(query, [sortCode], (error, result)=>{
            if(error){
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

async function getUserById(id) {
    const query = 'SELECT * FROM account WHERE id = ?'
    return new Promise((resolve, reject) => {
        dbConnection.query(query, [id], (error, result)=>{
            if(error){
                reject(err)
            } else {
                resolve(result[0])
            }
        })
    })
}

module.exports = {
    createAccounts,
    findUserByEmail,
    findEmail,
    findSortCode,
    getUserById,
}