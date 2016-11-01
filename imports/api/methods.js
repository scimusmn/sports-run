import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { arenaControl } from '../startup/server/media-controller';
import { startTimer, lane1Finish, lane2Finish } from '../startup/server/race-timer';
import { Races } from './races';

Meteor.methods({

  arenaUpdate(data) {

    check(data, {

      msg: String,

    });

    if (data.msg.substring(0, 4) == 'race') {
      // New race initiated
      initiateNewRace(data.msg);
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
        updateRaceState({lane1Ready:true});
        break;
      case 'ln2_ready':
        updateRaceState({lane2Ready:true});
        break;
      case 'ln1_finish':
        updateRaceState({lane1FinishTime:lane1Finish()});
        break;
      case 'ln2_finish':
        updateRaceState({lane2FinishTime:lane2Finish()});
        break;
      default:
        console.log('beamBreak: data.msg ' + data.msg + ' not recognized');
    }

    console.log('media-methods. beam-break:', data.msg);
    return true;

  },

});

// Time between sending signal
// to start race, and race
// actually starting.
const preRaceDelay = 5000;

let raceId;
let raceState = 0;

// Race state enumeration
const STATE_IDLE = 0;
const STATE_PRE_RACE = 1;
const STATE_RACING = 2;
const STATE_POST_RACE = 3;

function initiateNewRace(msg) {

  // Wait for standard time
  console.log('initiateNewRace:', msg);
  raceState = STATE_PRE_RACE;

  Meteor.setTimeout(function() {

    console.log('Go!');
    updateRaceState({startTime: startTimer()});

  }, preRaceDelay);

}

function resetForNextRace() {

  console.log('resetForNextRace');
  raceState = STATE_POST_RACE;

  updateRaceState({lane1Ready:false, lane2Ready:false });

}

function updateRaceState(stateObj) {
  if (!raceId) raceId = Races.findOne()._id;
  Races.update(raceId, {$set: stateObj});
}
