external packages
1-bcrypt=hashing passwords before saving it to the database;
2- Joi = Validation Review: message property of joi validation


<!-- ENDPOINTS -->
AUTHENTICATION AND AUTHORIZATION
1- /login
2- /logout
3- /create-account
4- /token

USER MANAGEMENT
1- /users: Endpoint to list all users(admin privilege)
2- /user/{id}: Endpoint to get/update/delete a specific user
3- /user/{id}/transactions: endpoint to list transactions of a specific user
<!-- 3- /user/{id}/accounts -->

ACCOUNT MANAGEMENT
1- /accounts: Endpoint to list all accounts (admin privilege)
2- /account/{id}: Endpoint to get/update/delete a specific account
2- /account/{id}/transactions Endpoint to list transactions of a specific account

TRANSACTION MANAGEMENT
1- /transactions/{id} endpoint to get details of a specific transaction
2- /transfer: endpoint to initiate fund transfer
3- /transfer/deposit: endpont to handle deposits to user account
4- /transfer/withdraw: endpoint to handle withdrawals from user account

SECURITY AND SETTINGS
1 - /change-password: endpoint to allow users to change password
2- reset-password: endpoint to reset password

transfer flow chart https://lucid.app/lucidspark/6418e8ce-af7a-4242-8342-529ab2eb10d9/edit?viewport_loc=969%2C147%2C3703%2C1720%2C0_0&invitationId=inv_4ee5074e-b83b-4a51-9be0-525663cbbc4d

deposit flow chat https://lucid.app/lucidspark/b5425b48-07f6-43f0-886f-9b54bf11841b/edit?viewport_loc=-2836%2C-1797%2C4320%2C2007%2C0_0&invitationId=inv_8820d439-d584-47b6-8a41-85026bc9c341