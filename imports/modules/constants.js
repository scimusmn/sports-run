export default class Constants {};


// Time between sending signal
// to start race, and race
// actually starting.
Constants.PRE_RACE_DELAY = 5000;

// Time after sending signal
// that lane has finished,
// and race is actually restarting.
Constants.POST_RACE_DELAY = 12000;

// Race state enumeration
Constants.STATE_IDLE = 0;
Constants.STATE_PRE_RACE = 1;
Constants.STATE_RACING = 2;
Constants.STATE_POST_RACE = 3;

// Freeze all definitions so
// they cannot be changed.
Object.freeze(Constants);
