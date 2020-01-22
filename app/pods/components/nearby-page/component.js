import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency-decorators';
import { timeout } from 'ember-concurrency';

class NearbyPage extends Component {
  elementId = 'nearby-page';

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
      // this.set('users', users);
      yield timeout(fiveSecond);
      i++;
    }
  }
}

export default NearbyPage;
