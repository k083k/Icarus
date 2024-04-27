const mongoose = require('mongoose');
const faker = require('faker');
const Grade = require('../models/grade');
const Subject = require('../models/subject');
const Student = require('../models/student');

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
        // Generate grades
        const gradesData = [];
        const subjectsData = [];
        const studentsData = [];

        for (let i = 1; i <= 8; i++) {
            const grade = {
                name: `Grade ${i}`,
                subjects: [],
                students: []
            };
            const gradeObj = await Grade.create(grade);
            gradesData.push(gradeObj);

            // Generate subjects for each grade
            for (let j = 0; j < 5; j++) {
                const subject = {
                    name: faker.random.word(),
                    grade: gradeObj._id
                };
                const subjectObj = await Subject.create(subject);
                subjectsData.push(subjectObj);
                gradeObj.subjects.push(subjectObj._id);
            }

            // Generate students for each grade
            const gradeStudents = [];
            for (let k = 0; k < 10; k++) {
                const student = {
                    first_name: faker.name.firstName(),
                    last_name: faker.name.lastName(),
                    date_of_birth: faker.date.past(18),
                    address: faker.address.streetAddress(),
                    parentName: faker.name.findName(),
                    gender: faker.random.arrayElement(['male', 'female']),
                    grade_class: gradeObj._id
                };
                const studentObj = await Student.create(student);
                studentsData.push(studentObj);
                gradeStudents.push(studentObj._id);
            }
            gradeObj.students = gradeStudents;
            await gradeObj.save();
        }

        console.log('Grades seeded successfully:', gradesData);
        console.log('Subjects seeded successfully:', subjectsData);
        console.log('Students seeded successfully:', studentsData);
    } catch (err) {
        console.error('Error seeding data:', err);
    } finally {
        // Close the connection
        mongoose.connection.close();
    }
});
