const Database = require('../db.js');
const db = new Database();

const AssetsRepository = {
    async getAssets(userId) {
        return [
            {
                "id": 1,
                "identifier": "bitcoin",
                "name": "Bitcoin",
                "icon": "fab fa-bitcoin",
                "type": "crypto",
                "subtype": "static",
                "currencyId": 1,
                "platform": "Binance",
                "highlighted": true,
                "performance": 80,
                "amount": 0.1,
                "sum": 3981.79,
                "history": [
                    {
                        "date": "2022-01-01T18:25:43.511Z",
                        "amount": 0
                    },
                    {
                        "date": "2022-04-12T00:00:00.000Z",
                        "amount": 0.1
                    }
                ]
            },
            {
                "id": 2,
                "identifier": "MSCI",
                "name": "MSCI World ESG",
                "type": "stock",
                "subtype": "etf",
                "currencyId": 1,
                "platform": "Trade Republic",
                "highlighted": true,
                "performance": 8,
                "amount": 0,
                "sum": 0,
                "history": [
                    {
                        "date": "2022-01-01T18:25:43.511Z",
                        "amount": 0
                    }
                ]
            },
            {
                "id": 3,
                "identifier": "DIS",
                "name": "Disney Stock",
                "type": "stock",
                "subtype": "static",
                "currencyId": 1,
                "platform": "Trade Republic",
                "performance": -0.8,
                "highlighted": true,
                "amount": 1,
                "sum": 301,
                "history": [
                    {
                        "date": "2022-01-01T18:25:43.511Z",
                        "amount": 0
                    },
                    {
                        "date": "2022-04-12T00:00:00.000Z",
                        "amount": 1
                    }
                ]
            },
            {
                "id": 4,
                "identifier": "ethereum",
                "name": "Ethereum",
                "icon": "fab fa-ethereum",
                "type": "crypto",
                "subtype": "static",
                "currencyId": 1,
                "platform": "Binance",
                "highlighted": true,
                "performance": 80,
                "amount": 0,
                "sum": 0,
                "history": [
                    {
                        "date": "2022-01-01T18:25:43.511Z",
                        "amount": 0
                    }
                ]
            }
        ];
        return await db.query(`SELECT a.*, ah.* FROM assets a
                               INNER JOIN assethistories ah ON ah.assetid = a.id
                               WHERE a.userId = '${userId}')`);
    },
    async getAssetHistory(assetId) {
        
    }
}

module.exports = AssetsRepository;