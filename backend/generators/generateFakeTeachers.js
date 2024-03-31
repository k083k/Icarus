const faker = require('faker');
const mongoose = require('mongoose');
const User = require('../models/user'); // Import your Mongoose model
const Role = require('../models/role'); // Import your Role model

mongoose.connect('mongodb+srv://k083k0r3:a2wcha3g6r@cluster0.4qnnics.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const getRandomRoleId = async () => {
    const roles = await Role.find();
    const randomRole = faker.random.arrayElement(roles);
    return randomRole._id;
};
const generateFakeUser = async () => {
    const roleId = await getRandomRoleId();
    return {
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        address: faker.address.streetAddress(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: roleId
    };
};

const numberOfUsers = 10;
const saveFakeUsersToDatabase = async () => {
    const users = [];
    for (let i = 0; i < numberOfUsers; i++) {
        const fakeUser = await generateFakeUser();
        users.push(fakeUser);
    }
    await User.insertMany(users);
    console.log(`Fake user data saved to the database successfully (${numberOfUsers} users).`);
    mongoose.connection.close();
};

saveFakeUsersToDatabase();
