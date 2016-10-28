import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { arenaControl } from '../startup/server/media-controller.js';

Meteor.methods({

  arenaUpdate(data) {

    check(data, {
      msg: String,
    });

    arenaControl(data);

    return true;

  },

});
