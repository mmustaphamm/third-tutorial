const express = require("express")
const accountCreation = require("../controller/account-controller")
const login = require("../controller/login-controller")
const router = express.Router()

router.post("/create-account", accountCreation)
router.post("/login", login)

module.exports = router