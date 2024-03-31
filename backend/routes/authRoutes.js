const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Role = require("../models/role");

// Route to handle creating a new teacher user
router.post('/register-teacher', async (req, res) => {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
        return res.status(400).send({
            status_code: 400,
            message: "User already exists with that Email"
        });
    }

    try {
        let roleObject = await Role.findOne({ name: req.body.role });
        if (!roleObject) {
            return res.status(400).send({
                status_code: 400,
                message: "Role not found"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            address: req.body.address,
            password: hashedPassword,
            role: roleObject._id,
            gender: req.body.gender
        });

        const result = await user.save();
        const { password, ...data } = await result.toJSON();

        res.status(201).send({
            status_code: 201,
            data: data,
            message: "CREATED"
        });
    } catch (error) {
        res.status(500).send({
            status_code: 500,
            message: "Internal Server Error"
        });
    }
});

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})

        if (!user) {
            return res.status(404).send({
                status_code: 404,
                message: "User Not Found"
            })
        }

        if (!await bcrypt.compare(req.body.password, user.password)) {
            return res.status(400).send({
                status_code: 400,
                message: "Invalid Credentials"
            })
        }

        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET_KEY)
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: false,
            maxAge: 24 * 60 * 60 * 1000 // 1day
        })

        res.status(200).send({
            status_code: 200,
            message: "SUCCESS",
        });
    } catch (error) {
        console.error("Error occurred during login:", error);
        res.status(500).send({
            status_code: 500,
            message: "Internal Server Error"
        });
    }
});

router.get('/user', async (req, res) => {
    try {
        const cookie = req.cookies['jwt'];
        const claims = jwt.verify(cookie, process.env.JWT_SECRET_KEY);

        if (!claims) {
            return res.status(401).send({
                status_code: 401,
                message: "Unauthenticated"
            });
        }

        const user = await User.findOne({_id: claims._id}).populate('role');
        if (!user) {
            return res.status(404).send({
                status_code: 404,
                message: "User not found"
            });
        }

        const {password, ...data} = await user.toJSON();

        res.status(200).send({
            status_code: 200,
            data: {
                ...data,
                role: user.role.name
            }
        });
    } catch (e) {
        return res.status(401).send({
            status_code: 401,
            message: "Unauthenticated"
        });
    }
});


router.post("/logout", (req, res) => {
    try {
        res.cookie('jwt', "", {maxAge: 0});

        res.status(200).send({
            status_code: 200,
            message: "SUCCESS"
        });
    } catch (error) {
        res.status(500).send({
            status_code: 500,
            message: "Internal Server Error",
            error: error.message
        });
    }
});

module.exports = router;