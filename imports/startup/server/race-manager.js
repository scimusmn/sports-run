import Constants from '../../modules/constants';
import { Races } from '../../api/races';

let raceId;
let raceState = 0;

let startTime = 0;
let lane1FinishTime = 0;
let lane2FinishTime = 0;
let lane1TimerRunning = false;
let lane2TimerRunning = false;

let raceTicker = {};

export default {

  startTimer() {

    startTime = Date.now();
    lane1TimerRunning = true;
    lane2TimerRunning = true;

    // Start ticker that
    // updates times
    clearInterval(raceTicker);
    raceTicker = Meteor.setInterval(() => {
      this.timerUpdate();
    }, 60);

    return startTime;

  },

  timerUpdate() {

    if (lane1TimerRunning == true) {

      lane1FinishTime = Date.now();
      this.updateRaceState({lane1FinishTime});

    }

    if (lane2TimerRunning == true) {

      lane2FinishTime = Date.now();
      this.updateRaceState({lane2FinishTime});

    }

  },

  lane1Finish() {

    lane1FinishTime = Date.now();
    lane1TimerRunning = false;
    this.updateRaceState({lane1FinishTime});

    if (lane2TimerRunning == false) {
      this.resetForNextRace();
    } else {
      lane1TimerRunning = false;
    }

    return lane1FinishTime;

  },

  lane2Finish() {

    lane2FinishTime = Date.now();
    lane2TimerRunning = false;
    this.updateRaceState({lane2FinishTime});

    if (lane1TimerRunning == false) {
      this.resetForNextRace();
    } else {
      lane2TimerRunning = false;
    }

    return lane2FinishTime;

  },

  resetForNextRace() {

    lane1TimerRunning = false;
    lane2TimerRunning = false;

    clearInterval(raceTicker);

    Meteor.setTimeout(() => {

      raceState = Constants.STATE_POST_RACE;
      this.updateRaceState({lane1Ready:false, lane2Ready:false });

    }, Constants.POST_RACE_DELAY);

  },

  initiateNewRace(msg) {

    // Wait for standard time
    console.log('initiateNewRace:', msg);
    raceState = Constants.STATE_PRE_RACE;

    Meteor.setTimeout(() => {

      console.log('Go!');
      this.updateRaceState({startTime: this.startTimer()});

    }, Constants.PRE_RACE_DELAY);

  },

  updateRaceState(stateObj) {

    if (!raceId) raceId = Races.findOne()._id;
    Races.update(raceId, {$set: stateObj});

  },

};
