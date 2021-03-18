'use strict';

module.exports.formatMoney = (number, locale, currency) => {
  return number.toLocaleString(locale, { style: 'currency', currency });
}

module.exports.formatMoneyNoDecimals = (number, locale, currency) => {
  return module.exports.formatMoney(number, locale, currency).replace(/,[\d]*/, "");
}