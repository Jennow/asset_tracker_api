const Database = require('../db.js');
const axios = require('axios');
const db = new Database();

const UserassetsRepository = {
    async addUserasset(userasset, userid) {
        return await db.query(`
        INSERT INTO userassets (assetid, userid, amount, highlighted, sum, plattform) 
        VALUES (
            '${userasset.assetid}',
            ${userid},
            '${userasset.amount}',
            '${userasset.highlighted}',
            '${userasset.sum}',
            '${userasset.plattform}'
        )`);
    },
    async getUserassets(userId) {
        return await db.query(`SELECT ua.*, a.name, a.identifier, a.type, a.icon, a.subtype FROM userassets ua
                               LEFT JOIN assets a ON ua.assetid = a.id
                               WHERE ua.userid = '${userId}'`); 
    },
    async getSummary(userId) {
        // TODO: Calculate performance comparison
        return {
            sum: await this.getSum(userId),
            performanceLastMonth: -10,
            performanceLastYear: 2,
            sumsPerUserasset: await this.getSumsPerUserasset(userId),
        }
    },
    async getSum(userId) {
        const response = await db.query(`SELECT SUM(sum) AS sum
                               FROM userassets
                               WHERE userid = '${userId}'`); 
        return response[0]['sum'];
    },
    async getSumsPerUserasset(userId) {
        // TODO: calculate sum instead of saving it in database -> Calculate in Cronjob and update DB regularly?
        return await db.query(`SELECT a.name, a.identifier, a.type, ua.sum
                               FROM userassets ua
                               LEFT JOIN assets a ON ua.assetid = a.id
                               WHERE ua.userid = '${userId}'`); 
    },
    async getCoinCapHistory(asset) {
        const apiUrl  = 'https://api.coincap.io';
        let now       = new Date();
        let lastMonth = new Date();
        lastMonth.setMonth(now.getMonth() - 1);

        const url    = apiUrl + '/v2/assets/' 
          + asset.identifier +'/history?interval=d1&start='        
          + lastMonth.getTime() 
          + '&end=' + now.getTime();
    
        return await axios.get(url)
        .then((response) => {
            return response.data.data;
        });
    },
  /**
   * Takes the history values and multiplies them with the amount of the asset at the moment
   * @param history 
   * @param asset 
   * @returns Array<HistoryItem>
   */
   calculatePersonalHistoryForAsset(history, asset){
    let personalHistory = [];
    history.forEach(coinCapHistoryItem => {

      let historItemDate = new Date(coinCapHistoryItem.date);
      const lastValidCoinCapHistoryItem  = this.getLastValidHistoryItem(historItemDate, history);

      let amount = asset.amount;
      personalHistory.push({
        date: lastValidCoinCapHistoryItem.date,
        close: Math.round(lastValidCoinCapHistoryItem.priceUsd * amount * 100) / 100,
      })
    });
    return personalHistory;
  },
  /**
   * Get coincap history item that was valid at the passed date
   * @param date 
   * @param history 
   * @returns CoinCapHistoryItem
   */
 getLastValidHistoryItem(date, history= []){
    return history.reduce(function(prev, current) {
      let currentDate = new Date(current.date);
      let prevDate    = new Date(prev.date);
      return (currentDate > prevDate && currentDate <= date) ? current : prev;
    })
  },

  /**
   * Adds values of two histories to each other.
   * Histories have to have the same length
   * @param history1 
   * @param history2 
   */
  combineMultipleHistories(history1, history2 ) {
    for (let timeIndex = 0; timeIndex < history2.length; timeIndex++) {
      let historyItem = history2[timeIndex];
      if(!history1[timeIndex]) {
        history1[timeIndex] = {close: 0, date: historyItem.date}
      }
      history1[timeIndex].close += historyItem.close;
    }
    return history1;
  },
  async getAllCoincapHistories(assets) {
    let histories = []
    for (const asset of assets) {
        let history = await this.getCoinCapHistory(asset);
        histories.push(history);
    }
  
    return histories;
  },

  async getUserAssetHistory(userId) {
        let assets = await this.getUserassets(userId);

        var combinedHistory = [];
        let historyDataArray = await this.getAllCoincapHistories(assets);

        assets.forEach((asset, index) => {
          let histories = historyDataArray[index];
          let assetHistory = this.calculatePersonalHistoryForAsset(histories, asset)
          combinedHistory  = [{
              type: 'crypto',
              data: this.combineMultipleHistories(combinedHistory, assetHistory)
            }]
        });
    
        return combinedHistory;
    },
}

module.exports = UserassetsRepository;