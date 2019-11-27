import Model, { attr } from "@ember-data/model";

export default Model.extend({
  emoji: attr("string"),
  image: attr("string"),
  lat: attr("number"),
  long: attr("number")
});
