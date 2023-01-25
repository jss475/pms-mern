const asyncHandler = require('express-async-handler');
const Property = require('../models/propertyModel');
const Owner = require('../models/ownerModel');
const Tenant = require('../models/tenantModel');

//@desc Create a new property
//@route POST /properties/create
//@access Private (only owners can create properties) this will be a protected route

const createProperty = asyncHandler( async (req,res) =>  {
    const {name, streetAddress, aptNumber, city, 
        state, zipCode, bedroomCount, 
        bathroomCount, rentalAmount, propertySize, 
        leaseStartDate, leaseEndDate
    } = req.body

    const owner = req.owner.id

    //add the logic for adding in an owner/owner not found
  
    //Check if property exists using the street address and apt/townhouse number
    const propertyExists = await Property.findOne({streetAddress, aptNumber}) 

    if(propertyExists){
        res.status(400)
        throw new Error('This property already exists')
    }

 
    try {

        //create the property
        const property = await Property.create({
            owner, name, streetAddress, aptNumber, city,
            state, zipCode, bedroomCount, 
            bathroomCount, rentalAmount, propertySize, 
            leaseStartDate, leaseEndDate
        })

        //if the property exists, send a 201 response and the property data
        if(property){
            res.status(201).json({
                _id: property.id,
                name: property.name,
                streetAddress: property.streetAddress,
                aptNumber: property.aptNumber,
                city: property.city,
                state: property.state,
                zipCode: property.zipCode,
                bathroomCount: property.bathroomCount,
                bedroomCount: property.bedroomCount,
                rentalAmount: property.rentalAmount,
                propertySize: property.size,
                leaseEndDate: property.leaseEndDate,
                leaseEndDate: property.leaseEndDate
            })
        }else{
            res.status(400)
            throw new Error('Invalid property data')
        }
    }catch(e){
        res.status(400)
        throw new Error('Error saving to the db', e.message)
    }
})

//@desc Update property
//@route PUT /properties/:id
//@access Private
const updateProperty = asyncHandler( async (req, res) => {

    const property = await Property.findById(req.params.id)

    //property doesn't exist, send error
    if(!property){
        res.status(400)
        throw new Error('Property not found')
    }


    if(req.owner){
        //find if the owner logged in exists
        const owner = await Owner.findById(req.owner.id)
        if(!owner){
            res.status(401)
            throw new Error('Owner not found')
        }

        //make sure logged in owner matches the property owner
        if(property.owner.toString() !== owner.id){
            res.status(401)
            throw new Error('User not authorized')
        }
    }else if(req.tenant){
        //find if the tenant logged in exists
        const tenant = await Tenant.findById(req.tenant.id)
        if(!tenant){
            res.status(401)
            throw new Error('Tenant not found')
        }

        //need logic here for when tenant wants to sign lease
        //also for having multiple tenants at one property
        if(!property.tenant){
            property.tenant = req.tenant.id
        }
        //make sure logged in tenant matches the property tenant
        // if(property.tenant.toString() !== tenant.id){
        //     res.status(401)
        //     throw new Error('User not authorized')
        // }
    }else{
        res.status(401)
        throw new Error('User not authorized')
    }


    try{
        const updatedProperty = await Property.findByIdAndUpdate(
            req.params.id, req.body, {
                new: true //what does this mean again?
            }
        )
        res.status(200).json(updatedProperty)
    }catch(e){
        res.status(400)
        throw new Error('Could not save update to the db', e.message)
    }
})

//@desc Get all properties
//@route GET /properties
//@access Public

const getAllProperties = asyncHandler(async (req, res) => {
    try{
        const allProperties = await Property.find()

        res.status(200).json({
            allProperties
            // id: _id,
            // name,
            // streetAddress,
            // aptNumber,
            // city,
            // state,
            // zipCode,
            // bathroomCount,
            // bedroomCount,
            // rentalAmount,
            // propertySize,
            // leaseEndDate,
            // leaseEndDate
        })
    }catch(e){
        res.status(400)
        throw new Error('Error finding in the db', e.message)
    }
})

//@desc Get my properties
//@route GET /properties/my
//@access Private
const getMyProperties = asyncHandler( async (req, res) => {
    // can i do this to get my properties if i'm either the owner or tenant logged in?
    try{
        if(req.owner.id){
            const properties = await Property.find({owner: req.owner.id})
            res.status(200).json(properties)
        }else if(req.tenant.id){
            const properties = await Property.find({tenant: req.tenant.id})
            res.status(200).json(properties)
        }
    }catch(e){
        res.status(400)
        throw new Error('Could not find properties', e.message)
    }
})

module.exports = {
    createProperty,
    getAllProperties,
    updateProperty,
    getMyProperties
}