const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const propertyTenantSchema = new Schema({
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property'
    },
    tenants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tenant'
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Owner'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('PropertyTenant', propertyTenantSchema);