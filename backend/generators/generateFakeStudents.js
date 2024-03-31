const faker = require('faker');
const mongoose = require('mongoose');
const Student = require('../models/student');

mongoose.connect('mongodb+srv://k083k0r3:a2wcha3g6r@cluster0.4qnnics.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const generateFakeStudent = () => {
    return {
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        date_of_birth: faker.date.between('1990-01-01', '2005-12-31'),
        address: faker.address.streetAddress(),
        parentName: faker.name.findName(),
        gender: faker.random.arrayElement(['male', 'female']),
        grade_class: faker.random.arrayElement(['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5'])
    };
};

const numberOfStudents = 200;
const saveFakeStudentsToDatabase = async () => {
    const students = [];
    for (let i = 0; i < numberOfStudents; i++) {
        students.push(generateFakeStudent());
    }
    await Student.insertMany(students);
    console.log(`Fake student data saved to the database successfully (${numberOfStudents} students).`);
    mongoose.connection.close();
};

saveFakeStudentsToDatabase();
