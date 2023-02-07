const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leaseSchema = new Schema({
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property'
    },
    tenant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tenant'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Owner'
    },
    ownerAgree: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Lease', leaseSchema);