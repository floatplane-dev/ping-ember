import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { task } from 'ember-concurrency-decorators';
import { timeout } from 'ember-concurrency';
import { alias } from '@ember/object/computed';

class geoService extends Service {
  @service auth;

  @alias('auth.user') user;
  @alias('auth.user.latitude') latitude;
  @alias('auth.user.longitude') longitude;

  @action
  start() {
    console.debug('geo.start()');
    this.timer.perform();
  }

  @action
  stop() {
    console.debug('geo.stop()');
    this.timer.cancelAll();
    this.setProperties({ latitude: undefined, longitude: undefined });
  }

  @task
  *timer() {
    console.debug('geo.timer.perform()');
    const fiveSecond = 5 * 1000;
    let i = 0;
    while (true) {
      console.debug(i);
      yield this.getLatLong.perform();
      yield this.user
        .save()
        .then(response => {
          console.debug('success', { response });
        })
        .catch(err => {
          console.error('fail', { err });
        });
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

    // const promise = new Promise((resolve, reject) => {
    //   navigator.geolocation.getCurrentPosition(resolve, reject, options);
    // });

    // yield promise;

    // debugger;

    yield navigator.geolocation.getCurrentPosition(success, error, options);
  }
}

export default geoService;
