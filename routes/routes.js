const express = require("express")
const accountCreation = require("../controller/account-controller")
const login = require("../controller/login-controller")
const verifyToken = require("../middleware/verify-token")
const transferFunds = require("../controller/transaction-management/transfer-funds")
const balanceCheck = require("../controller/transaction-management/check-balance")
const verifyUser = require("../controller/transaction-management/verify-user")
const depositFunds = require("../controller/transaction-management/deposit-funds")
const withdrawFunds = require("../controller/transaction-management/withdraw-funds")
const changePassword = require("../controller/security-settings/change-password")
const resetPasswordLink = require("../controller/security-settings/reset-password-link")
const resetPasswordVerifyToken = require("../controller/security-settings/reset-password-token")
const resetPasswrd = require("../controller/security-settings/reset-passwrd")
const reset = require("../controller/security-settings/reset-passwrd")
const router = express.Router()

/**
 * @swagger
 * /api/create-account:
 *   post:
 *     summary: Create a new account
 *     tags: 
 *       - Account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: First name of the user
 *                 example: John
 *               lastName:
 *                 type: string
 *                 description: Last name of the user
 *                 example: Doe
 *               email:
 *                 type: string
 *                 description: email of the user
 *                 example: John@gmail.com
 *               gender:
 *                 type: string
 *                 description: gender of the user
 *                 example: male
 *               password:
 *                 type: string
 *                 description: password of the user
 *                 example: 12345tyxc
 *               phoneNumber:
 *                 type: string
 *                 description: Phone number of the user
 *                 example: +2347011102998
 *               address:
 *                 type: string
 *                 description: Last name of the user
 *                 example: John
 *     responses:
 *       '200':
 *         description: Account created successfully
 *       '400':
 *         description: Unable to create account
 */
router.post("/create-account", accountCreation);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login to the account
 *     tags: 
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: password of the user
 *                 example: 12345678909
 *               email:
 *                 type: string
 *                 description: email of the user
 *                 example: Doe@gmail.com
 *     responses:
 *       '200':
 *         description: Login successful
 *       '400':
 *         description: Login failed
 */

router.post("/login", login)

/**
 * @swagger
 * /api/verify-token/{token}:
 *   post:
 *     summary: Verify reset password
 *     tags: 
 *       - Password
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: The reset password token
 *     responses:
 *       '200':
 *         description: Login successful
 *       '400':
 *         description: Login failed
 */

router.post("/reset-link", resetPasswordLink)
router.get("/verify-token/:token", resetPasswordVerifyToken)
router.post("/reset-password", reset)

router.use(verifyToken)
router.post("/transfers", transferFunds)
router.post("/verify-user", verifyUser)
router.get("/check-balance", balanceCheck)
router.post("/deposit-funds", depositFunds)
router.post("/withdraw-funds", withdrawFunds)
router.post("/change-password", changePassword)


module.exports = router