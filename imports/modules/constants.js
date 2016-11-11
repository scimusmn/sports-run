export default class Constants {};

// Time between sending signal
// to start race, and race
// actually starting.
Constants.PRE_RACE_DELAY = 10000;

// Time after sending signal
// that lane has finished,
// and race is actually restarting.
Constants.POST_RACE_DELAY = 10000;

// Race state enumeration
Constants.STATE_IDLE = 0;
Constants.STATE_PRE_RACE = 1;
Constants.STATE_RACING = 2;
Constants.STATE_POST_RACE = 3;

Constants.DEFAULT_RACE_STATE = {raceState: Constants.STATE_IDLE,
                                startTime:0,
                                lane1Started:false,
                                lane2Started:false,
                                lane1FalseStart:false,
                                lane2FalseStart:false,
                                lane1FinishTime:0,
                                lane2FinishTime:0, };

// Freeze all definitions so
// they cannot be changed.
Object.freeze(Constants);
