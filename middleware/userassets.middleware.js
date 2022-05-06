module.exports = {
     validateUserasset: async (req, res, next) => {

        if (!req.body.assetid) {
            return res.status(400).send({
                message: 'Missing assetid'
            });
        }

        if (!req.userData.id) {
            return res.status(400).send({
                message: 'User session faulty. Please login again.'
            });
        }

        if (!req.body.highlighted) {
            req.body.highlighted = 0;
        }

        if (!req.body.amount) {
            req.body.amount = 0;
        }

        if (!req.body.sum) {
            req.body.sum = 0
        }

        next();
    },
}