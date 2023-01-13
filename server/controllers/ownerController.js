const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const Owner= require('../models/ownerModel');

//@desc Register new owner
//@route POST /owners/signup
//@access Public
const registerOwner = asyncHandler(async (req,res) => {
    const {firstName, lastName , email, password} = req.body

    if(!firstName || !lastName || !email || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }

    //Check if owner exists
    const ownerExists = await Owner.findOne({email})

    if(ownerExists){
        res.status(400)
        throw new Error('An account with this email already exists')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create owner
    const owner = await Owner.create({
        firstName,
        lastName,
        email,
        password: hashedPassword
    })
    
    if(owner){
        res.status(201).json({
            _id: owner.id,
            firstName: owner.firstName,
            lastName: owner.lastName,
            email: owner.email,
            token: generateToken(owner._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid owner data ')
    }
})

//@desc Authenticate an owner
//@route POST /owners/login
//@access Public
const loginOwner = asyncHandler(async (req,res) => {
    const {email, password} = req.body;

    //Check for owner email
    const owner = await Owner.findOne({email})

    if(owner && (await bcrypt.compare(password,owner.password))){
        res.json({
            _id: owner.id,
            firstName: owner.firstName,
            lastName: owner.lastName,
            email: owner.email,
            token: generateToken(owner._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

//@desc Get owner data
//@route GET /owners/me
//@access Private
const getOwner = asyncHandler(async (req,res) => {
    const {_id, name, email} = await Owner.findById(req.owner.id)

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
    registerOwner,
    loginOwner,
    getOwner
}