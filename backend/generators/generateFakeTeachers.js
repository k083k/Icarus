const mongoose = require('mongoose');
const faker = require('faker');
const User = require('../models/user');
const Role = require('../models/role');

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
        // Fetch role IDs for "Admin", "Teacher", and "Parent"
        const teacherRole = await Role.findOne({ name: 'Teacher' });

        // Generate fake teachers with different roles
        const teachersData = [];
        for (let i = 0; i < 10; i++) {
            const role = teacherRole ;
            const teacher = {
                first_name: faker.name.firstName(),
                last_name: faker.name.lastName(),
                address: faker.address.streetAddress(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                role: role._id,
                gender: faker.random.arrayElement(['male', 'female'])
            };
            teachersData.push(teacher);
        }

        // Insert generated teachers data into the database
        const teachers = await User.create(teachersData);
        console.log('Teachers seeded successfully:', teachers);
    } catch (err) {
        console.error('Error seeding teachers:', err);
    } finally {
        // Close the connection
        mongoose.connection.close();
    }
});
