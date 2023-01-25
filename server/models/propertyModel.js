const mongoose = require('mongoose');

const propertySchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Owner'
    },
    tenant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tenant'
    },
    name: {
        type: String,
        required: [true, 'Please add a property name']
    },
    streetAddress: {
        type: String,
        required: [true, 'Please add a stress address name']
    },
    aptNumber:{
        type: String
    },
    city: {
        type: String,
        required: [true, 'Please add the city']
    },
    state: {
        type: String,
        required: [true, 'Please add the state']
    },
    zipCode: {
        type: String,
        required: [true, 'Please add the zip code']
    },
    bedroomCount: {
        type: Number,
        required: [true, 'Please add the bedroom count']
    },
    bathroomCount: {
        type: Number,
        required: [true, 'Please add the bathroom count']
    },
    rentalAmount: {
        type: Number,
        required: [true, 'Please add the rental amount per month']
    },
    propertySize: {
        type: Number,
        required: [true, 'Please add the property size in sq. ft.']
    },
    leaseStartDate: {
        type: Date,
        required: [true, 'Please add the lease start date']
    },
    leaseEndDate: {
        type: Date,
        required: [true, 'Please add the lease end date']
    },
    totalBalance: {
        type: Number,
    }

}, {
    timestamps: true
})

//add a pre-save hook to calculate the total balance for the rental property
// https://medium.com/@justinmanalad/pre-save-hooks-in-mongoose-js-cf1c0959dba2
propertySchema.pre('save', function(next) {
    //should change it to be the month difference (ceilling) of leaseEndDate - leaseStartDate
    //date difference
    // let dateDiff = new Date(leaseEndDate.getTime() - leaseStartDate.getTime())
    //calculate to months. We add 1 
    let months = (this.leaseEndDate.getFullYear() - this.leaseStartDate.getFullYear()) * 12;
    months -= this.leaseStartDate.getMonth() + 1;
    months += this.leaseEndDate.getMonth();
    months += 1
    this.totalBalance = this.rentalAmount * 12; 

    next(); 
})

module.exports = mongoose.model('Property', propertySchema);