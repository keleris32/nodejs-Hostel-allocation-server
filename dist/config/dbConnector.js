const pg_1 = require('pg');
// const { Pool } = require('pg');
pg_1.defaults.ssl = { rejectUnauthorized: false };

// Config
const { host, user, database, password, port } = require('./dbConfig');

const pool = new pg_1.Pool({
  user,
  host,
  database,
  password,
  port,
});

module.exports = pool;
