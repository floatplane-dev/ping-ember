import Route from "@ember/routing/route";
import RSVP from "rsvp";

export default Route.extend({
  model() {
    const uuid = localStorage.getItem("uuid");

    return RSVP.hash({
      user: this.store.find("user", uuid)
    });
  },

  actions: {
    error(error, transition) {
      console.error("Could not load user");
      console.debug(error, transition);
      debugger;
    }
  }
});
