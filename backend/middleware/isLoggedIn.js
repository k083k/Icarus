const jwt = require('jsonwebtoken');
const User = require('../models/user');

const isLoggedIn = async (req, res, next) => {
    try {
        const token = req.cookies['jwt'];

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (!decodedToken) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }

        const user = await User.findById(decodedToken._id);

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: User not found' });
        }

        req.user = user;

        next();
    } catch (error) {
        console.error('Error in isLoggedIn middleware:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = isLoggedIn;
