const express = require('express');
const {getWorkouts, createWorkout, getWorkout, deleteWorkout, updateWorkout} = require('../controllers/workoutControllers');
const router = express.Router();
const Workout = require('../templets/WorkoutModel');
router.get('/', getWorkouts);

// /GET single workout
router.get('/:id', getWorkout);

// /POST single workout
router.post('/', createWorkout);

// /DELETE
router.delete('/:id', deleteWorkout);

// /PATCH
router.patch('/:id', updateWorkout);

module.exports = router;