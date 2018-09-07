import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Error from './Error';
import styles from './Header.css';

class Header extends PureComponent {

  render() { 
    return (
      <header className={styles.header}>
        <section className="page-name">
          <h1><NavLink exact to="/">Goal Mine</NavLink></h1>
        </section>
        <Error/>
      </header>
    );
  }
}
 
export default Header;