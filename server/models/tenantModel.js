const mongoose = require('mongoose');

const tenantSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please add a first name']
    },
    lastName: {
        type: String,
        required: [true, 'Please add a last name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    age: {
        type: String,
        // required: [true, 'Please add an email'],
    },
    jobTitle: {
        type: String,
        // required: [true, 'Please add an email'],
    },
    salary: {
        type: String,
        // required: [true, 'Please add an email'],
    },
},{
    timestamps: true
})

module.exports = mongoose.model('Tenant', tenantSchema);