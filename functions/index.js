const functions = require("firebase-functions");
const {ApifyClient} = require("apify-client");

exports.PDFtoHTML = functions.https.onCall((data, context) => {
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