const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const noteSchema = new Schema({
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
    },
    user_id: {
        type: String,
        required : true
    }
}, { timestamps: true });

module.exports = mongoose.model('note', noteSchema )