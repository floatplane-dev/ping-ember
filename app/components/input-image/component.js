import Component from '@ember/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  tagName: "fieldset",
  elementId: "input-image",
  rawImage: undefined,
  resizeParams: [],

  uploadImage: action(function(event) {
    const { user } = this;
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => this.set('rawImage', reader.result);
    reader.readAsDataURL(file);
  }),

  clearImage: action(function(user) {
    user.set('rawImage', undefined);
  }),

  isMouseDown: false,

  mouseDown(e) {
    if (this.rawImage) {
      console.log('mousedown');
      e.preventDefault();
      e.stopPropagation();
      this.set('isMouseDown', true);
    }
  },

  mouseUp(e) {
    if (this.rawImage) {
      console.log('mouseUp');
      this.set('isMouseDown', false);
    }
  },

  mouseLeave(e) {
    if (this.rawImage) {
      console.log('mouseLeave');
      this.set('isMouseDown', false);
    }
  },

  mouseMove(e) {
    if (this.rawImage) {
      if (this.isMouseDown) {
        console.log([e.clientX || e.pageX, e.clientY || e.pageY]);
      }
    }
  }
});
