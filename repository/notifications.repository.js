const Database = require('../db.js');
const db = new Database();

const NotificationRepository = {
    async getNotifications(userId) {
        return [
            {
                "id": 1,
                "title": "New transaction",
                "text": "Automaticly added a transaction to asset 'MSCI World ESG'",
                "icon": "fad fa-file-plus",
                "createdate": "2012-04-23T18:25:43.511Z",
            },
            {
                "id": 2,
                "title": "Great revenue",
                "text": "Your assets of type 'Stocks' performed great last week",
                "icon": "fad fa-money-bill",
                "createdate": "2012-04-23T18:25:43.511Z",
            },
        ];
    },
}

module.exports = NotificationRepository;