import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { task } from 'ember-concurrency-decorators';

class authService extends Service {
  @service store;

  user = undefined;

  @action
  reviveUser() {
    const uuid = localStorage.getItem('uuid');
    if (uuid) {
      console.debug('found user in localstorage, fetching...');
      this.fetchUser.perform(uuid);
    } else {
      console.debug('no user in localstorage');
    }
  }

  @task
  *fetchUser(uuid) {
    console.debug('fetching user...');
    const user = yield this.store.find('user', uuid).catch(err => {
      console.error({ err });
    });

    if (user) {
      console.debug('user fetched', { user });
      this.set('user', user);
    } else {
      console.error('fetch user failed');
      this.set('user', undefined);
    }
  }
}

export default authService;
