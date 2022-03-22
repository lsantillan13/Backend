const admin  = require('firebase-admin');

const serviceAccount = require(
  './coderhouse-30a6a-firebase-adminsdk-xplhe-83b69e2195.json'
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://coderhouse-30a6a.firebaseapp.com/'
});

console.log('Connected succesfully to Firebase');

module.exports = admin;