const mongoose = require('mongoose');

const Schema = mongoose.Schema

const dynamoSchema = new Schema({
    address:  {type: String, required: true}, 
    port: {type: Number, required: true}, 
    status: {type: Boolean, required: true}
}, {timestamps: true});

module.exports = mongoose.model('Dynamo', dynamoSchema);
