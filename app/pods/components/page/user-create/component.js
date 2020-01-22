import Page from '../component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class UserCreatePage extends Page {
  elementId = 'user-create';

  @service auth;
  @service router;

  @action
  create(user) {
    console.debug('creating user...');
    user
      .save()
      .then(response => {
        console.debug('user created', { response });
        const uuid = response.get('id');
        localStorage.setItem('uuid', uuid);
        console.debug('user UUID stored in localStorage');
        this.auth.set('user', user);
        this.router.transitionTo('user.profile');
      })
      .catch(response => {
        console.error('failed to create user', { response });
      });
  }
}
