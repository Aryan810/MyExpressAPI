const express = require('express');
const {getServerData, setServerData} = require('../controllers/dynamoControllers');
const router = express.Router();
const Dynamo = require('../models/dynamoModel');
router.get('/', getServerData);

// /POST single workout
router.post('/', setServerData);

module.exports = router;