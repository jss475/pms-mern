const asyncHandler = require('express-async-handler');
const Lease = require('../models/leaseModel');
const Property = require('../models/propertyModel');
const Owner = require('../models/ownerModel');
const Tenant = require('../models/tenantModel');

//@desc Register a new lease application
//@route POST /lease/send-app
//@access Private

const newLease = asyncHandler(async (req,res) => {

    const { propertyDetails, leaseStartDate} = req.body
    const tenant = await Tenant.findOne({_id: req.tenant.id})

    if(!propertyDetails){
        res.status(400)
        throw new Error('Property could not be found')
    }

    if(!tenant){
        res.status(400)
        throw new Error('Please log in to request a lease')
    }

    try{
        //Check to see if property exists to get owner
        let propertyExists;
        
        if(propertyDetails.aptNumber){
            propertyExists = await Property.findOne({streetAddress: propertyDetails.streetAddress, aptNumber: propertyDetails.aptNumber})
        }else{
            propertyExists = await Property.findOne({streetAddress: propertyDetails.streetAddress})
        }
        let owner;
        
        if(propertyExists){
            owner = await Owner.findOne({_id: propertyExists.owner})

            const lease = await Lease.create({
                owner: owner._id,
                tenant: tenant._id,
                property: propertyExists._id
            })

            if(lease){
                res.status(201).json({
                    _id: lease._id,
                    owner: lease.owner,
                    tenant: lease.tenant,
                    property: lease.property,
                    ownerAgree: lease.ownerAgree
                })
            }
        //create property model
        }else{
            
            const leaseDate = new Date(leaseStartDate);
            const leaseDateString = leaseDate.getUTCFullYear() +"/"+ (leaseDate.getUTCMonth()+1) +"/"+ (leaseDate.getUTCDate()-1)
            const endDateString = (leaseDate.getUTCFullYear()+1) +"/"+ (leaseDate.getUTCMonth()+1) +"/"+ (leaseDate.getUTCDate()-1)
            //default owner for testing purposes only
            const owner = await Owner.findOne({email: "joe@gmail.com"})
            console.log(owner)
            const property = await Property.create({
                owner: owner, 
                name: propertyDetails.name, 
                streetAddress: propertyDetails.streetAddress, 
                aptNumber: propertyDetails.aptNumber, 
                city: propertyDetails.city,
                state: propertyDetails.state, 
                zipCode: propertyDetails.zipCode, 
                bedroomCount: propertyDetails.bedroomCount, 
                bathroomCount: propertyDetails.bathroomCount, 
                rentalAmount: propertyDetails.rentalAmount, 
                propertySize: propertyDetails.propertySize, 
                leaseStartDate: new Date(leaseDateString), 
                leaseEndDate: new Date(endDateString)
            })
            console.log(property)
            if(property){
                console.log('hi')
                const lease = await Lease.create({
                    owner: owner._id,
                    tenant: tenant._id,
                    property: property._id
                })

                
                if(lease){
                    res.status(201).json({
                        _id: lease._id,
                        owner: lease.owner,
                        tenant: lease.tenant,
                        property: lease.property,
                        ownerAgree: lease.ownerAgree
                    })
                }
            }else{
                res.status(400)
                throw new Error('Could not create property from the data given')
            }
        }
    }catch(e){
        res.status(400)
        throw new Error('Error saving to the db', e.message)
    }

})

//@desc Register a new lease application
//@route PUT /lease/owner-sign-lease
//@access Private (Only to Owner)
const signLeaseOwner = asyncHandler( async (req,res) => {
    try{
        // let propertyExists;
        // if(req.body.propertyDetails.aptNumber){
        //     propertyExists = await Property.findOne({streetAddress: req.body.propertyDetails.streetAddress, aptNumber: req.body.propertyDetails.aptNumber})
        // }else{
        //     propertyExists = await Property.findOne({streetAddress: req.body.propertyDetails.streetAddress})
        // }

        const leaseExists = await Lease.findOne({_id: req.body.leaseID})
        const property = await Property.findOne({_id: leaseExists.property})
        const tenant = await Tenant.findOne({_id: leaseExists.tenant})

        if(leaseExists && req.body.ownerAgree){

            await leaseExists.update({ownerAgree: req.body.ownerAgree})
            
            res.status(200).json({
                id: leaseExists._id,
                owner: leaseExists.owner,
                tenant: tenant.firstName + " " + tenant.lastName,
                property: property.streetAddress,
                ownerAgree: leaseExists.ownerAgree,
                message: "The lease has been signed"
            })
        }else if(leaseExists && !req.body.ownerAgreee){
            res.status(200).json({
                id: leaseExists._id,
                owner: leaseExists.owner,
                tenant: leaseExists.tenant,
                property: property.streetAddress,
                ownerAgree: leaseExists.ownerAgree,
                message: "The lease has been rejected"
            })
        }else{
            res.status(400);
            throw new Error("Could not find the lease.")
        }
    }catch(e){
        res.status(400);
        throw new Error("Could not successfully sign the lease.")
    }
})

//@desc Find all lease applications related to the owner
//@route POST /lease/find-lease
//@access Private (Only to Owner)
const getLease = asyncHandler(async (req,res) => {
    // try {
    //     let propertyExists;
    //     if(req.body.propertyDetails.aptNumber){
    //         propertyExists = await Property.findOne({streetAddress: req.body.propertyDetails.streetAddress, aptNumber: req.body.propertyDetails.aptNumber})
    //     }else{
    //         propertyExists = await Property.findOne({streetAddress: req.body.propertyDetails.streetAddress})
    //     }

        
    //     const allLeasesOwner = await Lease.find({property: propertyExists._id})
    //     res.status(200).json({
    //         allLeasesOwner
    //     })
    // }catch(e){
    //     res.status(400)
    //     throw new Error('The lease could not be found')
    // }
    try{
        const allLeaseOwner = await Lease.find({owner: req.owner.id})

        res.status(200).json({
            allLeases: allLeaseOwner
        })
    }catch(e){
        res.status(400)
        throw new Error('Error finding all the leases in the db', e.message)
    }
})

//@desc Delete Lease
//@route DELETE /lease/delete-lease
//@access Private (Only to Owner)
const deleteLeaseOwner = asyncHandler(async (req,res) => {
    try {
        const leaseExists = await Lease.findOne({_id: req.body.leaseID})
        if(leaseExists){
            leaseExists.delete();
            res.status(200).json({
                message: "The lease was succesfully terminated."
            })
        }else{
            res.status(400)
            throw new Error('The lease could not be found')
        }
    }catch(e){
        res.status(400)
        throw new Error('THe lease could not be terminated.')
    }
})


module.exports = {
    newLease,
    signLeaseOwner,
    getLease,
    deleteLeaseOwner
}