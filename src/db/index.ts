import { Pool, QueryResultRow } from 'pg';

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
} = process.env

const pool = new Pool({
  host: POSTGRES_HOST,
  database: POSTGRES_DB,
  user: POSTGRES_USER
});

export const query = <Result extends QueryResultRow>(text: string) => {
  return pool.query<Result>(text);
}

