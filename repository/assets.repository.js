const Database = require('../db.js');
const db = new Database();

const AssetsRepository = {
    async addAsset(asset) {
        return await db.query(`
        INSERT INTO assets (identifier, name, type, icon, subtype) 
        VALUES (
            '${asset.identifier}',
            '${asset.name}',
            '${asset.type}',
            '${asset.icon}',
            '${asset.subtype}'
        )`);
    },
    async getAssets() {
        return await db.query(`SELECT * FROM assets`);
    },
    async getAssetHistory(assetId) {
        
    }
}

module.exports = AssetsRepository;