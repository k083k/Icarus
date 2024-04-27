const mongoose = require('mongoose');
const faker = require('faker');

const Student = require('../models/student');
const Grade = require('../models/grade');

mongoose.connect('mongodb+srv://k083k0r3:a2wcha3g6r@cluster0.4qnnics.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Function to generate fake students and add them to their respective grades
async function generateFakeStudents(numStudentsPerGrade) {
    try {
        const grades = await Grade.find(); // Fetch all grades

        // Loop through each grade
        for (const grade of grades) {
            // Generate fake students for the grade
            for (let i = 0; i < numStudentsPerGrade; i++) {
                const gender = faker.random.arrayElement(['male', 'female']);
                const student = new Student({
                    first_name: faker.name.firstName(),
                    last_name: faker.name.lastName(),
                    date_of_birth: faker.date.between('2000-01-01', '2007-12-31'),
                    address: faker.address.streetAddress(),
                    parentName: faker.name.findName(),
                    gender: faker.random.arrayElement(['male', 'female']),
                    grade_class: grade.name, // Assign the grade name to the student's grade_class field
                });

                // Save the student
                await student.save();

                // Add the student to the grade
                grade.students.push({
                    _id: student._id,
                    name: `${student.first_name} ${student.last_name}`,
                    gender: gender // Add gender to the grade's students array
                });
                await grade.save();
            }
            console.log(`${numStudentsPerGrade} fake students added to ${grade.name} successfully.`);
        }
    } catch (error) {
        console.error('Error generating fake students:', error);
    }finally {
        mongoose.connection.close(); // Close MongoDB connection after generating grades
    }
}

// Usage: Call generateFakeStudents function with the desired number of students per grade
generateFakeStudents(5); // Generate 5 fake students for each grade
