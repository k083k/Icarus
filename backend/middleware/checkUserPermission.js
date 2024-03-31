const checkUserPermission = async (req, res, next) => {
    try {
        const token = req.cookies['jwt'];

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }
        // Assuming you have already implemented user authentication and role retrieval
        const role = req.body.role; // Retrieve user object from request, which should include role information
        // Check if user has the required permission to create teachers
        if (role.role !== '65faef02a2f304b7a111b5c0') { // Adjust this condition based on your role structure
            return res.status(403).send({
                message: "You do not have permission to access this route."
            });
        }

        // If user has the required permission, proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Error checking permissions:', error);
        res.status(500).send({
            error: 'Internal server error'
        });
    }
};

module.exports = checkUserPermission;