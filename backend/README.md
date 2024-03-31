# Project ICARUS Backend

This repository contains the backend code for the School Management System project. The backend is responsible for handling authentication, managing users, defining roles and permissions, and providing APIs for accessing and manipulating data related to students, teachers, and other entities in the system.

## Project Structure

The project is organized into the following directories:

- **config/**: Contains configuration files related to roles and permissions.
- **data/**: Contains some data that will be used in the frontend
- **middleware/**: Middleware functions such as Role-Based Access Control (RBAC).
- **models/**: Database models, including definitions for roles and users.
- **routes/**: Contains route handlers for different endpoints, such as authentication routes and protected routes.
- **permissions.js**: Definitions of permissions used in the application.
- **index.js**: Main entry point of your backend application.

## Getting Started

To get started with the development of the backend, follow these steps:

1. **Clone the Repository**: Clone this repository to your local machine using the following command:<br>
   ~~~bash
    git clone <repository-url>
   
   ~~~

2. **Install Dependencies**: <br>
   - Navigate to the project directory.<br>
   ~~~bash
   cd Project-Icarus/backend 
   
   ~~~
   - install the required dependencies using npm or yarn:<br>
   ~~~bash
   npm install
   
   ~~~

3. **Set Up Environment Variables**: Create a `.env` file in the root of the project and configure environment   variables such as database connection details, JWT secret key, etc.

4. **Start the Server**: Start the backend server by running the following command:
   ~~~bash
   npm start
   
   ~~~

5. **Development Workflow**: You can now start developing new features or fixing issues. Create new routes, models, or middleware functions as needed.

## Contributing

If you'd like to contribute to this project, please follow these guidelines:

- Fork the repository and create a new branch for your feature or fix.
- Make your changes and ensure that they adhere to the project's coding standards.
- Write tests for your code if applicable.
- Submit a pull request with a clear description of your changes and the problem they solve.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
