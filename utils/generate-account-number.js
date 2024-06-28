async function genAccountNo(phoneNumber) {
    if (phoneNumber.length > 3) {
        return phoneNumber.substring(4)
    } else {
        return phoneNumber
    }
}

module.exports = genAccountNo