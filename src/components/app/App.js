import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from './Home';
import styles from './App.css';

class App extends PureComponent {
  render() { 
    return (
      <Router>
        <div className={styles.app}>
          <main>
            <Switch>
              <Route exact path='/' component={Home}/>
              <Redirect to="/"/>
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}
 
export default App;