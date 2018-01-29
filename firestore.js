
const admin = require('firebase-admin');

var serviceAccount = require("./unity3d-5c4ffb2c8348.json");

admin.initializeApp({
 credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();

var docRef = db.collection('responses').doc('123');

var setResponse = docRef.set({
   responseId: '123',
   status: 'SUCCESS-5'
});