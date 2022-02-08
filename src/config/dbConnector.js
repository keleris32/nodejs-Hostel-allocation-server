const { Pool } = require('pg');

// Config
const { host, user, database, password, port } = require('./dbConfig');

const pool = new Pool({
  user,
  host,
  database,
  password,
  port,
});

module.exports = pool;
