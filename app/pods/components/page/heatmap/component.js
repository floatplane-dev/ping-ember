import Page from '../component';
import { inject as service } from '@ember/service';

export default class HeatmapPage extends Page {
  elementId = 'heatmap';

  @service auth;
  @service geo;
}
