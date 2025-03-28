const express = require("express");
const router = express.Router();
const WorkoutController = require("../Controller/WorkoutController");

// Workout routes
router.post('/api/workouts', WorkoutController.createWorkout);
router.get('/api/users/:userId/workouts', WorkoutController.getUserWorkouts);
router.put('/api/users/:userId/workouts/:id', WorkoutController.updateWorkout);
router.delete('/api/users/:userId/workouts/:id', WorkoutController.deleteWorkout);

module.exports = router;