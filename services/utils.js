'use strict';

module.exports.formatMoney = (number, locale, currency) => {
  return number.toLocaleString(locale, { style: 'currency', currency });
}