import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('user', function() {
    this.route('create');
    this.route('profile');
  });
  this.route('heatmap');
  this.route('nearby');
  this.route('application-loading');
});
