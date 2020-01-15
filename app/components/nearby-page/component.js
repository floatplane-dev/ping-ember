import Component from '@ember/component';
import { inject as service } from '@ember/service';
import mapboxgl from "mapbox-gl";

class NearbyPage extends Component {
  elementId = 'nearby-page';

  @service auth;
  @service geo;

  didInsertElement() {
    this._super(...arguments);

    if (this.geo.longitude) {
      new mapboxgl.Map(
        {
          accessToken: 'pk.eyJ1IjoicmljaGFyZHZlcmhleWVuIiwiYSI6ImNrNWF4cGc1MDA0dGwzbG1zazUweWZmNjYifQ.b8WBF8yNZpC_qg9fiHMd8Q',
          container: 'nearby-map',
          style: 'mapbox://styles/mapbox/basic-v9',
          zoom: 17,
          center: [this.geo.longitude, this.geo.latitude ]
        }
      );
    } else {
      console.log('no geo data');
    }

  }
}

export default NearbyPage;
