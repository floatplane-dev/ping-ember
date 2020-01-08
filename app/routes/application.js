import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  auth: service(),

  init() {
    this._super(...arguments);

    // TODO: add loading state
    this.auth.reviveUser();
  }
});
