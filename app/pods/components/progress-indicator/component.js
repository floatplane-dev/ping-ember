import Component from "@ember/component";
import { inject as service } from "@ember/service";

class ProgressIndicator extends Component {
  @service geo;
  
  elementId = "progress-indicator";
  classNames = ["track"];
  tagName = 'div';
};

export default ProgressIndicator;
