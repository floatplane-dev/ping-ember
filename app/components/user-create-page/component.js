import Component from '@ember/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  elementId: 'user-create-page',

  router: service(),

  loading: false,

  save: action(function(user) {
    this.set('loading', true);
    user
      .save()
      .then(response => {
        const uuid = response.get('id');
        localStorage.setItem('uuid', uuid);
        this.router.transitionTo('user.profile');
      })
      .catch(response => {
        console.error('failed to create user');
      })
      .finally(() => {
        this.set('loading', false);
      });
  })
});
