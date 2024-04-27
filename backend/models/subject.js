const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    grades: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Grade'
        },
        name: {
            type: String
        }
    }]
});

module.exports = mongoose.model('Subject', subjectSchema);
