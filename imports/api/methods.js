import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { arenaControl } from '../startup/server/media-controller';
import rm from '../startup/server/race-manager.js';
import Constants from '../modules/constants';

Meteor.methods({

  arenaUpdate(data) {

    check(data, {

      msg: String,

    });

    if (data.msg.substring(0, 4) == 'race') {
      // New race initiated
      if (rm.isState(Constants.STATE_IDLE)) {
        rm.initiateNewRace(data.msg);
      }
    }

    arenaControl(data);

    return false;

  },

  beamBreak(data) {

    check(data, {

      msg: String,

    });

    switch (data.msg) {
      case 'ln1_start':
        if (rm.isState(Constants.STATE_PRE_RACE)) {
          rm.updateRaceState({lane1Started:true, lane1FalseStart:true});
        } else if (rm.isState(Constants.STATE_RACING)) {
          rm.updateRaceState({lane1Started:true});
        }

        break;
      case 'ln2_start':
        if (rm.isState(Constants.STATE_PRE_RACE)) {
          rm.updateRaceState({lane2Started:true, lane2FalseStart:true});
        } else if (rm.isState(Constants.STATE_RACING)) {
          rm.updateRaceState({lane2Started:true});
        }

        break;
      case 'ln1_finish':
        if (rm.isState(Constants.STATE_RACING)) {
          rm.lane1Finish();
        }

        break;
      case 'ln2_finish':
        if (rm.isState(Constants.STATE_RACING)) {
          rm.lane2Finish();
        }

        break;
      default:
        console.log('beamBreak: data.msg ' + data.msg + ' not recognized');
    }

    console.log('media-methods. beam-break:', data.msg);
    return true;

  },

});

// Ensure race state start with defaults
console.log('methods.js  - Defaulting race state');
rm.resetForNextRace(Constants.DEFAULT_RACE_STATE);
