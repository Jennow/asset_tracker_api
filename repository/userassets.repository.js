const Database = require('../db.js');
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
        return [];
    },
    async getUserAssetHistory(userId) {
        return [{"type":"crypto","data":[{"priceUsd":"3126.6468682949997338", "time":1648252800000,"date":"2022-03-26T00:00:00.000Z"},{"priceUsd":"3173.7064441151065666","time":1648339200000,"date":"2022-03-27T00:00:00.000Z"},{"priceUsd":"3347.8369958373795157","time":1648425600000,"date":"2022-03-28T00:00:00.000Z"},{"priceUsd":"3412.6941277910299839","time":1648512000000,"date":"2022-03-29T00:00:00.000Z"},{"priceUsd":"3394.5669347409777889","time":1648598400000,"date":"2022-03-30T00:00:00.000Z"},{"priceUsd":"3369.1557825359770851","time":1648684800000,"date":"2022-03-31T00:00:00.000Z"},{"priceUsd":"3349.3960983258115039","time":1648771200000,"date":"2022-04-01T00:00:00.000Z"},{"priceUsd":"3481.8871352829775008","time":1648857600000,"date":"2022-04-02T00:00:00.000Z"},{"priceUsd":"3495.1346158016343621","time":1648944000000,"date":"2022-04-03T00:00:00.000Z"},{"priceUsd":"3489.0240927996408841","time":1649030400000,"date":"2022-04-04T00:00:00.000Z"},{"priceUsd":"3494.1418470338436328","time":1649116800000,"date":"2022-04-05T00:00:00.000Z"},{"priceUsd":"3296.0058732841065749","time":1649203200000,"date":"2022-04-06T00:00:00.000Z"},{"priceUsd":"3218.9694740940195538","time":1649289600000,"date":"2022-04-07T00:00:00.000Z"},{"priceUsd":"3259.2065810548836805","time":1649376000000,"date":"2022-04-08T00:00:00.000Z"},{"priceUsd":"3225.9267940764315478","time":1649462400000,"date":"2022-04-09T00:00:00.000Z"},{"priceUsd":"3265.3065913667486727","time":1649548800000,"date":"2022-04-10T00:00:00.000Z"},{"priceUsd":"3092.3253234865085903","time":1649635200000,"date":"2022-04-11T00:00:00.000Z"},{"priceUsd":"3017.0148785746589738","time":1649721600000,"date":"2022-04-12T00:00:00.000Z"},{"priceUsd":"3086.6244330491548944","time":1649808000000,"date":"2022-04-13T00:00:00.000Z"},{"priceUsd":"3072.7230643955257638","time":1649894400000,"date":"2022-04-14T00:00:00.000Z"},{"priceUsd":"3031.7016357415957106","time":1649980800000,"date":"2022-04-15T00:00:00.000Z"},{"priceUsd":"3044.4111058552344061","time":1650067200000,"date":"2022-04-16T00:00:00.000Z"},{"priceUsd":"3052.9144448553864080","time":1650153600000,"date":"2022-04-17T00:00:00.000Z"},{"priceUsd":"2964.8482406257868742","time":1650240000000,"date":"2022-04-18T00:00:00.000Z"},{"priceUsd":"3075.2372145382531442","time":1650326400000,"date":"2022-04-19T00:00:00.000Z"},{"priceUsd":"3095.1448431091172921","time":1650412800000,"date":"2022-04-20T00:00:00.000Z"},{"priceUsd":"3088.0856901337150042","time":1650499200000,"date":"2022-04-21T00:00:00.000Z"},{"priceUsd":"2989.1172021418810407","time":1650585600000,"date":"2022-04-22T00:00:00.000Z"},{"priceUsd":"2963.2935891270851371","time":1650672000000,"date":"2022-04-23T00:00:00.000Z"},{"priceUsd":"2948.2461796222830244","time":1650758400000,"date":"2022-04-24T00:00:00.000Z"}],"timestamp":1650918371986}
                ];
        return await db.query(`SELECT a.*, ah.* FROM assets a
                               INNER JOIN assethistories ah ON ah.assetid = a.id
                               WHERE a.userId = '${userId}')`);
    },
}

module.exports = UserassetsRepository;