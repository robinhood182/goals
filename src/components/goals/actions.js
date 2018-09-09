import { GOALS_LOAD, GOALS_ADD, GOAL_UPDATE } from './reducers';
import { getGoals, postGoal, changeGoalStatus } from '../../services/api';

export const loadGoals = () => {
  return {
    type: GOALS_LOAD,
    payload: getGoals()
  };
};

export const addGoal = data => {
  return {
    type: GOALS_ADD,
    payload: postGoal(data)
  };
};

export const updateGoal = id => {
  return {
    type: GOAL_UPDATE,
    payload: changeGoalStatus(id)
  };
};