const dbConnection = require('../config/db-connection')

async function createAccounts(userData) {
    const query = 'INSERT INTO account (firstName, lastName, gender, address, phoneNumber, createdAt, emailAddress, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const { firstName, lastName, gender, address, phoneNumber, createdAt, email, password } = userData;
    const values = [firstName, lastName, gender, address, phoneNumber, createdAt, email, password]
    dbConnection.query(query, values, (error, result) => {
        if (error) {
            throw error
        }
        return result
    })
}

async function findUserByEmail(email) {
    const query = 'SELECT * from account WHERE emailAddress = ?'
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

async function findPhoneNumber(phoneNumber) {
    const query = 'SELECT * from account WHERE phoneNumber = ?'
    return new Promise((resolve, reject) => {
        dbConnection.query(query, [phoneNumber], (error, result)=>{
            if(error){
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

module.exports = {
    createAccounts,
    findUserByEmail,
    findPhoneNumber,
    findEmail,
    findSortCode
}