const Dynamo = require('../models/dynamoModel');
const mongoose = require('mongoose');

// get server data.
const getServerData = async (req, res) => {
    const dynamo = await Dynamo.find({});
    res.status(200).json(dynamo);
};

// set server data.
const setServerData = async (req, res) => {
    let serverData = await Dynamo.findOneAndUpdate({}, {
        ...req.body
    });
    if (!serverData){
        serverData = await Dynamo.create(req.body);
    }
    res.status(200).json(serverData);
}

module.exports = {
    getServerData, setServerData
};