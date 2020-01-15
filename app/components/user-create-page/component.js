import Component from '@ember/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  elementId: 'user-create-page',

  auth: service(),
  router: service(),

  create: action(function(user) {
    console.debug('creating user...');
    user
      .save()
      .then(response => {
        console.debug('user created', { response });
        const uuid = response.get('id');
        localStorage.setItem('uuid', uuid);
        this.auth.set('user', user);
        this.router.transitionTo('user.profile');
      })
      .catch(response => {
        console.error('failed to create user', { response });
      });
  })
});
