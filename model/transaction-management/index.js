const dbConnection = require("../../config/db-connection")

async function updateBalanceAfterWithdrawal(balance, id) {
    const query = 'UPDATE account SET balance = ? WHERE id = ?'
    return new Promise((resolve, reject) => {
        dbConnection.query(query, [balance, id], (error, result)=>{
            if(error){
                reject(err)
            } else {
                resolve()
            }
        })
    })
}

async function creditRecipient(amount, accountNumber) {
    const query = 'UPDATE account SET balance = ? WHERE accountNumber = ?'
    return new Promise((resolve, reject) => {
        dbConnection.query(query, [amount, accountNumber], (error, result)=>{
            if(error){
                reject(err)
            } else {
                resolve()
            }
        })
    })
}

async function getAccountBalance(accountNumber) {
    const query = 'SELECT balance FROM account WHERE accountNumber = ?'
    return new Promise((resolve, reject) => {
        dbConnection.query(query, [accountNumber], (error, result)=>{
            if(error){
                reject(err)
            } else {
                resolve(result[0])
            }
        })
    })
}

async function getAccount(accountNo) {
    const query = 'SELECT accountNumber FROM account WHERE accountNumber = ?'
    return new Promise((resolve, reject) => {
        dbConnection.query(query, [accountNo], (error, result)=>{
            if(error){
                reject(err)
            } else {
                resolve(result[0])
            }
        })
    })
}

async function updateBalance(amount, accountNumber) {
    const query = 'UPDATE account SET balance = ? WHERE accountNumber = ?'
    return new Promise((resolve, reject) => {
        dbConnection.query(query, [amount, accountNumber], (error, result)=>{
            if(error){
                reject(err)
            } else {
                resolve()
            }
        })
    })
}

async function updateIdentityNumber(identityNumber, id) {
    const query = 'UPDATE account SET identityNumber = ? WHERE id = ?'
    return new Promise((resolve, reject) => {
        dbConnection.query(query, [identityNumber, id], (error, result)=>{
            if(error){
                reject(err)
            } else {
                resolve()
            }
        })
    })
}

module.exports = {
    updateBalanceAfterWithdrawal,
    getAccount,
    getAccountBalance,
    creditRecipient,
    updateBalance,
    updateIdentityNumber
}
