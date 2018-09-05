const { assert } = require('chai');
const request = require('../request');
const { dropCollection } = require('../db');

describe('Goals API', () => {

    let user;
    let goal1;

    let token;
    

    beforeEach(() => dropCollection('goals'));
    beforeEach(() => dropCollection('users'));

    beforeEach(() => {
        return request
            .post('/api/auth/signup')
            .send({
                name: 'Stf',
                email: 'stef@robyn.com',
                password: '12345678'
            })
            .then(({ body }) => {
                token = body.token;
                user = body;
            });
    });

    it('saves a user', () => {
        assert.ok(user);
    });

    beforeEach(() => {
        return request
            .post('/api/me/goals')
            .set('Authorization', token)
            .send({
                goal: 'get it',
                completed: false,
                author: user._id
            })
            .then(({ body }) => {
                const { _id, __v } = body;
                goal1 = body;
                assert.deepEqual(body, {
                    ...goal1,
                    _id, __v
                });
            });
    });

    xit('saves a goal', () => {
        assert.ok(goal1);
    });

    xit('gets goals', () => {
        return request  
            .get('/api/me/goals')
            .then(({ body }) => {
                assert.deepEqual(body, [goal1] );
            });
    });

    xit('gets goals by id', () => {
        return request  
            .get(`/api/me/goals/${goal1._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, goal1);
            });
    });

    xit('updates a goal', () => {
        goal1.completed = true;
        return request  
            .put(`/api/me/goals/${goal1._id}`)
            .set('Authorization', token)
            .send(goal1)
            .then(({ body }) => {
                assert.equal(body.completed, true);
            });
    });
});