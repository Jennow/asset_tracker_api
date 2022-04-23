const mysql = require('mysql');
require('dotenv').config()

class Database {
    constructor() {
        this.connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DATABASE,
        });
    }
    query( sql, args ) {
        return new Promise( ( resolve, reject ) => {

            this.connection.query( sql, args, ( err, rows ) => {
                if (err) {
                    return reject(err);
                }

                resolve( rows );
            } );

        } );
    }
    escape(string){return this.connection.escape(string)}
    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err ) {
                    return reject( err );
                }
                resolve();
            } );
        } );
    }
}

module.exports = Database;