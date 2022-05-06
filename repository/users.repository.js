const Database = require('../db.js');
const db = new Database();

const UsersRepository = {
    async findUserIdByUsername(username) {
        return await db.query(`SELECT id FROM users WHERE LOWER(username) = LOWER('${username}')`);
    },
    async findUserByUsername(username) {
        const users =  await db.query(`SELECT * FROM users WHERE LOWER(username) = LOWER('${username}')`);
        console.log(users);
        if (!users || users.length === 0) {
            throw {
                status: 400,
                message: 'Username or password incorrect!',
            };
        }
        let user = users[0];
        user.currency = await this.getCurrency(user.id);
        return user;
    },
    async createUser(username, email, password, currencyid) {
        return await db.query(`
        INSERT INTO users (username, email, password, currencyid, registered) 
        VALUES (
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