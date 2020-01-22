import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service auth;

  model() {
    const uuid = localStorage.getItem('uuid');

    if (uuid) {
      console.debug('found user in localstorage, fetching...');
      return this.auth.fetchUser.perform(uuid);
    } else {
      console.debug('no user in localstorage');
      return;
    }
  }
}
