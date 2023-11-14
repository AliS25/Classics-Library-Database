const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    password: 'classicslib',
    host: 'cosc-257-node08.cs.amherst.edu',
    port: 5432,
    database: 'library'
});

module.exports = pool;