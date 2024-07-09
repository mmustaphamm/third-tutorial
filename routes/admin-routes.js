const express = require("express")
const createAdmin = require("../controller/user-management/create-admin")
const loginAdmin = require("../controller/user-management/login-admin")
const verifyTokenAdmin = require("../middleware/admin-verify-token")
const router = express.Router()

// admin routes
router.post("/create-admin", createAdmin)
router.post("/login", loginAdmin)

router.use(verifyTokenAdmin)


module.exports = router