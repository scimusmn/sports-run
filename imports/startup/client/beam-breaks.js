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
      OnBeamBreak('ln2_start');
      lockCheck('s2');
      break;
    case 80:

      // 'P' Lane 1 finish
      OnBeamBreak('ln1_finish');
      lockCheck('f1');
      break;
    case 186:

      // ';' Lane 2 finish
      OnBeamBreak('ln2_finish');
      lockCheck('f2');
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
 * Watchdogs for keys being held down.
 */

let keyLocks = {};
const strokeLimit = 20;
const limitSecs = 30;

function lockCheck(key) {

  const now = Date.now();
  if (!keyLocks[key]) {
    keyLocks[key] = 0;
  }

  keyLocks[key]++;

}

function resetLockTimeouts() {

  let keyLocked = '';
  for (var key in keyLocks) {

    if (!keyLocks.hasOwnProperty(key)) continue;

    if (keyLocks[key] > strokeLimit) {

      keyLocked = key;
      break;

    }

  }

  Session.set('subtleAlertMessage', keyLocked);

  // Reset key counts
  keyLocks = {};

}

// Start watching
setInterval(() => {
  resetLockTimeouts();
}, limitSecs * 1000);

