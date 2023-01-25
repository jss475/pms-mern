const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const propertyTenantSchema = new Schema({
    property: {
        type: Schema.Types.ObjectId,
        ref: 'Property'
    },
    tenants: [{
        type: Schema.Types.ObjectId,
        ref: 'Tenant'
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('PropertyTenant', propertyTenantSchema);