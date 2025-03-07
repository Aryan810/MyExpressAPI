const express = require('express');
const mongoose = require('mongoose');
// require('dotenv').config();
const workoutRoutes = require('/var/task/routes/workouts');

// express app
const app = express();
const MONGO_URI="mongodb+srv://merntester:1234@cluster0.7rn9h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const PORT = 4000
// middle ware
app.use(express.json()); // if req has some data, this adds it to req. object.
app.use((req, res, next)=>{
    console.log(req.path + " " + req.method);
    next();
})

// routes
app.get("/", (req, res) => {
    res.json({mssg: "Welcome to my app!"})
})

app.use('/api/workouts', workoutRoutes); // use the routes written in ./routes/workouts.js......just writes all routes writte in this files here.
// the /api/workouts here and the one written in workouts.js file are going to be relative to its folder...i.e. the paths are concatenated.

// connect to db
mongoose.connect(MONGO_URI) // asyncronous
    .then(() => {
        // listening for requests
        app.listen(PORT, () => {
            console.log(`connected to DB and Listening on port ${PORT}...`);
        });
    })
    .catch((err) => {
        console.log(err);
    })


