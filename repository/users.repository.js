const Database = require('../db.js');
const db = new Database();

const UsersRepository = {
    async findUserIdByUsername(username) {
        return await db.query(`SELECT id FROM users WHERE LOWER(username) = LOWER('${username}')`);
    },
    async findUserByUsername(username) {
        return await db.query(`SELECT * FROM users WHERE LOWER(username) = LOWER('${username}')`);
    },
    async createUser(id, username, email, password, currencyid) {
        return await db.query(`
        INSERT INTO users (id, username, email, password, currencyid, registered) 
        VALUES (
            '${id}', 
            ${db.escape(username)}, 
            ${db.escape(email)}, 
            '${password}', 
            ${db.escape(currencyid)}, 
            now()
        )`);
    },
    async updateUserLogin(id) {
        return await db.query(`UPDATE users SET last_login = now() WHERE id = '${id}'`);
    },
    async getCurrency(userId) {
        return {
            short: '$',
            id: 1,
            identifier: 'usd'
        };
        return await db.query(`SELECT c.* FROM users u INNER JOIN currencies c ON c.id = u.currenciesid WHERE u.id = '${userId}`);  
    }
}

module.exports = UsersRepository;