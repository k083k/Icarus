const Role = require('../models/role');
const rolesData = require('../config/roles');

async function initializeRoles() {
    try {
        for (const roleName in rolesData) {
            const roleExists = await Role.findOne({ name: rolesData[roleName].name });
            if (!roleExists) {
                await Role.create(rolesData[roleName]);
                console.log(`Role '${rolesData[roleName].name}' created successfully`);
            }
        }
    } catch (error) {
        console.error('Error initializing roles:', error);
    }
}

module.exports = initializeRoles;
