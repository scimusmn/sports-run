var webshot = require('webshot');

const options = {
  screenSize: {
    width: 320, height: 480,
  }, renderDelay: 3000,
  shotSize: {
    width: 320, height: 'all',
  }, userAgent: 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_2 like Mac OS X; en-us)'
      + ' AppleWebKit/531.21.20 (KHTML, like Gecko) Mobile/7B298g',
};

const routes = [
  'selection',
  'finish',
];

for (var i = 0; i < routes.length; i++) {
  webshotForRoute(routes[i]);
}

function webshotForRoute(route) {

  webshot('http://localhost:3000/' + route, 'tmp/' + route + '.png', options, function(err) {
    console.log('webshot complete');
  });

}
