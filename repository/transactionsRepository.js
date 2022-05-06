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
            ${transaction.status}
        )`);
    },
    async getTransactions(userId) {
        let transactions = await db.query(`SELECT t.* FROM transactions t
        INNER JOIN userassets ua WHERE ua.userid = ${userId}`);
        if (transactions) {
            for (let key = 0; key < transactions.length; key ++) {
                let userasset = await db.query(`SELECT a.id, a.identifier, a.name FROM assets a
                INNER JOIN userassets ua ON a.id = ua.assetid
                INNER JOIN transactions t ON ua.id = t.userassetid
                WHERE t.id = ${transactions[key].id} GROUP BY a.id`);
                transactions[key].userasset = userasset[0];
            }
        }
        return transactions;
    }
}

module.exports = TransactionsRepository;