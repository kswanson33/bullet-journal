import { Pool, QueryResultRow } from 'pg';

// Configure DB connection

const {
  POSTGRES_HOST,
  POSTGRES_DATABASE,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
} = process.env

const pool = new Pool({
  host: POSTGRES_HOST,
  database: POSTGRES_DATABASE,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  ssl: {
    rejectUnauthorized: false
  }
});

export const query = <Result extends QueryResultRow>(text: string) => {
  return pool.query<Result>(text);
}

