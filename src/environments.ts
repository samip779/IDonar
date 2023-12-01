require('dotenv').config();

export const DATABASEENV = {
  host: process.env.PGHOST,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
};

export const JWTENV = {};
