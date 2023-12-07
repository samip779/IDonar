require('dotenv').config();

export const PORT: number = parseInt(process.env.PORT) || 5000;
export const MODE: string = process.env.MODE;

export const JWTSECRET: string = process.env.JWTSECRET;

export const DATABASEENV = {
  host: process.env.PGHOST,
  port: parseInt(process.env.PGPORT) || 5432,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
};

export const SMTP = {
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  user: process.env.SMTP_USER,
  password: process.env.SMTP_PASSWORD,
};
