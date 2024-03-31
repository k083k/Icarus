const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    date_of_birth: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    parentName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    grade_class: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Student', studentSchema);
