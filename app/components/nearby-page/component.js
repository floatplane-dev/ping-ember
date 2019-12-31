import Component from "@ember/component";
import { set } from "@ember/object";

export default Component.extend({
  elementId: "nearby-page",
  geolocationPermissionState: undefined,
  latitude: undefined,
  longitude: undefined,

  init() {
    this._super(...arguments);
    this.updateGeolocationPermission();
  },

  updateGeolocationPermission() {
    navigator.permissions.query({name:'geolocation'}).then(result => {
      // result.state == 'granted'/'denied'/'prompt'(default)
      set(this, 'geolocationPermissionState', result.state);
    });
  },

  actions: {
    alertGeolocation(){

      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };

      const success = pos => {
        this.updateGeolocationPermission();

        window.alert(`${pos.coords.latitude}, ${pos.coords.longitude}`)
        set(this, 'latitude', pos.coords.latitude);
        set(this, 'longitude', pos.coords.longitude);
      }

      const error = err => {
        this.updateGeolocationPermission();
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }

      navigator.geolocation.getCurrentPosition(success, error, options);

    }
  }
});
