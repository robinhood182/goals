import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signin, signup } from './actions';
import { getUser } from './reducers';
import Credentials from './Credentials';
import styles from './Auth.css';

class Auth extends PureComponent {

  static propTypes = {
    user: PropTypes.object,
    signin: PropTypes.func.isRequired,
    signup: PropTypes.func.isRequired,
    location: PropTypes.object
  }

  render() { 

    const { user, signin, signup, location } = this.props;
    const redirect = location.state ? location.state.from : '/';
    if(user) return <Redirect to={redirect}/>;

    return ( 
      <section className={styles.auth}>
        <Switch>
          <Route path="/auth/signin" component={() => (
            <section>
              <p>Not a member? <Link to="/auth/signup">Create an account</Link></p>
              <Credentials action="Sign in" submit={signin}/>
            </section>
          )}/>
          <Route path="/auth/signup" render={() => (
            <section>
              <p>Already a member? <Link to="/auth/signin">Sign in</Link></p>
              <Credentials action="Submit" submit={signup} allowName={true}/>
            </section>
          )}/>
          <Redirect to="/auth/signin"/>
        </Switch>
      </section>
    );
  }
}
 
export default connect(
  state => ({
    user: getUser(state)
  }),
  { signup, signin }
)(Auth);