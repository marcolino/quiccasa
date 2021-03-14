module.exports = {
  serviceName: "quiccasa", // TODO: read from servless.yml (?)
  companyTitle: "® Sistemi Solari",
  region: "eu-west-1", // TODO: read from servless.yml (?)
  locale: "it-IT",
  currency: "EUR",
  emailSenderAddress: "sistemisolari.quiccasa@gmail.com",
  emailRecipientAddresses: [ "marcosolari@gmail.com", "enrica.valenzano@gmail.com" ],
  bucket: "quiccasa-bucket-dev",
  enpoints: {
    unsubscribe: "https://gfhwsqbvf1.execute-api.eu-west-1.amazonaws.com/dev/unsubscribe", // TODO: to be read automatically from aws...
  }
};