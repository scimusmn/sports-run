/**
* Resolume Arena OSC Communication
*/

import osc from 'osc-min';
import dgram from 'dgram';

const udp = dgram.createSocket('udp4');

const oscPort = 7770;

function sendOSC(address, val) {

  if (val != 0 && !val) val = 'NA';

  var buf = osc.toBuffer({
    address: address,
    args: [val],
  });

  return udp.send(buf, 0, buf.length, oscPort, 'localhost');

}

setInitialState();

function setInitialState() {

  // Ensure all video and camera streams are initialized
  // Set any initial settings that the project file doesn't store
  sendOSC('/layer1/clip1/connect', 1);
  sendOSC('/layer2/clip1/connect', 1);
  sendOSC('/layer3/clip1/connect', 1);
  sendOSC('/layer4/clip1/connect', 1);
  sendOSC('/layer5/clip1/connect', 1);

  // Start on idle screen
  toggleLayers([1], [2,3,4,5]);

};

/**
 * Toggle Layers
 * First array shows
 * Second array hides
 */
function toggleLayers(shows, hides) {

  // Show these layers
  for (var i = 0; i < shows.length; i++) {
    sendOSC('/layer' + shows[i] + '/bypassed', 0);
  };

  // Hide these layers
  for (var i = 0; i < hides.length; i++) {
    sendOSC('/layer' + hides[i] + '/bypassed', 1);
  };

};

/**
 * Arena Control
 * Transpose incoming control
 * messages into Arena actions
 */
export function arenaControl(data) {

  console.log('arenaControl: ' + data.msg);

  switch (data.msg) {
    case 'idle': // Standby mode
      toggleLayers([1], [2,3,4,5,6,7]);
      break;
    case 'race-press': // Soccer
      toggleLayers([2], [1,3,4,5,6,7]);
      break;
    case 'race-wiggins': // Basketball
      toggleLayers([3], [1,2,4,5,6,7]);
      break;
    case 'race-tc': // Mascot
      toggleLayers([4], [1,2,3,5,6,7]);
      break;
    case 'race-haula': // Hockey
      toggleLayers([5], [1,2,3,4,6,7]);
      break;
    case 'race-braun': // Racer
      toggleLayers([6], [1,2,3,4,5,7]);
      break;
    case 'race-trex': // Dinosaur
      toggleLayers([7], [1,2,3,4,5,6]);
      break;
    default:
      console.log('arenaControl: data.msg ' + data.msg + ' not recognized');
  }

}
