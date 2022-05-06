module.exports = (userassetsRepository, transactionsRepository) => {
    const DashboardController = {
        load: async function(req, res, next) {
            const userId = req.userData.id;
            const userAssets = await userassetsRepository.getUserassets(userId);
            const history = await userassetsRepository.getUserAssetHistory(userId);
            const transactions = await transactionsRepository.getTransactions(userId);
            const overview = await userassetsRepository.getSummary(userId);
            
            console.log(transactions);
            return res.status(201).json({
                userAssets: userAssets,
                personalizedHistories: history,
                transactions: transactions,
                overview: overview,
            });
        }
    }

    return DashboardController;
} 