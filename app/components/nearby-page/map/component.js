import Component from '@ember/component';
import mapboxgl from "mapbox-gl";

class NearbyPage extends Component {
  elementId: "nearby-map",

  didInsertElement() {
    this._super(...arguments);

    if (this.longitude) {
      new mapboxgl.Map(
        {
          accessToken: 'pk.eyJ1IjoicmljaGFyZHZlcmhleWVuIiwiYSI6ImNrNWF4cGc1MDA0dGwzbG1zazUweWZmNjYifQ.b8WBF8yNZpC_qg9fiHMd8Q',
          container: 'nearby-map',
          style: 'mapbox://styles/mapbox/basic-v9',
          zoom: 17,
          center: [this.longitude, this.latitude ]
        }
      );
    }

  }
}

export default NearbyPage;
