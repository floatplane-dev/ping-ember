import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency-decorators';

class authService extends Service {
  @service store;
  @service auth;
  @service geo;

  user = undefined;

  @task
  *fetchUser(uuid) {
    console.debug('fetching user...');
    const user = yield this.store.find('user', uuid).catch(err => {
      console.error({ err });
    });

    if (user) {
      console.debug('success', { user });
      this.auth.set('user', user);
    } else {
      console.error('fail');
      this.set('user', undefined);
    }
  }
}

export default authService;
