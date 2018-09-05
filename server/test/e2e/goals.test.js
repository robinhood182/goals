const { assert } = require('chai');
const request = require('../request');
const { dropCollection } = require('../db');

describe('Goals API', () => {

    let token;
    let goal1 = {
        goal: 'Get good',
        completed: false
    };

    beforeEach(() => dropCollection('goals'));
    beforeEach(() => dropCollection('users'));

    beforeEach(() => {
        return request
            .post('/api/auth/signup')
            .send({
                name: 'Stef',
                email: 'stef@robyn.com',
                password: '12345678'
            })
            .then(({ body }) => token = body.token);
    });

    it('saves a goal', () => {
        return request
            .post('/api/goals')
            .set('Authorization', token)
            .send(goal1)
            .then(({ body }) => {
                const { _id, __v } = body;
                assert.deepEqual(body, {
                  ...goal1, // eslint-disable-next-line
                  _id, __v
                });
                goal1 = body;
                console.log(goal1);
            })
    });
});