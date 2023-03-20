const firebase = require('../../firebase.json');
const { writeFileSync } = require('fs');
const { join } = require('path');

const redirects = Object.entries({
  '/': '/en',
  '/work-with-us': 'https://docs.google.com/forms/d/e/1FAIpQLScM5-KKR05NjbBwLmiGxKGmE5hn_uZDyd9IznzL0IipZzA9uA/viewform?resourcekey=0-1j--HwT3iwGx3Bogp5WabQ',
}).map(([source, destination]) => ({
  source,
  destination,
  type: 301,
}));

firebase.hosting.redirects = redirects;

writeFileSync(join(__dirname, '../../firebase.json'), JSON.stringify(firebase, null, 2));
