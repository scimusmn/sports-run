import Constants from '../../modules/constants';
import { Races } from '../../api/races';

let raceId;
let raceState = 0;

let startTime = 0;
let lane1FinishTime = 0;
let lane2FinishTime = 0;
let lane1TimerRunning = false;
let lane2TimerRunning = false;

export default {

  startTimer() {

    startTime = Date.now();
    lane1TimerRunning = true;
    lane2TimerRunning = true;

    return startTime;

  },

  lane1Finish() {

    lane1FinishTime = Date.now();
    lane1TimerRunning = false;
    this.updateRaceState({lane1FinishTime});

    return lane1FinishTime;

  },

  lane2Finish() {

    lane2FinishTime = Date.now();
    lane2TimerRunning = false;
    this.updateRaceState({lane2FinishTime});

    return lane2FinishTime;

  },

  resetForNextRace() {

    raceState = Constants.STATE_POST_RACE;
    this.updateRaceState({lane1Ready:false, lane2Ready:false });

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
