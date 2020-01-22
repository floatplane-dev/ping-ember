import Component from '@ember/component';
import ENV from 'ping/config/environment';

export default Component.extend({
  elementId: 'index-page',
  platform: ENV.platform
});
