import { 
  user, getUser,
  USER_AUTH, LOGOUT } from './reducers';

describe('auth reducer', () => {

  it('initializes to null', () => {
    const state = user(undefined, {});
    expect(state).toBe(null);
  });

  it('loads user', () => {
    const data = { name: 'Santa Claws' };
    const state = user(null, { type: USER_AUTH, payload: data });
    expect(state).toEqual(data);
  });

  it('clears user on logout', () => {
    const state = user({}, { type: LOGOUT });
    expect(state).toBe(null);
  });

  it('gets use from state', () => {
    const user = {};
    expect(getUser({ user })).toBe(user);
  });
});