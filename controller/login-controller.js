const express = require("express")
const Joi = require("joi")
const { findUserByEmail } = require("../model/account-service")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const login = async (request, response)=> {
    try {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required()
         }).unknown(false)
      
         const { error, value } = schema.validate(request.body)
      
         if (error) {
            return response.status(400).json({ message: error.details[0].message})
         }

         const userData = value
          //check if user with email already exist
        const existingUser = await findUserByEmail(userData.email)
        console.log(existingUser)
        if (!existingUser || existingUser.length === 0) {
            return response.status(404).json({ message: "This email does not exist" })
        }

        // compare passwords using bcrypt
        const match = await bcrypt.compare(userData.password, existingUser[0].password)

        if (!match) {
            return response.status(401).json({ message: "Invalid password" })
        }

        const signNature = {
            name: existingUser.firstName + ' ' + existingUser.lastName,
            id: existingUser.id,
            email: existingUser.emailAddress
        }

        // GENERATE JWT TOKEN 
        const token = jwt.sign(signNature, process.env.SECRET_KEY, {expiresIn: '1h'})

        return response.status(200).json({ 
            message: "Login successful", 
            email: existingUser[0].emailAddress,
            token
        })

    } catch (error) {
        console.log(error)
        return response.status(500).json({ message: "An error occurred" })
    }
}

module.exports = login