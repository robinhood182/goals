import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './GoalForm.css';

class GoalForm extends PureComponent {
  state = { 
    goal:''
  };

  static propTypes = {
    submit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.nameInput.focus();
  }

  handleCancel = event => {
    event.preventDefault();
    this.props.onCancel();
  };

  handleSubmit = event => {
    event.preventDefault();
    if(!this.state.goal) return;
    this.props.submit(this.state);
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name ]: target.value });
  }

  render() { 
    const { goal } = this.state;

    return ( 
      <form className={styles.goalForm} onSubmit={this.handleSubmit}>
        <input ref={node => this.nameInput = node} name="goal" value={goal} onChange={this.handleChange}/>
        <section className="buttons">
          <button>Set Goal</button>
          <button onClick={this.handleCancel}>Cancel</button>
        </section>
      </form>
    );
  }
}
 
export default GoalForm;