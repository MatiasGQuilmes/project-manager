const express = require('express');
const router = express.Router();

const {register, login, verifyToken, changePassword, checked, sendToken} = require('../controllers/authController')

/*  */
router
    .post('/register', register)
    .post('/login', login)
    .get('/checked', checked)
    .post('/sendToken', sendToken)
    .route('/reset-password')
        .get(verifyToken)
        .post(changePassword)

module.exports = router;