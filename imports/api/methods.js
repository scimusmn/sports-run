import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { arenaControl } from '../startup/server/media-controller';
import rm from '../startup/server/race-manager.js';

Meteor.methods({

  arenaUpdate(data) {

    check(data, {

      msg: String,

    });

    if (data.msg.substring(0, 4) == 'race') {
      // New race initiated
      rm.initiateNewRace(data.msg);
    }

    arenaControl(data);

    return true;

  },

  beamBreak(data) {

    check(data, {

      msg: String,

    });

    switch (data.msg) {
      case 'ln1_ready':
        rm.updateRaceState({lane1Ready:true});
        break;
      case 'ln2_ready':
        rm.updateRaceState({lane2Ready:true});
        break;
      case 'ln1_finish':
        rm.lane1Finish();
        break;
      case 'ln2_finish':
        rm.lane2Finish();
        break;
      default:
        console.log('beamBreak: data.msg ' + data.msg + ' not recognized');
    }

    console.log('media-methods. beam-break:', data.msg);
    return true;

  },

});

