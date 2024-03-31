const mongoose = require('mongoose');
const Student = require('../models/student'); // Import your Mongoose model for students

mongoose.connect('mongodb+srv://k083k0r3:a2wcha3g6r@cluster0.4qnnics.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const dropStudents = async () => {
    try {
        await Student.deleteMany({});
        console.log('All students dropped successfully.');
    } catch (error) {
        console.error('Error dropping students:', error);
    } finally {
        mongoose.connection.close();
    }
};

dropStudents();
