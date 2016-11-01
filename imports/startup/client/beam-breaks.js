// Listen for incoming keystrokes
// across entire app.
document.addEventListener('keydown', function(event) {
  globalKeydown(event.which);
});

function globalKeydown(key) {

  switch (key) {
    case 81:

      // 'Q' Lane 1 ready
      OnBeamBreak('ln1_ready');
      break;
    case 65:

      // 'A' Lane 2 ready
      OnBeamBreak('ln2_ready');
      break;
    case 80:

      // 'P' Lane 1 finish
      OnBeamBreak('ln1_finish');
      break;
    case 186:

      // ';' Lane 2 finish
      OnBeamBreak('ln2_finish');
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
