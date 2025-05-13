const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

require('dotenv').config();
const workoutRoutes = require('./routes/workouts');

const dynamoRoutes = require('./routes/dynamo')

// express app
const app = express();
app.use(cors());

// middle ware
app.use(express.json()); // if req has some data, this adds it to req. object.
app.use((req, res, next)=>{
    console.log(req.path + " " + req.method);
    next();
})

// routes
app.get("/", (req, res) => {
    // res.json({mssg: "Welcome to my app!"})
    const filePath = path.join(__dirname, 'files', 'welcome.html');
    res.sendFile(filePath);
})

app.use('/api/workouts', workoutRoutes); // use the routes written in ./routes/workouts.js......just writes all routes writte in this files here.
// the /api/workouts here and the one written in workouts.js file are going to be relative to its folder...i.e. the paths are concatenated.

app.use('/api/dynamo', dynamoRoutes);

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


