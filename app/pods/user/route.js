import Route from '@ember/routing/route';

export default Route.extend({
  beforeModel() {
    const uuid = localStorage.getItem('uuid');
    if (uuid) {
      this.transitionTo('user.profile');
    } else {
      this.transitionTo('user.create');
    }
  }
});
