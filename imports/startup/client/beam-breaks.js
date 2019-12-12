// Listen for incoming keystrokes
// across entire app.
document.addEventListener('keydown', function(event) {
  globalKeydown(event.which);
});

function globalKeydown(key) {

  switch (key) {
    case 81:

      // 'Q' Lane 1 ready
      OnBeamBreak('ln1_start');
      lockCheck('s1');
      break;
    case 65:

      // 'A' Lane 2 ready
      // One lane setup
      // Both lane sensors will register as Lane 1 occupancy
      OnBeamBreak('ln1_start');
      lockCheck('s1');
      //
      // Two lane setup
      // OnBeamBreak('ln2_start');
      // lockCheck('s2');
      //
      break;
    case 80:

      // 'P' Lane 1 finish
      OnBeamBreak('ln1_finish');
      lockCheck('f1');
      break;
    case 186:

      // ';' Lane 2 finish
      // One lane setup
      // Both lane sensors will register as Lane 1 finish
      OnBeamBreak('ln1_finish');
      lockCheck('f1');
      //
      // Two lane setup
      // OnBeamBreak('ln2_finish');
      // lockCheck('f2');
      //
      break;
  }

}

export function OnBeamBreak(msg) {

  Meteor.apply('beamBreak', [{

    msg: msg,

  },], {

    onResultReceived: (error, response) => {
      if (error) console.warn(error.reason);
      // if (response) console.log('beamBreak success:', response);

    },

  });

}

/*
 * Watchdog for extended key-repeats
 */

// Object used for counting
// keystrokes of any key.
let keyLocks = {};

// Number of keystrokes before
// considered a 'locked' key.
const strokeLimit = 30;

// Interval between checking
// for 'locked' keys.
const limitSecs = 30;

function lockCheck(key) {

  const now = Date.now();
  if (!keyLocks[key]) {
    keyLocks[key] = 0;
  }

  keyLocks[key]++;

}

function resetLockTimeouts() {

  let keysLocked = '';
  for (var key in keyLocks) {

    if (!keyLocks.hasOwnProperty(key)) continue;

    if (keyLocks[key] > strokeLimit) {

      keysLocked += key;

    }

  }

  Session.set('subtleAlertMessage', keysLocked);

  // Reset key counts
  keyLocks = {};

}

// Start watchdogging
setInterval(() => {
  resetLockTimeouts();
}, limitSecs * 1000);

