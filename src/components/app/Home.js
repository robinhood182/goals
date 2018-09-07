import React, { Component } from 'react';
import styles from './Home.css';

export class Home extends Component {
  render() { 
    return (
      <div className={styles.home}>
        <h2>Don&apos;t let your dreams be dreams...</h2>
        <p><cite>If you&apos;re tired of starting over, stop giving up.</cite> -Shia LaBeouf</p>
      </div>
    );
  }
}
 
export default Home;