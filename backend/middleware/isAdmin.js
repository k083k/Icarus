const Role = require('../models/role');

const isAdmin = async (req, res, next) => {
    try {
        // Retrieve user object from request (assumed to be attached by isLoggedIn middleware)
        const user = req.user;

        // Fetch the role object based on the user's role ID
        const role = await Role.findById(user.role);

        // Check if role was found
        if (!role) {
            console.error('Role not found for user:', user._id);
            return res.status(500).json({ message: 'Internal server error: Role not found for user' });
        }

        // Check if user is admin or teacher
        if (role.name !== 'Admin' ) {
            return res.status(403).json({ message: 'Forbidden: User does not have permission' });
        }

        // User is either admin or teacher, proceed to next middleware or route handler
        next();
    } catch (error) {
        console.error('Error in isAdmin middleware:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = isAdmin;
