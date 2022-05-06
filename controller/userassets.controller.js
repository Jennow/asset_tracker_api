module.exports = (userAssetsRepository) => {
    const UserAssetsController = {
        add: async function(req, res, next) {
            const userAsset = req.body;
            const response  = await userAssetsRepository.addUserasset(userAsset, req.userData.id);

            return res.status(201).send({
                success: true,
                id: response.insertId
            });
        },
        load: async function(req, res, next) {
            const userAsset = await userAssetsRepository.getUserassets(req.userData.id);
            return res.status(201).send(userAsset);
        }
    }

    return UserAssetsController;
} 