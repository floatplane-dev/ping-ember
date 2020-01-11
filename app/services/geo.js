import Service from '@ember/service';
import { task, timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Service.extend({
  isAllowed: false,
  isEnabled: false,

  latitude: undefined,
  longitude: undefined,

  auth: service(),

  allow() {
    console.debug('geo.allow()');

    this.getLatLong.perform();

    // const self = this;

    // const success = result => {
    //   const { state } = result;
    //   console.debug({ state, result });
    //
    //   if (state === 'granted') {
    //     self.set('isAllowed', true);
    //   }
    //   //   self.set('isAllowed', true);
    //   // } else if (state === 'denied') {
    //   //   self.set('isAllowed', false);
    //   // } else if (state === 'prompt') {
    //   //   // do nothing
    //   // } else {
    //   //   // unknown state
    //   //   debugger;
    //   // }
    // };
    //
    // navigator.permissions.query({ name: 'geolocation' }).then(success);
  },

  start() {
    console.debug('geo.start()');
    this.timer.perform();
    // this.set('isEnabled', true);
  },

  stop() {
    console.debug('geo.stop()');
    this.timer.cancel();
    // this.set('isEnabled', false);
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
      console.debug('success', { position });
      this.setProperties({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
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
