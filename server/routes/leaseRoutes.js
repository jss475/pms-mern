const express = require('express');
const router = express.Router();
const { newLease, getLease, signLeaseOwner } = require('../controllers/leaseController');
const {protectOwner, protectTenant } = require('../middleware/authMiddleware');

router.post('/send-app', protectTenant, newLease)
router.post('/find-lease', protectOwner, getLease)
router.put('/owner-sign-lease', signLeaseOwner )

module.exports = router;