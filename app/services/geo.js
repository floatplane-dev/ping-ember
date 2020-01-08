import Service from '@ember/service';
import { set } from "@ember/object";

export default Service.extend({

  latitude: undefined,
  longitude: undefined,
  permission: undefined, //string 'granted'/'denied'/'prompt'(default)

  updateGeolocationPermission() {
    navigator.permissions.query({name:'geolocation'}).then(result => {
      // result.state == 'granted'/'denied'/'prompt'(default)
      set(this, 'permission', result.state);
    });
  },

  displayGeolocation() {

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

});
