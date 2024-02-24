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

export const REACT_NOTIFY = {
  APP_ID: parseInt(process.env.REACT_NOTIFY_APP_ID),
  APP_TOKEN: process.env.REACT_NOTIFY_APP_TOKEN,
  API_BASE_URL: process.env.REACTIVE_NATIVE_NOTIFY_BASE_URL,
};
