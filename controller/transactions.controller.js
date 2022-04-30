module.exports = (transactionsRepository) => {
    const TransactionsController = {
        add: async function(req, res, next) {
            // Add transaction to database
            respponse = {
                success: true,
                transactionid: 99
            }
            return res.status(201).json(respponse);
        }
    }

    return TransactionsController;
} 