"use strict";

const config = require("./config");
const { sendEmail } = require("./components/email");
const { putObjectToS3, getObjectFromS3, deleteObjectFromS3 } = require("./components/s3");
const { adsScrape, adsCompare, adsEmailBodyFormat, adScrape } = require("./components/ads");
//const fs = require("fs");
//const YAML = require("yaml");
//const sls = YAML.parse(fs.readFileSync("./serverless.yml", "utf8"));

const subscribersFileName = "subscribers.json";
const adsFileName = "ads.json";

module.exports.crawl = async (event, context, callback) => {
  console.log("crawl endpoint called");

  const searchParameters = { // TODO: get from subscription service...
    baseUrl: "https://www.immobiliare.it/vendita-case",
    city: "torino",
    zones: [
      //{ 172: "Centro" },
      //{ 173: "Crocetta, San Secondo" },
      //{ 174: "San Salvario" },
      { 175: "Cavoretto, Gran Madre" },
      { 176: "Colle della Maddalena, Superga" },
      //{ 177: "Campidoglio, San Donato, Cit Turin" },
      //{ 178: "Borgo San Paolo, Cenisia" },
      //{ 181: "Lingotto, Nizza Millefonti" },
      //{ 183: "Pozzo Strada, Parella" },
      { 184: "Aurora, Barriera di Milano, Rebaudengo" },
      //{ 185: "Regio Parco, Vanchiglia, Vanchiglietta" },
      //{ 187: "Barriera di Lanzo, Falchera, arca, Bettolla" },
      //{ 189: "Borgo Vittoria, Parco Dora" },
      //{ 191: "Le Vallette, Lucento, Madonna di Campagna" },
      //{ 194: "Santa Rita, Mirafiorni Nord" },
      //{ 195: "Mirafiori Sud" },
      { 10407: "Madonna del Pilone, Sassi" },
    ],
    criterion: "rilevanza",
    minPrice: 280000,
    maxPrice: 400000,
    minSurfaceMq: 80,
    maxSurfaceMq: 140,
    blacklist: {
      agencyes: [
        //{ urlPattern: "\/plan-buy-broker\/$" }, // url not present in main listing
        //{ logoPattern: "/670674587.|/713419966." },
        { logoAltPattern: "PLAN BUY®" }, 
      ],
    },
  };
  const emailSubject = `Nuove offerte immobiliari`;

  console.log("searchParameters:", searchParameters);

  console.log("loading old ads from s3");
  const adsOld = await getObjectFromS3(adsFileName);
  if (adsOld.length >= 1 && config.forceANewAd) { // force one ad to be new
    const n = Math.floor(Math.random() * (adsOld.length - 1));
    adsOld[n].url += "-invalidated"; // invalidate one ad, to force it as new and send email
  }
  console.log("# ads old:", adsOld.length);

  console.log("scraping new ads");
  const adsNew = await adsScrape(searchParameters);
  console.log("# ads new:", adsNew.length);

  const news = adsCompare(adsOld, adsNew);
  console.log("new ads:", news.length);

  if (news.length) { // send email to inform of news
    await Promise.all(news.map(async n => await adScrape(n)));
    const result = await sendEmail(
      config.emailRecipientAddresses, // recipient email
      config.emailSenderAddress, // sender email
      emailSubject, // subject
      adsEmailBodyFormat(news, searchParameters), // html body
      null, // text body
    );
    if (result.success) { // email sent successfully
      console.log("crawl sendMail returned success");
      await putObjectToS3(adsFileName, adsNew); // save ads new to s3
      if (callback) callback(null, news); // TODO: used only for non-async calls ?
    } else {
      if (callback) callback(result.error, news); // TODO: used only for non-async calls ?
    }
  } else { // no new ads; save ads new to s3 nonetheless, since some ads possibly have been removed
    await putObjectToS3(adsFileName, adsNew); // save ads new to s3
  }

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: `success`,
        input: event,
        news,
      },
      null,
      2
    ),
  };
};

module.exports.home = async (event) => {
  const fs = require("fs");
  const file = "./website/home.html";
  const encoding = "utf-8";

  console.log("home event:", event);
  try {
    const html = fs.readFileSync(file, { encoding });
    //console.log("read data from file:", html);
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/html",
      },
      body: html
    };
  } catch (err) {
    //console.log("error reading file html:", err);
    return {
      statusCode: 400,
      headers: {
        "Content-Type": "text/html",
      },
      body: `Error: ${err}`,
    };
  }
}

module.exports.reset = async (event) => {
  console.log("reset event:", event);

  await deleteObjectFromS3(adsFileName);

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: `You did successfully reset ${config.service} service`,
        input: event,
      },
      null,
      2
    ),
  };
};

module.exports.subscribe = async (event) => {
  console.log("subscribe event:", event);

  // TODO !

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: `You did successfully subscribe to ${config.service} service`,
        input: event,
      },
      null,
      2
    ),
  };
};

module.exports.unsubscribe = async (event) => {
  const fs = require("fs");
  const file = "./website/unsubscribe.html";
  const encoding = "utf-8";

  console.log("unsubscribe event:", event);
  try {
    const html = fs.readFileSync(file, { encoding });
    //console.log("read data from file:", html);
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/html",
      },
      body: html
    };
  } catch (err) {
    //console.log("error reading file html:", err);
    return {
      statusCode: 400,
      headers: {
        "Content-Type": "text/html",
      },
      body: `Error: ${err}`,
    };
  }
}

module.exports.actionUnsubscribe = async (event) => {

  try {
    const subscribers = await getObjectFromS3(subscribersFileName); // get subscribers from s3
    subscribers.splice(-1, 1); // TODO... removing last element
    await putObjectToS3(subscribersFileName, subscribers); // save subscribers to s3
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          result: "OK",
          message: `You did successfully unsubscribe from ${config.service} service`,
          input: event,
        },
        null,
        2
      ),
    };
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify(
        {
          result: "ERROR",
          message: `You could not be unsubscribed from ${config.service} service`,
          input: event,
        },
        null,
        2
      ),
    };
  }
};