import Component from '@ember/component';
// import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  elementId: 'user-profile-page',

  geo: service(),
  router: service(),

  // @action
  // allowGeo() {
  //   console.log('allow geo');
  //   console.log({ self: this });
  //   // model.set('name', name);
  // },

  // allowGeo: action(function() {
  //   console.log('allow geo');
  //   console.log({ self: this });
  //   // this.geo.start();
  // }),

  @action
  deleteUser(user) {
    user.deleteRecord();
    localStorage.removeItem('uuid');
    this.router.transitionTo('index');
  }
});
