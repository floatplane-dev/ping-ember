import Component from '@ember/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

class UserProfilePage extends Component {
  elementId = 'user-profile-page';

  @service geo;
  @service router;

  @action
  deleteUser(user) {
    user.deleteRecord();
    localStorage.removeItem('uuid');
    this.router.transitionTo('index');
  }
}

export default UserProfilePage;
