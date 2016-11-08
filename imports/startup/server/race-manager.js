import Constants from '../../modules/constants';
import { Races } from '../../api/races';

let raceId;
let lane1TimerRunning = false;
let lane2TimerRunning = false;
let raceTicker = {};

export default {

  startTimer() {

    let startTime = Date.now();

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

      this.updateRaceState({lane1FinishTime:Date.now()});

    }

    if (lane2TimerRunning == true) {

      this.updateRaceState({lane2FinishTime:Date.now()});

    }

  },

  lane1Finish() {

    if (lane1TimerRunning == false) return false;
    lane1TimerRunning = false;

    this.updateRaceState({lane1FinishTime:Date.now()});

    if (lane2TimerRunning == false) {
      this.postRaceSequence();
    } else {
      lane1TimerRunning = false;
    }

    return true;

  },

  lane2Finish() {

    if (lane2TimerRunning == false) return false;
    lane2TimerRunning = false;

    this.updateRaceState({lane2FinishTime:Date.now()});

    if (lane1TimerRunning == false) {
      this.postRaceSequence();
    } else {
      lane2TimerRunning = false;
    }

    return true;

  },

  postRaceSequence() {

    this.updateRaceState({raceState: Constants.STATE_POST_RACE});

    clearInterval(raceTicker);

    Meteor.setTimeout(() => {

      this.resetForNextRace();

    }, Constants.POST_RACE_DELAY);

  },

  resetForNextRace() {

    // Reset all attributes to default state
    lane1TimerRunning = false;
    lane2TimerRunning = false;

    this.updateRaceState(Constants.DEFAULT_RACE_STATE);

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
