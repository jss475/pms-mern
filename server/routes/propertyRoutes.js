const express = require('express');
const router = express.Router();
const {createProperty, getAllProperties, updateProperty, getMyProperties} = require('../controllers/propertyController');
const {protectOwner, protectEither} = require('../middleware/authMiddleware')

router.post('/create', protectOwner, createProperty)
router.post('/:id', protectEither, updateProperty)
router.get('/my', protectEither, getMyProperties) //i want conditional auth. Sounds like middleware
router.get('/', getAllProperties)

module.exports = router