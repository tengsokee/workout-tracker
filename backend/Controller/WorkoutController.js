const db = require('../config/database');

const WorkoutController = {
    // Create a new workout
    createWorkout: async (req, res) => {
        try {
            const { userId, type, duration, date, notes } = req.body;
            const [result] = await db.query(
                'INSERT INTO workouts (user_id, type, duration, date, notes) VALUES (?, ?, ?, ?, ?)',
                [userId, type, duration, date, notes]
            );
            res.status(201).json({ message: 'Workout created successfully', workoutId: result.insertId });
        } catch (error) {
            console.error('Error creating workout:', error);
            res.status(500).json({ message: 'Error creating workout', error: error.message });
        }
    },

    // Get workouts by user ID
    getUserWorkouts: async (req, res) => {
        try {
            const [rows] = await db.query(
                'SELECT * FROM workouts WHERE user_id = ? ORDER BY date DESC',
                [req.params.userId]
            );
            res.json(rows);
        } catch (error) {
            console.error('Error getting workouts:', error);
            res.status(500).json({ message: 'Error getting workouts', error: error.message });
        }
    },

    // Update workout
    updateWorkout: async (req, res) => {
        try {
            const { type, duration, date, notes } = req.body;
            const [result] = await db.query(
                'UPDATE workouts SET type = ?, duration = ?, date = ?, notes = ? WHERE id = ? AND user_id = ?',
                [type, duration, date, notes, req.params.id, req.params.userId]
            );
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Workout not found or unauthorized' });
            }
            res.json({ message: 'Workout updated successfully' });
        } catch (error) {
            console.error('Error updating workout:', error);
            res.status(500).json({ message: 'Error updating workout', error: error.message });
        }
    },

    // Delete workout
    deleteWorkout: async (req, res) => {
        try {
            const [result] = await db.query(
                'DELETE FROM workouts WHERE id = ? AND user_id = ?',
                [req.params.id, req.params.userId]
            );
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Workout not found or unauthorized' });
            }
            res.json({ message: 'Workout deleted successfully' });
        } catch (error) {
            console.error('Error deleting workout:', error);
            res.status(500).json({ message: 'Error deleting workout', error: error.message });
        }
    }
};

module.exports = WorkoutController;