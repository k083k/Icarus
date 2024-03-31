const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user'); // Assuming you have a User model
const Role = require('../models/role');
const roles = require('../config/roles')
const Student = require('../models/Student');
const isAdmin = require("../middleware/isAdmin");
const isLoggedIn = require("../middleware/isLoggedIn");
const {title, suffix, gender, grade} = require("../data/data");


// Define a route for creating a new user (Admin)
router.post('/admin', isLoggedIn, isAdmin, async (req, res) => {
    try {
        const {first_name, last_name, email, address, gender} = req.body;
        if (!first_name || !last_name || !email || !address || !gender) {
            return res.status(400).send({
                message: 'Please provide all required fields'
            });
        }

        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).send({
                error: 'User already exists'
            });
        }

        let roleObject = await Role.findOne({name: roles.admin.name});
        const tempPassword = Math.random().toString(36).slice(-10); // Generate a random 8-character password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(tempPassword, salt);

        const newUser = new User({
            first_name,
            last_name,
            email,
            address,
            password: hashedPassword,
            role: roleObject._id,
            gender: gender
        });

        await newUser.save();
        res.status(201).send({
            message: 'User created successfully', tempPassword
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send({
            error: 'Internal server error'
        });
    }
});

// Define a route for creating a new user (Teacher)
router.post('/teachers', isLoggedIn, isAdmin, async (req, res) => {
    try {
        const {first_name, last_name, email, address, gender} = req.body;

        if (!first_name || !last_name || !email || !address || !gender) {
            return res.status(400).send({
                message: 'Please provide all required fields'
            });
        }

        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).send({
                error: 'User already exists'
            });
        }

        let roleObject = await Role.findOne({name: roles.teacher.name});
        const temporaryPassword = Math.random().toString(36).slice(-10);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(temporaryPassword, salt);

        const newUser = new User({
            first_name,
            last_name,
            email,
            address,
            password: hashedPassword,
            role: roleObject._id,
            gender: gender
        });

        await newUser.save();
        res.status(201).send({
            message: 'User created successfully', temporaryPassword
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send({
            error: 'Internal server error'
        });
    }
});

router.get('/teachers', isLoggedIn, isAdmin, async (req, res) => {
    try {
        // Fetch teachers from the database and populate the 'role' field with role documents
        const teachers = await User.find({ role: { $exists: true } }).populate('role', 'name');

        // Extract role names from the populated role documents
        const teachersWithRoleNames = teachers.map((teacher) => ({
            ...teacher.toObject(),
            role: teacher.role ? teacher.role.name : null, // Extract role name or set to null if role is not defined
        }));

        res.status(200).json(teachersWithRoleNames);
    } catch (error) {
        console.error('Error fetching teachers:', error);
        res.status(500).json({error: 'Failed to fetch teachers'});
    }
});


router.post('/students', isLoggedIn, isAdmin, async (req, res) => {
    try {
        const {first_name, last_name, date_of_birth, address, parentName, grade_class, gender} = req.body;

        if (!first_name || !last_name || !date_of_birth || !parentName || !address || !grade_class || !gender) {
            return res.status(400).send({
                message: 'Please provide all required fields'
            });
        }

        const newStudent = new Student({
            first_name,
            last_name,
            date_of_birth,
            address,
            parentName,
            grade_class,
            gender
        });

        const result = await newStudent.save();
        const data = await result.toJSON();
        res.status(201).send({
            status_code: 201,
            data: data,
            message: 'Student created successfully'
        });
    } catch (error) {
        console.error('Error creating student:', error);
        res.status(500).send({
            status_code: 500,
            message: 'Internal server error'
        });
    }
});


router.get('/students', isLoggedIn, isAdmin, async (req, res) => {
    try {
        const students = await Student.find();

        console.log(students)
        res.status(200).json(students);
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({error: 'Failed to fetch students'});
    }
});

router.put('/edit/:userId', isLoggedIn, isAdmin, async (req, res) => {
    try {
        const userId = req.params.userId;
        const { first_name, last_name, email, address, gender } = req.body;

        if (!first_name || !last_name || !email || !address || !gender) {
            return res.status(400).send({
                message: 'Please provide all required fields'
            });
        }

        const existingUser = await User.findById(userId);
        if (!existingUser) {
            return res.status(404).send({
                error: 'User not found'
            });
        }

        existingUser.first_name = first_name;
        existingUser.last_name = last_name;
        existingUser.email = email;
        existingUser.address = address;
        existingUser.gender = gender;

        await existingUser.save();

        res.status(200).send({
            message: 'User details updated successfully'
        });
    } catch (error) {
        console.error('Error updating user details:', error);
        res.status(500).send({
            error: 'Internal server error'
        });
    }
});

router.put('/edit/:userId', isLoggedIn, isAdmin, async (req, res) => {
    try {
        const studentId = req.params.userId;
        const { first_name, last_name, email, address, parentName, gender } = req.body;

        if (!first_name || !last_name || !email || !address || !parentName || !gender) {
            return res.status(400).send({
                message: 'Please provide all required fields'
            });
        }

        const existingStudent = await Student.findById(studentId);
        if (!existingStudent) {
            return res.status(404).send({
                error: 'User not found'
            });
        }

        existingStudent.first_name = req.body.first_name;
        existingStudent.last_name = req.body.last_name;
        existingStudent.email = req.body.email;
        existingStudent.address = req.body.address;
        existingStudent.parentName = req.body.parentName;
        existingStudent.gender = req.body.gender;

        await existingStudent.save();

        res.status(200).send({
            message: 'Student details updated successfully'
        });
    } catch (error) {
        console.error('Error updating student details:', error);
        res.status(500).send({
            error: 'Internal server error'
        });
    }
});

router.delete('/delete-teacher/:userId', isLoggedIn, isAdmin, async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({
                error: 'User not found'
            });
        }

        await User.findByIdAndDelete(userId);

        res.status(200).send({
            message: 'User deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send({
            error: 'Internal server error'
        });
    }
});

router.delete('/delete-student/:userId', isLoggedIn, isAdmin, async (req, res) => {
    try {
        const studentId = req.params.userId;

        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).send({
                error: 'User not found'
            });
        }

        await Student.findByIdAndDelete(studentId);

        res.status(200).send({
            message: 'Student deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).send({
            error: 'Internal server error'
        });
    }
});

router.get('/data', async (req, res) => {
    try {
        res.send({title, suffix, gender, grade});
    } catch (error) {
        console.error('Error fetching data for dropdowns:', error);
        res.status(500).send({
            error: 'Failed to fetch data for dropdowns'
        });
    }
});

router.get('/roles', async (req, res) => {
    try {
        res.send({roles});
    } catch (error) {
        console.error('Error fetching roles:', error);
        res.status(500).send({
            error: 'Failed to fetch roles'
        });
    }
});

module.exports = router;