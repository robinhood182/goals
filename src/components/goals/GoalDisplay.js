import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class GoalDisplay extends PureComponent {
  static propTypes = {
    goal: PropTypes.object.isRequired
  };

  render() { 
    const { goal } = this.props;
    const { completed } = goal;
    return (
      <section>
        <p>{goal.goal}</p>
        {completed &&
          <p>Goal reached!</p>
        }
      </section>
    );
  }
}
 
export default GoalDisplay;