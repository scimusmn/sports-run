import Constants from '../../modules/constants';
import { Races } from '../../api/races';

let raceId;

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

    this.updateRaceState({raceState: Constants.STATE_RACING});

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

    if (lane1TimerRunning == false) return false;
    lane1TimerRunning = false;

    lane1FinishTime = Date.now();
    this.updateRaceState({lane1FinishTime});

    if (lane2TimerRunning == false) {
      this.resetForNextRace();
    } else {
      lane1TimerRunning = false;
    }

    return lane1FinishTime;

  },

  lane2Finish() {

    if (lane2TimerRunning == false) return false;
    lane2TimerRunning = false;

    lane2FinishTime = Date.now();
    this.updateRaceState({lane2FinishTime});

    if (lane1TimerRunning == false) {
      this.resetForNextRace();
    } else {
      lane2TimerRunning = false;
    }

    return lane2FinishTime;

  },

  resetForNextRace() {

    this.updateRaceState({raceState: Constants.STATE_POST_RACE});

    clearInterval(raceTicker);

    Meteor.setTimeout(() => {

      // Reset all attributes to default state
      lane1TimerRunning = false;
      lane2TimerRunning = false;
      this.updateRaceState({raceState: Constants.STATE_IDLE,
                            lane1Ready:false,
                            lane2Ready:false,
                            startTime:0,
                            lane1FinishTime:0,
                            lane2FinishTime:0, });

    }, Constants.POST_RACE_DELAY);

  },

  initiateNewRace(msg) {

    // Wait for standard time
    console.log('initiateNewRace:', msg);
    this.updateRaceState({raceState: Constants.STATE_PRE_RACE});

    Meteor.setTimeout(() => {

      console.log('GO!');
      this.updateRaceState({startTime: this.startTimer()});

    }, Constants.PRE_RACE_DELAY);

  },

  isState(stateId) {

    if (Races.findOne().raceState == stateId) {
      return true;
    } else {
      return false;
    }

  },

  updateRaceState(stateObj) {

    if (!raceId) raceId = Races.findOne()._id;
    Races.update(raceId, {$set: stateObj});

  },

};
