const express = require('express');
const router = express.Router();
const {registerTenant, loginTenant, getTenant, logoutTenant} = require('../controllers/tenantController');
const {protectTenant} = require('../middleware/authMiddleware')

router.post('/signup', registerTenant)
router.post('/login', loginTenant)
router.get('/me', protectTenant, getTenant)
router.post('/logout', protectTenant, logoutTenant)

module.exports = router