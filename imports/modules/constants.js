export default class Constants {};

// Time between sending signal
// to start race, and race
// actually starting.
Constants.PRE_RACE_DELAY = 10000;

// Time after sending signal
// that lane has finished,
// and race is actually restarting.
Constants.POST_RACE_DELAY = 10000;

// Time to wait before
// a no-start reset.
// (PRE_RACE_DELAY + 10sec timeout)
Constants.START_LINE_TIMEOUT = 10000 + Constants.PRE_RACE_DELAY;

// Time to wait before
// a no-finish reset.
// (20sec wait, following START_LINE_TIMEOUT)
Constants.RACE_TIMEOUT = 20000;

// Race state enumeration
Constants.STATE_IDLE = 0;
Constants.STATE_PRE_RACE = 1;
Constants.STATE_RACING = 2;
Constants.STATE_POST_RACE = 3;

// Athlete time lookup
Constants.TIMES = { press:'00:00:05:25',
                    wiggins:'00:00:07:09',
                    tc:'00:00:08:55',
                    haula:'00:00:05:95',
                    braun:'00:00:07:25',
                    trex:'00:00:04:55',
                    thielen:'00:00:06:15',
                  };

// Athlete display name lookup
Constants.DISPLAY_NAMES = { press:'Christen Press',
                            wiggins:'Candice Wiggins',
                            tc:'TC Bear',
                            haula:'Erik Haula',
                            braun:'Mark Braun',
                            trex:'Tyrannosaurus Rex',
                            thielen:'Adam Thielen',
                          };

Constants.DEFAULT_RACE_STATE = {raceState: Constants.STATE_IDLE,
                                startTime:0,
                                athlete:'',
                                lane1Started:false,
                                lane2Started:false,
                                lane1FalseStart:false,
                                lane2FalseStart:false,
                                lane1FinishTime:0,
                                lane2FinishTime:0, };

// Freeze all definitions so
// they cannot be changed.
Object.freeze(Constants);
