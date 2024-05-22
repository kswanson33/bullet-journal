// server.js
const { Pool } = require('pg');
require('dotenv').config();

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

// seed.js
const { todos } = require('./placeholder-data.js');

async function seedTodos(client) {
  try {
    const createTable = await client.query(/* sql */`
      CREATE TABLE IF NOT EXISTS todos (
        task TEXT NOT NULL,
        bullet_style TEXT NOT NULL,
        date_created DATE NOT NULL,
        date_begin DATE NOT NULL,
        date_complete DATE DEFAULT NULL
      );
      DELETE FROM todos;
    `);
    console.log(`Created "todos" table`);

    // Insert data
    const insertedTodos = await Promise.all(
      todos.map(async (todo) => {
        if (todo.date_complete) {
          return client.query(/* sql */`
            INSERT INTO todos (task, bullet_style, date_created, date_begin, date_complete)
            VALUES ('${todo.task}', '${todo.bullet_style}', '${todo.date_created}', '${todo.date_begin}', '${todo.date_complete}');
          `)
        } else {
          return client.query(/* sql */`
            INSERT INTO todos (task, bullet_style, date_created, date_begin, date_complete)
            VALUES ('${todo.task}', '${todo.bullet_style}', '${todo.date_created}', '${todo.date_begin}', NULL);
          `)
        }
      })
    );
    console.log(`Seeded ${insertedTodos.length} todos`);

    return {
      createTable,
      todos: insertedTodos,
    };
  } catch (error) {
    console.log('Error seeding todos:', error);
    throw error;
  }
}

async function main() {
  const client = await pool.connect();

  await seedTodos(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
  pool.end();
});
