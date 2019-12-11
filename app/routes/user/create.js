import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  model() {
    return RSVP.hash({
      user: this.store.createRecord('user', {
        image: `data:image/png;base64,xxx`,
        emoji: '♂️☕️🎓'
      })
    });
  }
});
