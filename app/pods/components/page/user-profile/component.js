import Page from '../component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class UserProfilePage extends Page {
  elementId = 'user-profile';

  @service auth;
  @service geo;
  @service router;

  @action
  deleteUser(user) {
    user.deleteRecord();
    localStorage.removeItem('uuid');
    // geo.stop(); // this causes an error, need a combination of promises here to make it stable
    this.router.transitionTo('index');
  }
}
