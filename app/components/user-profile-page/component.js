import Component from "@ember/component";
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  elementId: "user-profile-page",

  router: service(),

  delete: action(function(user) {
    user.deleteRecord();
    localStorage.removeItem('uuid');
    this.router.transitionTo('index');
  })
});
