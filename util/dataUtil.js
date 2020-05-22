/**
 * Este arquivo é responsavel por toda e qualquer tratativa de data. 
 * Atualmente usamos essas datas para salvar as conversas no banco de dados.
 */
const moment = require('moment-timezone');

let dateUtil = {};
var feed = {};

dateUtil.db = async () => {
    feed.timestamp = moment().unix();
    feed.monthReference = moment().format('YYYYMM');
    feed.dateformat = moment().format('YYYYMMDD');
    feed.datetimeStr = moment().format("DD/MM/YYYY HH:mm:ss");
  return feed
};

module.exports = dateUtil;