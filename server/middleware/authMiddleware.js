const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Owner= require('../models/ownerModel');
const Tenant = require('../models/tenantModel');

const protectOwner = asyncHandler(async (req,res,next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            //Get token from header
            token = req.headers.authorization.split(' ')[1]

            //Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //Get owner from the token
            req.owner = await Owner.findById(decoded.id).select('-password')

            next()
        }catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }
    if(!token){
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

const protectTenant = asyncHandler(async (req,res,next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            //Get token from header
            token = req.headers.authorization.split(' ')[1]

            //Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //Get tenant from the token
            req.tenant = await Tenant.findById(decoded.id).select('-password')

            next()
        }catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }
    if(!token){
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

const protectEither = asyncHandler(async (req,res,next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            //Get token from header
            token = req.headers.authorization.split(' ')[1]

            //Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //Get tenant from the token or owner
            req.tenant = await Tenant.findById(decoded.id).select('-password')
            req.owner = await Owner.findById(decoded.id).select('-password')

            next()
        }catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }
    if(!token){
        res.status(401)
        throw new Error('Not authorized, no token')
    }

})



module.exports = {
    protectOwner,
    protectTenant,
    protectEither
}