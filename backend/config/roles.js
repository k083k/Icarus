const permissions = require ('../permissions')
const roles = {
    admin: {
        name: 'Admin',
        permissions: [
            permissions.CREATE_STUDENT,
            permissions.READ_STUDENT,
            permissions.UPDATE_STUDENT,
            permissions.DELETE_STUDENT,

            permissions.CREATE_TEACHER,
            permissions.READ_TEACHER,
            permissions.UPDATE_TEACHER,
            permissions.DELETE_TEACHER,

            permissions.CREATE_CLASS,
            permissions.READ_CLASS,
            permissions.UPDATE_CLASS,
            permissions.DELETE_CLASS,

            permissions.CREATE_GRADE,
            permissions.READ_GRADE,
            permissions.UPDATE_GRADE,
            permissions.DELETE_GRADE,

            permissions.CREATE_SUBJECT,
            permissions.READ_SUBJECT,
            permissions.UPDATE_SUBJECT,
            permissions.DELETE_SUBJECT,
        ]
    },
    teacher: {
        name: 'Teacher',
        permissions: [
            permissions.READ_STUDENT,
            permissions.UPDATE_STUDENT,
            permissions.READ_CLASS,
            permissions.UPDATE_CLASS,
            permissions.READ_GRADE,
            permissions.UPDATE_GRADE,
        ],
        assignedClasses: [
            {
                className: 'Class A',
                assignedSubjects: ['Math']
            },
            {
                className: 'Class F',
                assignedSubjects: ['Physics']
            },
            // More assigned classes can be added as needed
        ]
    },
    parent: {
        name: 'Parent',
        permissions: [
            permissions.READ_STUDENT,
        ]
    }
    // Add more roles as needed
};

module.exports = roles;
