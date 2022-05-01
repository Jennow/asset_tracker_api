module.exports = (transactionsRepository) => {
    const TransactionsController = {
        add: async function(req, res, next) {
            const asset = req.body;
            const response = await transactionsRepository.addTransaction(asset);
            return res.status(201).send({
                success: true,
                id: response.insertId
            });
            
        },
    }

    return TransactionsController;
} 