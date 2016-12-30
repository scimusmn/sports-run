import { Meteor } from 'meteor/meteor';
import Constants from '../../modules/constants';
import { Races } from '../../api/races';

let raceId;
let lane1TimerRunning = false;
let lane2TimerRunning = false;
let raceTicker = {};
let startTimeout = {};
let raceTimeout = {};
let raceInitTime = 0;

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

    // Catch instances of incomplete
    // or unstarted races.
    this.watchTimeouts();

    return startTime;

  },

  watchTimeouts() {

    // Start timeout timer
    // to watch for incomplete.
    clearTimeout(startTimeout);
    clearTimeout(raceTimeout);

    startTimeout = Meteor.setTimeout(() => {

      // Check if anyone has started the race.
      if (Races.findOne().lane1Started == true || Races.findOne().lane2Started == true) {

        // Someone has started race.
        // Wait for a finish
        raceTimeout = Meteor.setTimeout(() => {

          console.log('Timimg out. Someone did not finish race. Forcing finish.');
          this.lane1Finish();
          this.lane2Finish();

        }, Constants.RACE_TIMEOUT);

      } else {

        // No one has started race.
        console.log('Timing out. No one started the race.');
        this.resetForNextRace();

      }

    }, Constants.START_LINE_TIMEOUT);

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

    // Post final lane time
    this.updateRaceState({lane1FinishTime:Date.now()});

    // End race if not waiting on other lane.
    if (lane2TimerRunning == false || Races.findOne().lane2Started == false) {
      this.postRaceSequence();
    }

    // Catch racer that crosses
    // lanes mid-race if solo.
    if (Races.findOne().lane2Started == true && Races.findOne().lane1Started == false) {
      this.lane2Finish();
    }

    return true;

  },

  lane2Finish() {

    if (lane2TimerRunning == false) return false;
    lane2TimerRunning = false;

    // Post final lane time
    this.updateRaceState({lane2FinishTime:Date.now()});

    // End race if not waiting on other lane.
    if (lane1TimerRunning == false || Races.findOne().lane1Started == false) {
      this.postRaceSequence();
    }

    // Catch racer that crosses
    // lanes mid-race if solo.
    if (Races.findOne().lane1Started == true && Races.findOne().lane2Started == false) {
      this.lane1Finish();
    }

    return true;

  },

  postRaceSequence() {

    this.updateRaceState({raceState: Constants.STATE_POST_RACE});

    clearInterval(raceTicker);
    clearTimeout(startTimeout);
    clearTimeout(raceTimeout);

    Meteor.setTimeout(() => {

      this.resetForNextRace();

    }, Constants.POST_RACE_DELAY);

  },

  resetForNextRace() {

    // Reset all attributes to default state
    lane1TimerRunning = false;
    lane2TimerRunning = false;

    // Tell arena to go
    // back to standby layer
    Meteor.apply('arenaUpdate', [{
      msg: 'idle',
    },], {

      onResultReceived: (error, response) => {
        if (error) console.warn(error.reason);
        if (response) console.log('arenaUpdate success:', response);
      },

    });

    this.updateRaceState(Constants.DEFAULT_RACE_STATE);

  },

  initiateNewRace(msg) {

    // Wait for standard time
    console.log('initiateNewRace:', msg);
    const athlete = msg.replace('race-', '');

    this.updateRaceState({raceState: Constants.STATE_PRE_RACE, athlete:athlete});

    this.raceInitTime = Date.now();
    this.preRaceTick();

    // Pre race delay
    Meteor.setTimeout(() => {

      // Start race
      console.log('GO!');
      const startTime = this.startTimer();
      this.updateRaceState({startTime: startTime});

    }, Constants.PRE_RACE_DELAY);

  },

  preRaceTick() {

    // Update countdown
    // during prerace state.
    const preRaceTime = Date.now() - this.raceInitTime;
    this.updateRaceState({preRaceTime:preRaceTime});

    // Pre race delay
    Meteor.setTimeout(() => {

      if (this.isState(Constants.STATE_PRE_RACE)) {
        this.preRaceTick();
      }

    }, 100);

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

