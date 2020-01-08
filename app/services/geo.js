import Service from '@ember/service';
import { set } from '@ember/object';
import { task, timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Service.extend({
  latitude: undefined,
  longitude: undefined,
  permission: undefined, // granted || denied || prompt (default)

  auth: service(),

  updateGeolocationPermission() {
    navigator.permissions.query({ name: 'geolocation' }).then(result => {
      // result.state == 'granted'/'denied'/'prompt'(default)
      set(this, 'permission', result.state);
    });
  },

  startTimer() {
    this.timer.perform();
  },

  stopTimer() {
    this.timer.cancel();
  },

  timer: task(function*() {
    const fiveSecond = 5 * 1000;
    while (true) {
      yield this.getLatLong();
      yield this.saveLatLong();
      yield timeout(fiveSecond);
    }
  }),

  getLatLong: task(function*() {
    console.debug('getLatLong');

    const success = position => {
      console.warn('success', { position });
      this.setProperties({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    };

    const error = err => {
      console.error('could not get lat long', { err });
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

    yield navigator.geolocation.getCurrentPosition(success, error, options);
  }),

  saveLatLong: task(function*() {
    const user = this.auth.currentUser;
    const { latitude, longitude } = this;
    user.setProperties({
      latitude,
      longitude
    });
    yield user.save();
  })
});
