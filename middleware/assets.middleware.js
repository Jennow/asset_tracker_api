module.exports = {
     validateAsset: async (req, res, next) => {

        if (!req.body.identifier) {
            return res.status(400).send({
                message: 'Missing identifier'
            });
        }

        if (!req.body.name) {
            return res.status(400).send({
                message: 'Missing name'
            });
        }

        if (!req.body.type) {
            return res.status(400).send({
                message: 'Missing type'
            });
        }

        next();
    },
}