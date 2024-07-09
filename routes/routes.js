const express = require("express")
const accountCreation = require("../controller/account-controller")
const login = require("../controller/login-controller")
const verifyToken = require("../middleware/verify-token")
const transferFunds = require("../controller/transaction-management/transfer-funds")
const balanceCheck = require("../controller/transaction-management/check-balance")
const verifyUser = require("../controller/transaction-management/verify-user")
const depositFunds = require("../controller/transaction-management/deposit-funds")
const withdrawFunds = require("../controller/transaction-management/withdraw-funds")
const router = express.Router()

router.post("/create-account", accountCreation)
router.post("/login", login)

router.use(verifyToken)
router.post("/transfers", transferFunds)
router.post("/verify-user", verifyUser)
router.get("/check-balance", balanceCheck)
router.post("/deposit-funds", depositFunds)
router.post("/withdraw-funds", withdrawFunds)


module.exports = router