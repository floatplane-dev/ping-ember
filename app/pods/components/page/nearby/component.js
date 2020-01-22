import Page from '../component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency-decorators';
import { timeout } from 'ember-concurrency';

export default class NearbyPage extends Page {
  elementId = 'nearby';

  @service auth;
  @service geo;
  @service store;

  nearbyUsers = [];

  init() {
    super.init(...arguments);
    console.debug('<NearbyPage> init()');
    if (this.auth.user) {
      this.timer.perform();
    }
  }

  willDestroy() {
    console.debug('<NearbyPage> willDestroy()');
    this.timer.cancelAll();
  }

  @task
  *timer() {
    console.debug('<NearbyPage> starting timer');
    const fiveSecond = 5 * 1000;
    let i = 0;
    while (true) {
      console.debug(i);
      yield this.geo.getCoordinates.perform();
      yield this.auth.user.save();
      const users = yield this.store.findAll('user').then(users => {
        // Do something with `blogPost`
        console.log({ users1a: users });
        return users;
      });
      console.debug({ users1b: users });
      this.store
        .query('user', {
          filter: {
            emoji: ':pizza:'
          }
        })
        .then(function(users) {
          console.log({ users1: users });
          return users;
        });
      const nearbyUsers = this.store.peekAll('user');
      this.set('nearbyUsers', nearbyUsers);
      yield timeout(fiveSecond);
      i++;
    }
  }
}
