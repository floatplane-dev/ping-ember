import Component from "@ember/component";

import mapboxgl from "mapbox-gl";

export default Component.extend({
  elementId: "heatmap-page",

  didInsertElement() {
    this._super(...arguments);

    var map = new mapboxgl.Map(
      {
        accessToken: 'pk.eyJ1IjoicmljaGFyZHZlcmhleWVuIiwiYSI6ImNqMms4ZjRmYTAwMHAzM285aXg0aXRtZmMifQ.UgSdnfuJU4EmzBlwHBWtDw',
        container: 'test-map',
        style: 'mapbox://styles/mapbox/basic-v9',
        zoom: 13,
        center: [ -96.7969879, 32.7766642 ]
      }
    );
  },
});
