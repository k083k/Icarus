const mongoose = require("mongoose");
const faker = require("faker");

const Grade = require("../models/grade"); // Assuming your model file is in ../models/grade.js
const Subject = require("../models/subject"); // Assuming you have a Subject model
const Student = require("../models/student"); // Assuming you have a Student model

mongoose.connect("mongodb+srv://k083k0r3:a2wcha3g6r@cluster0.4qnnics.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Function to generate fake grades
async function generateFakeGrades(numGrades) {
    try {
        const subjects = await Subject.find().select("_id"); // Fetching all subject ids
        const students = await Student.find().select("_id name"); // Fetching all student ids and names

        for (let i = 1; i <= numGrades; i++) {
            const grade = new Grade({
                name: `Grade ${i}`, // Generating grade names with pattern "Grade 1", "Grade 2", etc.
                subjects: subjects.map((subject) => subject._id), // Assigning all subject ids
                students: students.map((student) => ({
                    _id: student._id, // Assigning student id
                    name: student.name, // Assigning student name
                    gender: student.gender,
                })),
            });
            await grade.save(); // Saving the grade
        }
        console.log(`${numGrades} fake grades generated successfully.`);
    } catch (error) {
        console.error("Error generating fake grades:", error);
    }finally {
        mongoose.connection.close(); // Close MongoDB connection after generating grades
    }
}

// Usage: Call generateFakeGrades function with the desired number of fake grades
generateFakeGrades(7); // Generate 5 fake grades
