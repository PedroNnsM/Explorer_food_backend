const admin = require('firebase-admin');

const serviceAccount = require('./path/to/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'seu-bucket-do-firebase.appspot.com'  // Substitua pelo seu bucket do Firebase
});

const storage = admin.storage();

module.exports = storage;