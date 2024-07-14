const express = require("express")
const createAdmin = require("../controller/user-management/create-admin")
const loginAdmin = require("../controller/user-management/login-admin")
const verifyTokenAdmin = require("../middleware/admin-verify-token")
const getAllUsers = require("../controller/user-management/get-all-users")
const adminAccessControl = require("../middleware/access-control")
const updateUser = require("../controller/user-management/update-user")
const getSingleUser = require("../controller/user-management/get-single-user")
const deleteUser = require("../controller/user-management/delete-user")
const router = express.Router()

// admin routes
router.post("/create-admin", createAdmin)
router.post("/login", loginAdmin)

router.use(verifyTokenAdmin)
router.get("/get-all-users", adminAccessControl(['admin', 'superadmin']), getAllUsers)
router.get("/get-user/:id", adminAccessControl(['admin', 'superadmin']), getSingleUser)
router.put("/update-user/:id", adminAccessControl(['superadmin']), updateUser)
router.delete("/delete-user/:id", adminAccessControl(['superadmin']), deleteUser)

module.exports = router