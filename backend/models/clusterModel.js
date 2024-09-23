const mongoose = require('mongoose');

const clusterSchema = new mongoose.Schema({
    clusterName: {
        type: String,
        required: true,
    },
    cloud: {
        type: String,
        required: true,
    },
    environment: {
        type: String,
        required: true,
    },
    region: {
        type: String,
        required: true,
    },
    accountId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    version: {
        type: String,
        default: 'N/A',
    },
    cost: {
        type: Number,
        default: 0,
    },
    manage: {
        view: {
            type: Boolean,
            default: true,
        },
        delete: {
            type: Boolean,
            default: true,
        },
    },
});

module.exports = mongoose.model('Cluster', clusterSchema);
