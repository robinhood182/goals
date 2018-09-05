const router = require('express').Router();
const Goal = require('../models/goal');
const ensureAuth = require('../auth/ensure-auth')();
const { getParam, respond } = require('../utils/route-helpers');


module.exports = router 

    .param('id', getParam)

    .post('/', ensureAuth, respond(
        ({ body }) => Goal.create(body)
    ))

    .put('/:id', ensureAuth, respond(
        ({ id, body }) => Goal.updateById(id, body)
    ))

    .get('/', respond(() => Goal.find()
        .lean()
        .limit(25)        
    ))

    .get('/:id', respond(
        ({ id }) => Goal.findById(id).lean()
    ));