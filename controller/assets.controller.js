module.exports = (assetsRepository) => {
    const AssetsController = {
        load: async function(req, res, next) {
            const assets = await assetsRepository.getAssets();
            return res.status(201).json(assets);
        }
    }

    return AssetsController;
} 