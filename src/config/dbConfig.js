require('dotenv').config();

console.log('Config!', process.env.PGHOST);

// Single source to handle all the env variables
module.exports = {
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
};
