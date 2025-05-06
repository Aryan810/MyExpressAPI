const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');
// get all workout
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1});
    res.status(200).json(workouts);
};

// get a single workout
const getWorkout = async (req, res) => {
    // grabbing url params ->
    try{
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({error: "Invalid ID!"});
        }
        const workout = await Workout.findById(id);
        if (!workout){
            return res.status(400).json({error: "Entey not found !"});
        }
        res.status(200).json(workout);
    }catch (error){
        res.status(400).json({error: error});
    }
};

// create a workout
const createWorkout = async (req, res) => {
    const {title, load, reps} = req.body;
    const emptyFields = [];
    if (!title){
        emptyFields.push('Title');
    }
    if (!load){
        emptyFields.push('Load');
    }
    if (!reps){
        emptyFields.push('Repetations');
    }
    try{

        const workout = await Workout.create({title, load, reps});
        res.status(200).json(workout);
    }catch (error){
        res.status(400).json({error: error.message, empty: emptyFields});
    }
};  

// delete a workout
const deleteWorkout = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: "Invalid ID!"});
    }
    const workout = await Workout.findOneAndDelete({_id: id});
    if (!workout){
        return res.status(400).json({error: "Entry not found!"});
    }
    res.status(200).json(workout);
};

// update a workout
const updateWorkout = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: "Invalid ID!"});
    }

    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    });
    if (!workout){
        return res.status(400).json({error: "Entry not found!"});
    }
    res.status(200).json(workout);
};

module.exports = {
    getWorkouts, createWorkout, getWorkout, deleteWorkout, updateWorkout
};