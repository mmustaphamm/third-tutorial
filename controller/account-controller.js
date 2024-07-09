const { createAccounts } = require("../model/account-service")
const { findUserByEmail } = require("../model/account-service")
const { findPhoneNumber } = require("../model/account-service")
const genAccountNo = require("../utils/generate-account-number")
const bcrypt = require("bcrypt")
const Joi = require("joi")

async function createAccount(request, response) {
   // const userData = request.body
   try {
   const schema = Joi.object({
      firstName: Joi.string().min(2).message('Must be more than two characters').max(30).required(),
      lastName: Joi.string().min(2).message('Must be more than two characters').max(30).required(),
      middleName: Joi.string().min(2).message('Must be more than two characters').max(30).optional(),
      gender: Joi.string().valid('male', 'female').required(),
      email: Joi.string().email().required(),
      address: Joi.string().required(),
      phoneNumber: Joi.string().regex(/^(\+234)\d{10}$/),
      identityNumber: Joi.string().length(8).optional(),
      password: Joi.string().min(6).required()
   }).unknown(false)

   const { error, value } = schema.validate(request.body)

   if (error) {
      return response.status(400).json({ message: error.details[0].message})
   }
    const userData = value
    const createdAt = new Date()

    //hash user password before saving to the db
    const hashPassword = await bcrypt.hash(userData.password, 10)
    userData.createdAt = createdAt

   //assign user password to hashpassword
    userData.password = hashPassword

   //check if user with email already exist
   const existingUser = await findUserByEmail(userData.email)
   console.log(existingUser)

   if (existingUser.length !== 0) {
      return response.status(400).json({ message: "User with the email already exists." })
   }

   const existingPhoneNumber = await findPhoneNumber(userData.phoneNumber)
   if (existingPhoneNumber.length !== 0) {
      return response.status(400).json({ message: "User with the phone number already exist"})
   }

  const acctNo = await genAccountNo(userData.phoneNumber)

  userData.accountNumber = acctNo

    await createAccounts(userData)
    response.status(201).json({
       success: true, 
       message: "Account created successfully",
       user_information: {
         accountNumber: acctNo,
         sort_code: process.env.SORT_CODE
       }
      })
   } catch (error) {
    console.log(error)
    return response.status(500).json({ message: "Internal server error"})
   }
}

module.exports = createAccount