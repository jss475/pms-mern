const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const Tenant = require('../models/tenantModel');

//@desc Register new tenant
//@route POST /tenants/signup
//@access Public

const registerTenant = asyncHandler(async (req,res) => {

    const {firstName, lastName, email, password} = req.body

    if(!firstName || !lastName || !email || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }

    //Check if tenant exists
    const tenantExists = await Tenant.findOne({email})

    if(tenantExists){
        res.status(400)
        throw new Error('An account with this email already exists')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    //Create tenant
    const tenant = await Tenant.create({
        firstName,
        lastName,
        email,
        password: hashedPassword
    })
    
    if(tenant){
        res.status(201).json({
            _id: tenant._id,
            firstName: tenant.firstName,
            lastName: tenant.lastName,
            email: tenant.email,
            token: generateToken(tenant._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid owner data')
    }
})

//@desc Authenticate a tenant
//@route POST /tenants/login
//@access Public

const loginTenant = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    //Check for tenant email
    const tenant = await Tenant.findOne({email})

    //check if the tenant exists and the password is correct
    if(tenant && (await bcrypt.compare(password,tenant.password))){
        res.json({
            _id: tenant.id,
            firstName: tenant.firstName,
            lastName: tenant.lastName,
            email: tenant.email,
            token: generateToken(tenant._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

//@desc Get tenant data
//@route GET /tenants/me
//@access Private
const getTenant = asyncHandler(async (req,res) => {
    const {_id, name, email} = await Tenant.findById(req.tenant.id)

    res.status(200).json({
        id: _id,
        name,
        email
    })
})

//Generate JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '8h'
    })
}

module.exports = {
    registerTenant,
    loginTenant,
    getTenant
}