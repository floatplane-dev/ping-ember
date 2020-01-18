import Component from '@ember/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

class UserProfilePage extends Component {
  elementId = 'user-profile-page';

  @service auth;
  @service geo;
  @service router;

  @action
  deleteUser(user) {
    user.deleteRecord();
    localStorage.removeItem('uuid');
    geo.stop();
    this.router.transitionTo('index');
  }
}

export default UserProfilePage;
