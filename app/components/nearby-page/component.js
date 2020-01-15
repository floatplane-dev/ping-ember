import Component from '@ember/component';
import { inject as service } from '@ember/service';

class NearbyPage extends Component {
  elementId = 'nearby-page';

  @service auth;
  @service geo;
}

export default NearbyPage;
