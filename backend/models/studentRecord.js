const mongoose = require('mongoose');

const studentRecordSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: true
    },
    // Add any other relevant fields for student records
});

module.exports = mongoose.model('StudentRecord', studentRecordSchema);
