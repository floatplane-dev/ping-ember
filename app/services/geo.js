import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { task } from 'ember-concurrency-decorators';
import { timeout } from 'ember-concurrency';

class geoService extends Service {
  @service auth;

  // The coordinates of the logged in user
  latitude = undefined;
  longitude = undefined;

  // Whether the user has given permission to fetch geo coordinates
  // allowed = false;

  // Whether to fetch geo coordinates every X or not
  // enabled = false;

  @action
  start() {
    console.debug('geo.start()');
    this.timer.perform();
  }

  @action
  stop() {
    console.debug('geo.stop()');
    this.timer.cancel();
  }

  @task
  *timer() {
    console.debug('geo.timer.perform()');
    const fiveSecond = 5 * 1000;
    let i = 0;
    while (true) {
      console.debug(i);
      yield this.getLatLong.perform();
      // yield this.saveLatLong.perform();
      yield timeout(fiveSecond);
      i++;
    }
  }

  @task
  *getLatLong() {
    console.debug('getLatLong');

    const success = position => {
      const { latitude, longitude } = position.coords;
      console.debug('success', { latitude, longitude, position });
      this.setProperties({ latitude, longitude });
    };

    const error = err => {
      console.error('fail', { err });

      this.setProperties({
        latitude: undefined,
        longitude: undefined
      });
    };

    // Documentation:
    // TODO: insert URL
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    if (!navigator.geolocation) {
      return console.warn('geolocation is not supported by browser');
    }

    console.debug('fetching...');

    yield navigator.geolocation.getCurrentPosition(success, error, options);
  }

  // @task
  // *saveLatLong() {
  //   const user = this.auth.currentUser;
  //   const { latitude, longitude } = this;
  //   user.setProperties({
  //     latitude,
  //     longitude
  //   });
  //   yield user.save();
  // }
}

export default geoService;
