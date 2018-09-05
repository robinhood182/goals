const router = require('express').Router();
const Goal = require('../models/goal');
const User = require('../models/user');
const ensureAuth = require('../auth/ensure-auth')();
const { getParam, respond } = require('../utils/route-helpers');
const updateOptions = {
    new: true,
    runValidators: true
};


module.exports = router 

    .param('id', getParam)

    .post('/', ensureAuth, (req, res, next) => {
        Goal.create(req.body)
            .then(goal => {
                User.findByIdAndUpdate(
                    goal.author,
                    {$push: { goals: goal } },
                    updateOptions
                )
                    .then(body => res.json(body));
            })
            .catch(next);
    })

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