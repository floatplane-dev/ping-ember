import Component from "@ember/component";
import config from 'ember-get-config';
const { platform } = config.buildConfig;

export default Component.extend({
  elementId: "index-page",
  platform: platform
});
