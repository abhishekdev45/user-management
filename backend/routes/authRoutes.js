const express = require('express');
const { registerUser, authUser } = require('../controllers/authController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
// router.post('/forgotpassword', forgotPassword);
// router.put('/resetpassword/:resetToken', resetPassword);

module.exports = router;
