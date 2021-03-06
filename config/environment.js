'use strict';

const PKG = require('../package.json');
// Expose the git hash for fingerprinting and error logging
const git = require('git-rev-sync');
const gitBranch = git.branch();
const gitRevision = git.short();
// The Rails API namespace
const apiNamespace = 'v1/public';
// Where the Rails backend is located
const apiHosts = {
  production: 'https://api.ping.floatplane.dev',
  development: {
    web: 'http://localhost:3000',
    ios: 'http://localhost:3000',
    android: 'http://10.0.2.2:3000'
  },
  test: 'http://localhost:3000'
};

// Where this Ember app is located
const appHosts = {
  production: 'https://ping.floatplane.dev',
  development: {
    web: 'http://localhost:4200',
    ios: 'http://localhost:4200',
    android: 'http://10.0.2.2:4200'
  },
  test: 'http://localhost:4200'
};
// Where the CDN is located
// const cdnHosts = {
//   production: 'https://cdn.interflux.com',
//   development: {
//     web: 'http://localhost:9000',
//     ios: 'http://localhost:9000',
//     android: 'http://10.0.2.2:9000'
//   },
//   test: 'http://localhost:9000'
// };

// The mobile browser's theme colour
// https://developers.google.com/web/fundamentals/design-and-ux/browser-customization/
const themeColour = '#23578c';

module.exports = function(env) {
  // Environments
  const isProduction = env === 'production';
  const isDevelopment = env === 'development';
  const isTest = env === 'test';
  const environment = env;

  // Platforms
  const isAndroid = process.env.ANDROID_BUILD === 'true';
  const isIOS = process.env.IOS_BUILD === 'true';
  const isMobileApp = isAndroid || isIOS;
  const isWebApp = !isMobileApp;
  const platform = isWebApp ? 'web' : isIOS ? 'ios' : 'android';

  // Hosts
  const apiHost = isDevelopment ? apiHosts[env][platform] : apiHosts[env];
  const appHost = isDevelopment ? appHosts[env][platform] : appHosts[env];
  // const cdnHost = isDevelopment ? cdnHosts[env][platform] : cdnHosts[env];

  // Change the root url to an empty string if this is a native build because cordova requires it.
  const locationType = isMobileApp && !isTest ? 'hash' : 'history';
  const rootURL = isMobileApp && !isTest ? '' : '/';

  const ENV = {
    appName: PKG.name,
    modulePrefix: PKG.name,
    podModulePrefix: `${PKG.name}/pods`,
    environment,
    rootURL,
    locationType,

    platform,
    isProduction,
    isDevelopment,
    isTest,
    isAndroid,
    isIOS,
    isMobileApp,
    isWebApp,
    apiHost,
    appHost,
    apiNamespace,
    gitBranch,
    gitRevision,
    themeColour,

    EmberENV: {
      FEATURES: {},
      EXTEND_PROTOTYPES: {
        Date: false
      }
    },
    APP: {}
  };

  if (isTest) {
    ENV.locationType = 'none';
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;
    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  return ENV;
};
