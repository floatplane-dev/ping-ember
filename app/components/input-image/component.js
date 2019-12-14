import Component from '@ember/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  tagName: "fieldset",

  uploadImage: action(function(event) {
    const { user } = this;
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => user.set('image', reader.result);
    reader.readAsDataURL(file);
  }),

  clearImage: action(function(user) {
    user.set('image', undefined);
  })
});
