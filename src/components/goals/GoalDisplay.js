import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

class GoalDisplay extends PureComponent {
  static propTypes = {
    goal: PropTypes.object.isRequired
  };

  render() { 
    const { goal } = this.props;
    const { completed } = goal;
    return (
      <Fragment>
        <p>{goal.goal}   {completed &&
          <span>✅</span>
        }</p>
        
      </Fragment>
    );
  }
}
 
export default GoalDisplay;