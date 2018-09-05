const router = require('express').Router();
const User = require('../models/user');
const { respond } = require('../utils/route-helpers');

module.exports = router

    .get('/', respond(() => User.find()
        .lean()
        .limit(25) 
        .populate('goals')      
    ));