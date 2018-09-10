import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUser } from '../auth/reducers';
import { getGoals } from './reducers';
import { loadGoals, addGoal } from './actions';
import GoalForm from './GoalForm';
import Goal from './Goal';
import styles from './Goals.css';

export class Goals extends PureComponent {
  state = { 
    adding: false
  };

  static propTypes = {
    user: PropTypes.object.isRequired,
    loadGoals: PropTypes.func.isRequired,
    addGoal: PropTypes.func.isRequired,
    goals: PropTypes.array.isRequired
  }

  componentDidMount() {
    this.props.loadGoals();
  }

  handleAdd = goal => {
    const { addGoal } = this.props;
    return addGoal(goal)
      .then(() => this.toggleAdding()); 
  };

  toggleAdding = () => {
    this.setState(({ adding }) => ({ adding: !adding }));
  };

  render() { 
    const { adding } = this.state;
    const { goals, user } = this.props;
    return (
      <div className={styles.goals}>
        <section className="goals-title">
          {adding
            ? <GoalForm onCancel={this.toggleAdding} submit={this.handleAdd}/>
            : <Fragment>
              <h2>{user.name}&apos;s goals:</h2>
              <button onClick={this.toggleAdding}>Add</button>
            </Fragment>
          }
        </section>
        <ul className="goals-list">
          {goals.map(goal => (
            <Goal
              key={goal._id}
              goal={goal}
            />
          ))}
        </ul>
      </div>
    );
  }
}
 
export default connect(
  state => ({
    user: getUser(state),
    goals: getGoals(state)
  }),
  { loadGoals, addGoal }
) (Goals);