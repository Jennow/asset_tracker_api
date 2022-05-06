module.exports = (assetsRepository) => {
    const AssetsController = {
        add: async function(req, res, next) {
            const asset = req.body;
            const response = await assetsRepository.addAsset(asset);

            return res.status(201).send({
                success: true,
                id: response.insertId
            });
        },
        load: async function(req, res, next) {
            console.log(req.userData);
            const assets = await assetsRepository.getAssets();
            return res.status(201).send(assets);
        }
    }

    return AssetsController;
} 