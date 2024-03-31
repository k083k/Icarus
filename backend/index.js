require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT;
const roleInit = require('./config/roleInitializer');
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes')

mongoose.connect(
    process.env.MONGODB_URI
).then(
    async () => {
    console.log('Connected to the Database');
    await roleInit();
}).catch(
    (error) => {
    console.error('Error connecting to the database:', error);
});

app = express();
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000'],
}))

app.use('/api/v1', authRoutes);
app.use('/api/v1', protectedRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});