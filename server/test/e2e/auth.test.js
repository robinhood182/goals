const { assert } = require('chai');
const request = require('../request');
const { dropCollection } = require('../db');

const userOne = {
    name: 'Stef',
    email: 'stef@robyn.com',
    password: '12345678'
};

const userTwo = {
    name: 'Robyn',
    email: 'robyn@stef.com',
    password: '12345678'
};

const badPassword = {
    name: 'Robyn',
    email: 'robyn@stef.com',
    password: '22345678'
};

const badEmail = {
    name: 'Robyn',
    email: 'robin@stef.com',
    password: '12345678'
};

let tokenOne;
let tokenTwo;

describe('Auth Api', () => {
    beforeEach(() => dropCollection('users'));

    beforeEach(() => {
        return request
            .post('/api/auth/signup')
            .send(userOne)
            .then(({ body }) => tokenOne = body.token);
    });

    it('singup', () => {
        assert.ok(tokenOne);
    });
});