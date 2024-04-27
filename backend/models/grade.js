const mongoose = require("mongoose");

const gradeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subjects: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subject'
        },
        name: {
            type: String
        }
    }],
    students: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student'
        },
        name: {
            type: String
        },
        gender: {
            type: String,
            enum: ['male', 'female']
        },
    }]
});

module.exports = mongoose.model('Grade', gradeSchema);