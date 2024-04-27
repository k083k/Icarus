const mongoose = require('mongoose');
const Grade = require('../models/grade');

// Connect to MongoDB
mongoose.connect('mongodb+srv://k083k0r3:a2wcha3g6r@cluster0.4qnnics.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;

// Event listeners for MongoDB connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
    console.log('Connected to MongoDB');

    try {
        // Drop all grades from the database
        await Grade.deleteMany({});
        console.log('All grades dropped successfully');
    } catch (err) {
        console.error('Error dropping grades:', err);
    } finally {
        // Close the connection
        mongoose.connection.close();
    }
});
