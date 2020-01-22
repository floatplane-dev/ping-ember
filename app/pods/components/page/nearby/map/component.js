import Component from '@ember/component';
import addPulsingDot from './pulsingDot';
import mapboxgl from 'mapbox-gl';

export default class NearbyMap extends Component {
  elementId = 'nearby-map';

  didInsertElement() {
    super.didInsertElement(...arguments);

    if (this.longitude) {
      const map = new mapboxgl.Map({
        accessToken:
          'pk.eyJ1IjoicmljaGFyZHZlcmhleWVuIiwiYSI6ImNrNWF4cGc1MDA0dGwzbG1zazUweWZmNjYifQ.b8WBF8yNZpC_qg9fiHMd8Q',
        container: 'nearby-map',
        style: 'mapbox://styles/mapbox/basic-v9',
        zoom: 17,
        center: [this.longitude, this.latitude]
      });

      map.on('load', () => {
        addPulsingDot(map, this.longitude, this.latitude);
      });
    }
  }
}
