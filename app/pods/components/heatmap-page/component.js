import Component from "@ember/component";
import { inject as service } from "@ember/service";

class HeatmapPage extends Component {
  elementId = "heatmap-page";

  @service auth;
  @service geo;
};

export default HeatmapPage;
