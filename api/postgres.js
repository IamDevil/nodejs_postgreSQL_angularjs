const promise = require('bluebird');

const options = {
    // Initialization Options
    host: 'localhost',
    port: 5432,
    database: 'TaxiDB',
    user: 'postgres',
    password: '1j6el4nj4su3'
};

const pgp = require('pg-promise')();

module.exports = pgp(options);
