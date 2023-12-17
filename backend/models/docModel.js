const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const documentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lName: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('document', documentSchema )