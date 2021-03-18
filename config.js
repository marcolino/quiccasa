module.exports = {
  service: process.env.service,
  bucket: process.env.bucket,
  region: process.env.region,
  locale: "it-IT",
  currency: "EUR",
  companyTitle: "Sistemi Solari ®",
  emailSenderAddress: "sistemisolari.quiccasa@gmail.com",
  emailRecipientAddresses: [ "marcosolari@gmail.com", "enrica.valenzano@gmail.com" ],
//emailRecipientAddresses: [ "marcosolari@gmail.com" ],
  endpoint: "https://gfhwsqbvf1.execute-api.eu-west-1.amazonaws.com/dev/",
  // endpoints: {
  //   crawl: "https://gfhwsqbvf1.execute-api.eu-west-1.amazonaws.com/dev/crawl", // TODO: to be read automatically from aws...
  //   subscribe: "https://gfhwsqbvf1.execute-api.eu-west-1.amazonaws.com/dev/subscribe", // TODO: to be read automatically from aws...
  //   unsubscribe: "https://gfhwsqbvf1.execute-api.eu-west-1.amazonaws.com/dev/unsubscribe", // TODO: to be read automatically from aws...
  //   reset: "https://gfhwsqbvf1.execute-api.eu-west-1.amazonaws.com/dev/reset", // TODO: to be read automatically from aws...
  // }
  forceANewAd: false, // force one ad to be new, and then force to send an email
}; 