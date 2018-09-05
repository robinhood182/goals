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

    beforeEach(() => {
        return request
            .post('/api/goals')
            .set('Authorization', token)
            .send(goal1)
            .then(({ body }) => {
                const { _id, __v } = body;
                assert.deepEqual(body, {
                    ...goal1,
                    _id, __v
                });
                goal1 = body;
            });
    });

    it('saves a goal', () => {
        assert.ok(goal1);
    });

    it('gets goals', () => {
        return request  
            .get('/api/goals')
            .then(({ body }) => {
                assert.deepEqual(body, [goal1] );
            });
    });

    it('gets goals by id', () => {
        return request  
            .get(`/api/goals/${goal1._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, goal1);
            });
    });

    it('updates a goal', () => {
        goal1.completed = true;
        return request  
            .put(`/api/goals/${goal1._id}`)
            .set('Authorization', token)
            .send(goal1)
            .then(({ body }) => {
                assert.equal(body.completed, true);
            });
    });
});