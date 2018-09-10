import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { updateGoal } from './actions';
import { connect } from 'react-redux';
import GoalDisplay from './GoalDisplay';
import styles from './Goal.css';

class Goal extends PureComponent {
  state = { 
    editing: false
  };

   static propTypes = {
     goal: PropTypes.object.isRequired,
     updateGoal: PropTypes.func.isRequired
   }

   toggleEdit = () => {
     this.setState(({ editing }) => ({ editing: !editing }));
   };

   handleUpdate = () => {
     const { updateGoal, goal } = this.props;
     return updateGoal(goal._id);
   };

   render() { 
     const { goal } = this.props;
     return (
       <li 
         onClick={this.handleUpdate}
         className={styles.goal}
       >
         <GoalDisplay goal={goal}/>
       </li>
     );
   }
}
 
export default connect(
  null,
  { updateGoal }
)(Goal);