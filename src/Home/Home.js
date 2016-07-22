import React, { Component } from 'react';
import axios from 'axios';
import GoogleMap from 'google-map-react';
import styles from './Home.scss';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }

  fetchActivity() {
    const request = axios.get('https://www.getyourguide.com/touring.json?key=2Gr0p7z96D');

    request.then(response => {
      if (!response.error && /^2../.test(response.status)) {
        const {
          data = {}
        } = response;

        this.setState({
          data: {
            name: data.customerFirstName,
            activity: data.activityTitle,
            image: data.activityPictureUrl,
            center: {
              lat: data.activityCoordinateLatitude,
              lng: data.activityCoordinateLongitude
            }
          }
        });
      }
    });
  }

  componentWillMount() {
    this.fetchActivity();

    setInterval(() => this.fetchActivity(), 9250);
  }

  render() {
    const {
      data = {}
    } = this.state;

    if (!data) {
      return (
        <div className={styles.home}>
          Loading
        </div>
      );
    } else {
      const bootstrapURLKeys = {
        key: 'AIzaSyD3B9aiCzl5NH8y4ZNwGgMyNfoPQUebMCQ',
        center: data.center
      };
      const imageStyle = {
        backgroundImage: `url(${data.image})`
      };

      return (
        <div className={styles.home}>
          <div
            className={styles.image}
            style={imageStyle} />
          <div className={styles.activity}>
            <span className={styles.brief}>
              {data.activity}
              <span className={styles.author}> — {data.name}</span>
            </span>
          </div>
          <div className={styles.map}>
            <GoogleMap
              bootstrapURLKeys={bootstrapURLKeys}
              center={data.center}
              defaultZoom={15} />
          </div>
        </div>
      );
    }
  }
}
