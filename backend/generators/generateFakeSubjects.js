const mongoose = require('mongoose');
const faker = require('faker');
const Subject = require('../models/subject');
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
        // Fetch all grades from the database
        const grades = await Grade.find();

        // Generate fake subjects
        const subjectsData = [];
        for (let i = 0; i < 50; i++) { // Generate 50 subjects
            const subject = new Subject({
                name: faker.random.words(), // Generate a random subject name
                grades: [] // Initialize empty array for grades
            });
            // Randomly select multiple unique grades for the subject
            const selectedGrades = new Set();
            const numGrades = Math.floor(Math.random() * grades.length) + 1;
            while (selectedGrades.size < numGrades) {
                const randomGrade = grades[Math.floor(Math.random() * grades.length)];
                selectedGrades.add(randomGrade);
            }
            selectedGrades.forEach(grade => {
                subject.grades.push({ _id: grade._id, name: grade.name });
            });
            subjectsData.push(subject);
        }

        // Save all generated subjects
        const savedSubjects = await Subject.insertMany(subjectsData);

        // Update the grades with new subjects
        for (const savedSubject of savedSubjects) {
            for (const grade of savedSubject.grades) {
                const updatedGrade = await Grade.findById(grade._id);
                updatedGrade.subjects.push({ _id: savedSubject._id, name: savedSubject.name });
                await updatedGrade.save();
            }
        }

        console.log('Subjects seeded successfully.');
    } catch (err) {
        console.error('Error seeding subjects:', err);
    } finally {
        // Close the connection
        mongoose.connection.close();
    }
});
