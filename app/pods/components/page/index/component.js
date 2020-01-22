import Page from '../component';
import ENV from 'ping/config/environment';

export default class IndexPage extends Page {
  elementId = 'index';
  platform = ENV.platform;
}
