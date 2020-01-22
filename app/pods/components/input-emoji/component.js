import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  elementId: "input-emoji",
  tagName: "ul",
  availableEmoji: [
    "🍿",
    "🎼",
    "🎮",
    "🎱",
    "🌈",
    "💼",
    "🎓",
    "🥗",
    "☕️",
  ],

  emoji: computed('user.emoji', function() {
    const {availableEmoji, user} = this;

    return availableEmoji.map(emoji => {
      return {
        emoji,
        active: user.emoji && user.emoji.includes(emoji)
      };
    });
  }),

  toggleEmoji: action(function(emoji, user) {

    if (!user.emoji) {
      user.set('emoji', emoji);
      return;
    }

    if (user.emoji.includes(emoji)) {
      user.set('emoji', user.emoji.replace(emoji, ''));
    } else {
      user.set('emoji', user.emoji.concat(emoji));
    }
  })
});
