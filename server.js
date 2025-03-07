const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const workoutRoutes = require('./routes/workouts');

// express app
const app = express();

// middle ware
app.use(express.json()); // if req has some data, this adds it to req. object.
app.use((req, res, next)=>{
    console.log(req.path + " " + req.method);
    next();
})

// routes
// app.get("/", (req, res) => {
//     res.json({mssg: "Welcome to my app!"})
// })

app.use('/api/workouts', workoutRoutes); // use the routes written in ./routes/workouts.js......just writes all routes writte in this files here.
// the /api/workouts here and the one written in workouts.js file are going to be relative to its folder...i.e. the paths are concatenated.

// connect to db
mongoose.connect(process.env.MONGO_URI) // asyncronous
    .then(() => {
        // listening for requests
        app.listen(process.env.PORT, () => {
            console.log(`connected to DB and Listening on port ${process.env.PORT}...`);
        });
    })
    .catch((err) => {
        console.log(err);
    })


