// Importing express module 
const express = require("express");
const app = express();
const cors = require('cors');
const db = require('./config/database');
const userRoutes = require('./Routes/UserRoute');
const workoutRoutes = require('./Routes/WorkoutRoute');

// CORS configuration
app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Test database connection
db.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Successfully connected to database');
    connection.release();
});

// Use routes
app.use(userRoutes);
app.use(workoutRoutes);

// Root route
app.get("/", (req, res) => { 
    res.send("Workout Tracker API"); 
}); 

// Server setup 
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is Running on port ${PORT}`);
});
