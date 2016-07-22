import React, { Component } from 'react';
import axios from 'axios';
import styles from './Home.scss';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {
    const request = axios.get('https://www.getyourguide.com/touring.json?key=2Gr0p7z96D');

    request.then(response => {
      if (!response.error && /^2../.test(response.status)) {
        const {
          data = {}
        } = response;

        this.setState({
          data
        });
      }
    });
  }

  render() {
    const {
      data
    } = this.state;

    if (!data) {
      return (
        <div className={styles.home}>
          Loading
        </div>
      );
    } else {
      return (
        <div className={styles.home}>
          <div className={styles.photo}>
            <img
              className={styles.photoImage}
              src={data.activityPictureUrl}
              title={data.activityTitle}
              alt={data.activityTitle} />
          </div>
          <div className={styles.person}>{data.customerFirstName}</div>
        </div>
      );
    }
  }
}
