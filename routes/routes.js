const express = require("express")
const accountCreation = require("../controller/account-controller")
const login = require("../controller/login-controller")
const verifyToken = require("../middleware/verify-token")
const transferFunds = require("../controller/transaction-management/transfer-funds")
const router = express.Router()

router.post("/create-account", accountCreation)
router.post("/login", login)
router.post("/transfers", verifyToken, transferFunds)

module.exports = router