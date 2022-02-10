const { Pool } = require('pg');

// Config
const { host, user, database, password, port, ssl } = require('./dbConfig');

const pool = new Pool({
  user,
  host,
  database,
  password,
  port,
  ssl,
});

module.exports = pool;
