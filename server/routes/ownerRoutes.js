const express = require('express');
const router = express.Router();
const {registerOwner, loginOwner, getOwner} = require('../controllers/ownerController');
const {protectOwner} = require('../middleware/authMiddleware')

router.post('/signup', registerOwner)
router.post('/login', loginOwner)
router.get('/me', protectOwner, getOwner)

module.exports = router