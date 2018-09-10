
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getError } from './reducers';
import { clearError } from './actions';
// import styles from './Error.css';

export class Error extends PureComponent {
  
  static propTypes = {
    error: PropTypes.any,
    clearError: PropTypes.func
  };

  componentDidUpdate() {
    const { error, clearError } = this.props;

    if(error) {
      setTimeout(() => {
        clearError();
      }, 7000);
    }
  }

  render() { 
    const { error } = this.props;
    if(!error) return null;
    const currentError = error.error || error.message || error.errors;

    return (
      <pre>{currentError}</pre>
    );
  }
}
 
export default connect(
  state => ({
    error: getError(state)
  }),
  { clearError }
)(Error);