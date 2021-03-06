export default class Constants {};

// Time between sending signal
// to start race, and race
// actually starting.
Constants.PRE_RACE_DELAY = 15540;

// Delay after final racer
// has crossed finish,
// until race restarts.
Constants.POST_RACE_DELAY = 7500;

// Time to wait before
// a no-start reset.
// (starts after PRE_RACE_DELAY)
Constants.START_LINE_TIMEOUT = 10000;

// Time to wait before
// a no-finish reset.
// (starts after START_LINE_TIMEOUT)
Constants.RACE_TIMEOUT = 7500;

// Time of inactivity
// before triggering
// attract loop state.
Constants.ATTRACT_DELAY = 120000; // 120000

// Race state enumeration
Constants.STATE_IDLE = 0;
Constants.STATE_PRE_RACE = 1;
Constants.STATE_RACING = 2;
Constants.STATE_POST_RACE = 3;
Constants.STATE_ATTRACT_LOOP = 4;

// Athlete time lookup
Constants.TIMES = { press:'2.26',
                    wiggins:'2.60',
                    tc:'3.82',
                    haula:'2.43',
                    braun:'1.98',
                    trex:'2.04',
                    thielen:'2.11',
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
                                preRaceTime:0,
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
