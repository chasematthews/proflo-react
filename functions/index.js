const functions = require("firebase-functions");
const {ApifyClient} = require("apify-client");
const { getAuth } = require("firebase/auth");
const { initializeApp } = require('firebase-admin/app');

const admin = require("firebase-admin");
const serviceAccount = require("./proflo-d9ccc-firebase-adminsdk-bkwt4-8f5d63cc82.json");

const firebaseConfig = {
  apiKey: "AIzaSyAONOFkOok3qVDpVy9hu42OSlKUSB-XVT0",
  authDomain: "proflo-d9ccc.firebaseapp.com",
  projectId: "proflo-d9ccc",
  storageBucket: "proflo-d9ccc.appspot.com",
  messagingSenderId: "888727536000",
  appId: "1:888727536000:web:f1f229291220661a6c0165",
  measurementId: "G-9L9NCQC9T7"
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

exports.PDFtoHTML = functions.runWith({
  timeoutSeconds: 540
}).https.onCall((data, context) => {
  const URL = data.URL

  // Initialize the ApifyClient with API token
  const client = new ApifyClient({
    token: 'apify_api_2675Tt5WOw5rqfvhmjgnWtlfCEdaVc3Yw3ll',
  });

  // Prepare actor input
  const input = {
    "url": `${URL}`
  };

  return (async () => {
    // Run the actor and wait for it to finish
    const run = await client.actor("jancurn/pdf-to-html").call(input);

    return client.keyValueStore(run.defaultKeyValueStoreId).url+"/records/OUTPUT";
  })();
});

// exports.getUserUID = functions.https.onCall((data, context) => {

//   const email = data.email

//   return (async () => {
//     await admin.initializeApp({
//       credential: admin.credential.cert(serviceAccount)
//     });
//     const auth = await admin.auth().getUserByEmail(`${email}`)
//     console.log(auth)
//     return auth.uid
//   })
// });

exports.getUserUID = functions.https.onCall((data, context) => {
  const email = data.email;

  return (async () => {
    const UID = await (await admin.auth().getUserByEmail(`${email}`)).uid;
    // functions.logger.log(UID)
    return UID
    // return {
    //   uid: `${UID}`
    // }
  })();
})