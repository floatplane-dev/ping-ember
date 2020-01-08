import Service from '@ember/service';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import { notEmpty } from '@ember/object/computed';

export default Service.extend({
  currentUser: undefined,

  store: service(),

  reviveUser() {
    const uuid = localStorage.getItem('uuid');
    if (uuid) {
      console.debug('found user in localstorage, fetching...');
      this.fetchUser.perform(uuid);
    } else {
      console.debug('no user in localstorage');
    }
  },

  fetchUser: task(function*(uuid) {
    const user = yield this.store.find('user', uuid);
    if (user) {
      this.set('currentUser', user);
    } else {
      this.set('currentUser', undefined);
      console.error('could not fetch user!');
    }
  })
});
