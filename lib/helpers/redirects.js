const firebase = require('../../firebase.json');
const redirects = require('../../redirects.json');
const { writeFileSync } = require('fs');
const { join } = require('path');

firebase.hosting.redirects = Object.entries(redirects).map(([source, destination]) => ({
  source,
  destination,
  type: 301,
}));

writeFileSync(join(__dirname, '../../firebase.json'), JSON.stringify(firebase, null, 2));
