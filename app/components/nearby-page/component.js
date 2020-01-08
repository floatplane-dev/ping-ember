import Component from "@ember/component";
import { set } from "@ember/object";
import { inject as service } from '@ember/service';


export default Component.extend({
  elementId: "nearby-page",

  geo: service(),

  init() {
    this._super(...arguments);
    this.geo.updateGeolocationPermission();
  },

  actions: {
    alertGeolocation() {
      this.geo.displayGeolocation();
    }
  }

});
