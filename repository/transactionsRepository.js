const Database = require('../db.js');
const db = new Database();

const TransactionsRepository = {
    async addTransaction(transaction) {
        return await db.query(`
        INSERT INTO transactions (userassetid, createdate, amount, status) 
        VALUES (
            ${transaction.userassetid},
            now(),
            ${transaction.amount},
            ${transaction.status},
        )`);
    },
    async getTransactions(id) {
        let transaction = await db.query(`SELECT * FROM transactions WHERE id = '${id}`)[0];
        
        if (transaction) {
            transaction.asset = await db.query(`SELECT a.id, a.identifier, a.name FROM transactions t
            INNER JOIN userassets ua ON ua.id = t.userassetid
            INNER JOIN assets a ON a.id = ua.assetid
            WHERE t.id = ${id}`)[0];
        }
        return transaction;
        return [
            {
                "id": 1,
                "assetId": 1,
                "createdate": "2012-04-23T18:25:43.511Z",
                "amount": 100,
                "status": 1,
                "asset": {
                    "id": 1,
                    "identifier": "bitcoin",
                    "name": "Bitcoin",
                }
            },
            {
                "id": 2,
                "assetId": 2,
                "createdate": "2022-04-01T18:25:43.511Z",
                "amount": -80,
                "status": 1,
                "asset": {
                    "id": 2,
                    "identifier": "MSCI",
                    "name": "MSCI World ESG",
                }
            },
            {
                "id": 3,
                "assetId": 2,
                "createdate": "2022-04-02T18:25:43.511Z",
                "amount": 100,
                "status": 1,
                "asset": {
                    "id": 2,
                    "identifier": "MSCI",
                    "name": "MSCI World ESG",
                }
            },
            {
                "amount": 0.1,
                "createdate": "2022-04-12T00:00:00.000Z",
                "status": 1,
                "assetId": 1,
                "id": 4,
                "asset": {
                    "id": 1,
                    "identifier": "bitcoin",
                    "name": "Bitcoin",
                }
            },
            {
                "amount": 1,
                "createdate": "2022-04-12T00:00:00.000Z",
                "status": 1,
                "assetId": 3,
                "id": 5,
                "asset": {
                    "id": 3,
                    "identifier": "DIS",
                    "name": "Disney Stock",
                }
            }
        ]
    },
}

module.exports = TransactionsRepository;