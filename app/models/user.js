import Model, { attr } from '@ember-data/model';

export default Model.extend({
  emoji: attr('string'),
  image: attr('string'),
  latitude: attr('number'),
  longitude: attr('number')
});
