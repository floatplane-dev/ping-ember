import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { task } from 'ember-concurrency-decorators';
import { timeout } from 'ember-concurrency';

class geoService extends Service {
  @service auth;

  @action
  start() {
    console.debug('geo.start()');
    this.timer.perform();
  }

  @action
  stop() {
    console.debug('geo.stop()');
    this.timer.cancelAll();
    this.auth.user.setProperties({ latitude: undefined, longitude: undefined });
    this.auth.user.save();
  }

  @task
  *timer() {
    console.debug('geo.timer.perform()');
    const fiveSecond = 5 * 1000;
    let i = 0;
    while (true) {
      console.debug(i);
      yield this.getCoordinates.perform();
      yield this.auth.user.save();
      yield timeout(fiveSecond);
      i++;
    }
  }

  @task
  *getCoordinates() {
    console.debug('getCoordinates()');

    if (!navigator.geolocation) {
      return console.warn('geolocation is not supported by browser');
    }

    console.debug('fetching...');

    const promise = new Promise((resolve, reject) => {
      const success = position => {
        const { latitude, longitude } = position.coords;
        console.debug('success', { latitude, longitude, position });
        this.auth.user.setProperties({ latitude, longitude });
        resolve();
      };

      const fail = error => {
        console.error('fail', { error });
        this.setProperties({
          latitude: undefined,
          longitude: undefined
        });
        reject();
      };

      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };

      navigator.geolocation.getCurrentPosition(success, fail, options);
    });

    yield promise;
  }
}

export default geoService;
