/**
* Resolume Arena OSC Communication
*/

import osc from 'osc-min';
import dgram from 'dgram';

const udp = dgram.createSocket('udp4');

const oscPort = Meteor.settings.private.arenaOscPort;
if (!oscPort) console.log('WARNING - No OSC Port found in settings.json');

const networkAddress = Meteor.settings.private.arenaNetworkAddress;
if (!networkAddress) console.log('WARNING - No network address found in settings.json');

function sendOSC(address, val) {

  if (val != 0 && !val) val = 'NA';

  var buf = osc.toBuffer({
    address: address,
    args: [val],
  });

  return udp.send(buf, 0, buf.length, oscPort, networkAddress);

}

setInitialState();

function setInitialState() {

  // Start on idle screen
  toggleLayers([1], [2,3,4,5,6,7,8]);

};

/**
 * Toggle Layers
 * First array shows
 * Second array hides
 */
function toggleLayers(shows, hides) {

  // Show and play these layers
  for (var i = 0; i < shows.length; i++) {
    sendOSC('/layer' + shows[i] + '/bypassed', 0);
    sendOSC('/layer' + shows[i] + '/clip1/connect', 1);
  };

  // Hide these layers
  for (var i = 0; i < hides.length; i++) {
    sendOSC('/layer' + hides[i] + '/bypassed', 1);
  };

};

/**
 * Fade Out
 * Tell Arena to fade
 * out entire composition.
 * Note: For this to work,
 * the Fade Out transform in
 * Arena's composition must be
 * set to timeline mode.
 */
let fadingOut = false;
function fadeOut() {
  if (fadingOut == false) {
    sendOSC('/composition/video/fadeout/direction', 0);
    fadingOut = true;
  }
}

/**
 * Fade In
 * Tell Arena to fade
 * in entire composition.
 */
function fadeIn() {
  if (fadingOut == true) {
    sendOSC('/composition/video/fadeout/direction', 1);
    fadingOut = false;
  }
}

/**
 * Arena Control
 * Transpose incoming control
 * messages into Arena actions
 */
let fadeTimer = {};
export function arenaControl(data) {

  console.log('arenaControl: ' + data.msg);

  // Fade out arena composition
  // before showing new layer
  fadeOut();

  clearTimeout(fadeTimer);
  fadeTimer = Meteor.setTimeout(() => {

    switch (data.msg) {
      case 'idle': // Standby mode
        toggleLayers([1], [2,3,4,5,6,7,8]);
        break;
      case 'race-press': // Soccer
        toggleLayers([2], [1,3,4,5,6,7,8]);
        break;
      case 'race-wiggins': // Basketball
        toggleLayers([3], [1,2,4,5,6,7,8]);
        break;
      case 'race-tc': // Mascot
        toggleLayers([4], [1,2,3,5,6,7,8]);
        break;
      case 'race-haula': // Hockey
        toggleLayers([5], [1,2,3,4,6,7,8]);
        break;
      case 'race-braun': // Racer
        toggleLayers([6], [1,2,3,4,5,7,8]);
        break;
      case 'race-trex': // Dinosaur
        toggleLayers([7], [1,2,3,4,5,6,8]);
        break;
      case 'race-thielen': // Football
        toggleLayers([8], [1,2,3,4,5,6,7]);
        break;
      default:
        console.log('arenaControl: data.msg ' + data.msg + ' not recognized');
    }

    // Fade in arena composition
    // now that layers are switched
    fadeIn();

  }, 500);

}
