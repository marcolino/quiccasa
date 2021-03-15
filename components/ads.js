'use strict';

const request = require("axios");
const cheerio = require("cheerio");
const config = require("../config");
const { formatMoney } = require("./utils");

module.exports.adsScrape = async (searchParameters) => {
  const ads = [];
  // TODO: build url from search parameters
  let url = "https://www.immobiliare.it/vendita-case/torino/?criterio=rilevanza&prezzoMinimo=280000&prezzoMassimo=400000&superficieMinima=80&superficieMassima=140&idMZona[]=175&idMZona[]=176&idMZona[]=184&idMZona[]=10407";
  //let n = 0;
  do {
    let response = null;
    try {
      response = await request(url);
      //console.log('response.data:', response.data);
    } catch(err) {
      console.error(`error fetching data from url ${url}:`, err);
      return []; // TODO: review error handling...
    }

    const $ = cheerio.load(response.data);
    const elements = $("li.listing-item.js-row-detail");

    // iterate over the ads
    elements.each((index, el) => { // process the single ad
      const ad = {};
      const elTitle = $(el).find("p.titolo > a")[0];
      ad.url = $(elTitle).attr("href").trim();
      ad.title = $(elTitle).attr("title").trim();
      const titleArray = ad.title.split(",");
      if (titleArray.length > 1) {
        ad.titleStrict = titleArray.slice(0, -2).join(",").trim() || titleArray.slice(0, -1).join(",").trim();
        ad.zone = titleArray[titleArray.length-2].trim();
        ad.city = titleArray[titleArray.length-1].trim();
      } else {
        ad.titleStrict = ad.title;
        ad.zone = "";
        ad.city = "";
      }

      const elShowcase = $(el).find("div.showcase")[0];
      const dataImages = $(elShowcase).attr("data-images");
      if (dataImages) { // data-images in showcase
        ad.image = `https://pic.im-cdn.it/image/${dataImages.split(",")[0]}/xxs-c.jpg`;
      } else { // src or data-src in img.no-image
        const elImage = $(el).find("img.no-image");
        ad.image = $(elImage).attr("data-src") || $(elImage).attr("src");
      }

      const elPrice = $(el).find("li.lif__item.lif__pricing");
      const elPriceDiv = $(el).find("li.lif__item.lif__pricing > div").first();
      ad.price = (elPriceDiv.text() || elPrice.text()).trim(); // order matters

      const info = $(el).find("li.lif__item");
      info.each((i, el1) => {
        const type = $(el1).find("div.lif__text.lif--muted").text().trim();
        switch (type) {
          case "locali":
            ad.rooms = $(el1).text().replace(/locali/, "").trim();
            break;
          case "superficie":
            ad.surface = $(el1).text().replace(/m2superficie/, "").trim();
            break;
          case "bagni":
            ad.bathrooms = $(el1).text().replace(/bagni/, "").trim();
            break;
          case "piano":
            ad.floor = $(el1).text().replace(/piano/, "").trim();
            break;
          case "immobile":
            //ad.house = $(el1).find("span").text().trim();
            break;
          default:
            if (type) {
              console.warn("unforeseen ad type:", type);
            }
            break;
        }
      });
      //const elAgencyUrl = $(el).find("div.im-lead__reference > a");
      //ad.agencyUrl = $(elAgencyUrl).attr("href");

      // const elAgencyLogo = $(el).find("img.logo-agency");
      // ad.agencyLogo = $(elAgencyLogo).attr("data-src");

      const elAgencyAltLogo = $(el).find("img.logo-agency");
      ad.agencyAltLogo = $(elAgencyAltLogo).attr("alt");

      //++n;

      const accept =
        // !searchParameters.blacklist.agencyes.some(a => {
        //   const re = new RegExp(a.urlPattern);
        //   return ad.url.match(re);
        // }) &&
        // !searchParameters.blacklist.agencyes.some(a => {
        //   const re = new RegExp(a.logoPattern);
        //   return ad.agencyLogo && ad.agencyLogo.match(re);
        // })
        !searchParameters.blacklist.agencyes.some(a => {
          const re = new RegExp(a.logoAltPattern);
          return ad.agencyAltLogo && ad.agencyAltLogo.match(re);
        })
      ;

      if (accept) ads.push(ad);
    });

    const elNextPage = $("a[title='Pagina successiva']");
    if (elNextPage) { // next page link found
      url = $(elNextPage).attr('href');
    } else { // no next page link found
      url = null; // finish pages loop
    }
  } while (url);

  return ads;
};

/**
 * Compare old and new lists of ads
 */
module.exports.adsCompare = (o, n) => {
  function comparer(other, key) {
    return current => {
      return other.filter(other => {
        return other[key] === current[key]
      }).length === 0;
    }
  }

  //const onlyInO = o.filter(comparer(n)); // only in old array elements (removed from listings)
  const onlyInN = n.filter(comparer(o, 'url')); // only in new array elements (added to listings)

  return onlyInN;
};

module.exports.adsEmailBodyFormat = (adsList, searchParameters) => {
  const one = adsList.length <= 1;
  // TODO: report search criteria name and contents too

  const head = `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="x-apple-disable-message-reformatting">
    <title></title>
    <!--[if mso]>
    <style>
      table {border-collapse:collapse;border-spacing:0;border:none;margin:0;}
      div, td {padding:0;}
      div {margin:0 !important;}
    </style>
    <noscript>
      <xml>
        <o:OfficeDocumentSettings>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
    </noscript>
    <![endif]-->
    <style>
      table, td, div, h1, p {
        font-family: Helvetica, Verdana, Arial, sans-serif;
      }
      @media screen and (max-width: 530px) {
        .unsub {
          display: block;
          padding: 8px;
          margin-top: 14px;
          border-radius: 6px;
          background-color: #555555;
          text-decoration: none !important;
          font-weight: bold;
        }
        .col-lge {
          max-width: 100% !important;
        }
      }
      @media screen and (min-width: 531px) {
        .col-sml {
          max-width: 45% !important;
        }
        .col-lge {
          max-width: 55% !important;
        }
      }
    </style>
  </head>
  <body style="margin:0;padding:0;word-spacing:normal;background-color:#939297;">
    <div role="article" aria-roledescription="email" lang="en" style="text-size-adjust:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;background-color:#ffffff;old-background-color:#939297;">
      <table role="presentation" style="width:100%;border:none;border-spacing:0;">
        <tr>
          <td align="center" style="padding:0;">
            <!--[if mso]>
            <table role="presentation" align="center" style="width:600px;"><tr><td>
            <![endif]-->
            <table role="presentation" style="width:94%;max-width:800px;border:none;border-spacing:0;text-align:left;font-family:Helvetica,Verdana,Arial,sans-serif;font-size:16px;line-height:22px;color:#363636;">
              <!--
              <tr>
                <td style="padding:40px 30px 30px 30px;text-align:center;font-size:24px;font-weight:bold;">
                  <a href="http://www.example.com/" style="text-decoration:none;"><img src="https://assets.codepen.io/210284/logo.png" width="165" alt="Logo" style="width:80%;max-width:165px;height:auto;border:none;text-decoration:none;color:#ffffff;"></a>
                </td>
              </tr>
              -->
              <tr>
                <td style="padding:30px;background-color:#ffffff;">
                  <p style="margin-top:0;margin-bottom:16px;text-decoration:none;">
                    ${adsList.length} nuov${one ? 'o' : 'i'} annunc${one ? 'io' : 'i'} appena pubblicat${one ? 'o' : 'i'} su <b>immobiliare.it</b>
                  </p>
                  <!--<p style="margin:0;">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempus adipiscing felis, sit amet blandit ipsum volutpat sed. Morbi porttitor, <a href="http://www.example.com/" style="color:#e50d70;text-decoration:underline;">eget accumsan dictum</a>, nisi libero ultricies ipsum, in posuere mauris neque at erat.
                  </p>-->
                </td>
              </tr>

              <!-- start new ads loop here -->
  `;
  /* 395 => 495, 145 => 245, 115 => 215 */
  const body = adsList.map(ad => `
              <tr>
                <td style="padding:35px 30px 11px 30px;font-size:0;background-color:#ffffff;border-bottom:1px solid #f0f0f5;border-color:rgba(201,201,207,.35);">
                  <!--[if mso]>
                  <table role="presentation" width="100%"><tr><td style="width:245px;" align="left" valign="top">
                  <![endif]-->
                  <div class="col-sml" style="display:inline-block;width:100%;max-width:245px;vertical-align:top;text-align:left;font-family:Helvetica,Verdana,Arial,sans-serif;font-size:14px;color:#363636;">
                    <a href="${ad.url}" style="text-decoration:none;">
                      <img src="${ad.image}" width="215" alt="" style="width:90%;max-width:215px;margin-bottom:20px;">
                    </a>
                  </div>
                  <!--[if mso]>
                  </td><td style="width:495px;padding-bottom:20px;" valign="top">
                  <![endif]-->
                  <div class="col-lge" style="display:inline-block;width:100%;max-width:495px;vertical-align:top;padding-bottom:20px;font-family:Helvetica,Verdana,Arial,sans-serif;font-size:16px;line-height:22px;color:#363636;">
                    <p style="font-size:18px;margin-top:0;margin-bottom:4px;">
                      ${ad.titleStrict}${ad.city ? (", " + ad.city) : ""}
                    </p>
                    <p style="font-size:14px;margin-top:0;margin-bottom:4px;">
                      ${ad.zone/* || "&nbsp;"*/}
                    </p>
                    <p style="font-size:18px;margin-top:0;margin-bottom:6px;">
                      ${ad.price}
                    </p>
                    <p style="font-size:14px;margin-top:0;margin-bottom:6px;">
                      ${ad.surface} m² |
                      ${ad.rooms} local${ad.rooms <= 1 ? 'e' : 'i'}
                      ${ad.bathrooms ? " | " + ad.bathrooms + " bagn" + (ad.bathrooms <= 1 ? "o" : "i") : ""}
                      ${ad.floor ? " | " + "piano " + ad.floor : ""}
                    </p>
                    <p style="margin:0;margin-top:12px">
                      <a href="${ad.url}" style="background: #c21f00; text-decoration: none; padding: 10px 25px; color: #ffffff; border-radius: 4px; display:inline-block; mso-padding-alt:0;text-underline-color:#c21f00">
                        <!--[if mso]><i style="letter-spacing: 25px;mso-font-width:-100%;mso-text-raise:20pt">&nbsp;</i><![endif]-->
                        <span style="mso-text-raise:10pt;font-weight:bold;">
                          🔍 Vedi i dettagli
                        </span>
                        <!--[if mso]><i style="letter-spacing: 25px;mso-font-width:-100%">&nbsp;</i><![endif]-->
                      </a>
                    </p>
                  </div>
                  <!--[if mso]>
                  </td></tr></table>
                  <![endif]-->
                </td>
              </tr>
  `).join('');
  const foot = `
              <!-- end new ads loop here -->
              <tr>
                <td style="padding:30px;background-color:#ffffff;">
                  <p style="margin-top:0;margin-bottom:16px;text-decoration:none;">
                    La tua ricerca: ${adsDescribeSearch(searchParameters)}.
                  </p>
                </td>
              </tr>
              <tr>
                <td style="padding:30px;text-align:center;font-size:12px;background-color:#333333;color:#bbbbbb;">
                  <!--
                  <p style="margin:0 0 8px 0;">
                    <a href="http://www.facebook.com/" style="text-decoration:none;">
                      <img src="https://assets.codepen.io/210284/facebook_1.png" width="40" height="40" alt="f" style="display:inline-block;color:#cccccc;">
                    </a>
                    <a href="http://www.twitter.com/" style="text-decoration:none;">
                      <img src="https://assets.codepen.io/210284/twitter_1.png" width="40" height="40" alt="t" style="display:inline-block;color:#cccccc;">
                    </a>
                  </p>
                  -->
                  <p style="margin:0;font-size:14px;line-height:20px;">
                    ${config.companyTitle}
                    <br>
                    <a class="unsub" href="${config.enpoints.unsubscribe}" style="color:#cccccc;text-decoration:underline;">
                      Annulla la sottoscrizione
                    </a>
                  </p>
                </td>
              </tr>
            </table>
            <!--[if mso]>
            </td></tr></table>
            <![endif]-->
          </td>
        </tr>
      </table>
    </div>
  </body>
</html>
  `;
  return head + body + foot;
};

const adsDescribeSearch = (searchParameters) => {
  let description = ``;
  switch (true) {
    case /vendita-case/.test(searchParameters.baseUrl):
      description += `Case in vendita`;
      break;
    case /affitto-case/.test(searchParameters.baseUrl):
      description += `Case in affitto`;
      break;
    default:
      description += `tipologia di ricerca sconosciuta`;
    }
    description += ` ${searchParameters.city ? "a " + searchParameters.city : "in città sconosciuta"}`;
    description += ` ${searchParameters.zones.length <= 0 ? "in zona sconosciuta" : (searchParameters.zones.length === 1 ? "nella zona" : "nelle zone")} ${searchParameters.zones.map(zid => zid[Object.keys(zid)[0]]).join("; ").replace(/; $/, "").trim()}`;
    description += `, da ${formatMoney(searchParameters.minPrice, config.locale, config.currency).replace(/,.*/, "")} a ${formatMoney(searchParameters.maxPrice, config.locale, config.currency).replace(/,.*/, "")}`;
    description += `, da ${searchParameters.minSurfaceMq} m² a ${searchParameters.maxSurfaceMq} m²`;
    description += `, con un criterio di ${searchParameters.criterion}`;
    return description;
}