import { Pool, QueryResultRow } from 'pg';

// Configure DB connection

const {
  DB_HOST,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
} = process.env

const pool = new Pool({
  host: DB_HOST,
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASSWORD,
});

export const query = <Result extends QueryResultRow>(text: string) => {
  return pool.query<Result>(text);
}

