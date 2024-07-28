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

/**
 * @swagger
 * /api/reset-password:
 *   post:
 *     summary: Verify reset password
 *     tags: [Password]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: The reset token
 *                 example: abc123
 *               newPassword:
 *                 type: string
 *                 description: The new password
 *                 example: NewPassword
 *     responses:
 *       '200':
 *         description: Password reset successfully
 *       '400':
 *         description: Failed to reset password
 */
router.post("/reset-password", reset)

router.use(verifyToken)

/**
 * @swagger
 * /api/transfers:
 *   post:
 *     summary: Transfer funds
 *     tags: [Transaction]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: string
 *                 description: amount to transfer
 *                 example: 5000
 *               sortCode:
 *                 type: string
 *                 description: Unique transfer bank code
 *                 example: 000989
 *               accountNumber:
 *                 description: Recipient's account number
 *                 example: 7065873212
 *               accountHolderName:
 *                 description: Recipient's account name
 *                 example: Muhammed Mustapha
 *     responses:
 *       '200':
 *         description: Funds transferred successfully
 *       '400':
 *         description: Failed to transfer funds
 */
router.post("/transfers", transferFunds)

/**
 * @swagger
 * /api/verify-user:
 *   post:
 *     summary: Transfer funds
 *     tags: [Transaction]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: the ID of the user to verify
 *                 example: 1
 *     responses:
 *       '200':
 *         description: Funds transferred successfully
 *       '400':
 *         description: Failed to transfer funds
 */
router.post("/verify-user", verifyUser)

/**
 * @swagger
 * /api/check-balance:
 *   post:
 *     summary: Transfer funds
 *     tags: [Transaction]
 *     responses:
 *       '200':
 *         description: Funds transferred successfully
 *       '400':
 *         description: Failed to transfer funds
 */
router.get("/check-balance", balanceCheck)

/**
 * @swagger
 * /api/deposit-funds:
 *   post:
 *     summary: Transfer funds
 *     tags: [Transaction]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: string
 *                 description: Amount to send
 *                 example: 12300
 *     responses:
 *       '200':
 *         description: Funds transferred successfully
 *       '400':
 *         description: Failed to transfer funds
 */
router.post("/deposit-funds", depositFunds)

/**
 * @swagger
 * /api/withdraw-funds:
 *   post:
 *     summary: Transfer funds
 *     tags: [Transaction]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: string
 *                 description: Amount to send
 *                 example: 12300
 *               accountNumber:
 *                 type: string
 *                 description: Account to withdraw from
 *                 example: 7085647382
 *     responses:
 *       '200':
 *         description: Funds transferred successfully
 *       '400':
 *         description: Failed to transfer funds
 */
router.post("/withdraw-funds", withdrawFunds)
router.post("/change-password", changePassword)

module.exports = router
