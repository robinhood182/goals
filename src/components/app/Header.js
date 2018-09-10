import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUser } from '../auth/reducers';
import { logout } from '../auth/actions';
import { NavLink } from 'react-router-dom';
import Error from './Error';
import styles from './Header.css';

class Header extends PureComponent {

  static propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func.isRequired
  };

  handleLogout = () => {
    this.props.logout();
  }

  render() {
    const { user } = this.props;
    return (
      <header className={styles.header}>
        <nav className="page-name">
          <h1><NavLink exact to="/">Goal Mine</NavLink></h1>
          <ul>
            <li>
              <NavLink to="/goals">My goals</NavLink>
            </li>
            <li>
              <NavLink to="/users">Their goals</NavLink>
            </li>
          </ul>
          {user
            ? <NavLink to="/" onClick={this.handleLogout}>Logout</NavLink>
            : <NavLink to="/auth">Sign in</NavLink>
          }
        </nav>
        { user && <span>Welcome, {user.name}</span> }
        <Error/>
      </header>
    );
  }
}
 
export default connect(
  state => ({
    user: getUser(state)
  }),
  { logout }
)(Header);