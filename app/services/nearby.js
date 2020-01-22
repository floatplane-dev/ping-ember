import Service from '@ember/service';
import { equal } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency-decorators';

export default class nearbyService extends Service {
  @service auth;
  @service router;

  @equal('router.currentRoute', 'blog.index') isNearbyRoute;

  user = [];

  @task
  *fetch() {
    if (!this.isNearbyRoute) {
      console.debug('is NOT nearby route');
      return;
    }
    console.debug('is nearby route');
    const users = yield this.store.findAll('user');
    console.debug({ users });
    this.set('users', users);
  }
}
