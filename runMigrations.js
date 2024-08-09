import pkg from 'pg';
const { Client } = pkg;
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = new Client({
  user: 'volunteer_user',
  host: 'localhost',
  database: 'volunteer_management',
  password: 'your_actual_password',  // Update with your password
  port: 5432,
});

async function runMigrations() {
  try {
    await client.connect();

    // Drop tables if they exist
    await client.query('DROP TABLE IF EXISTS user_profile CASCADE');
    await client.query('DROP TABLE IF EXISTS event_details CASCADE');
    await client.query('DROP TABLE IF EXISTS volunteer_history CASCADE');
    await client.query('DROP TABLE IF EXISTS notifications CASCADE');
    await client.query('DROP TABLE IF EXISTS states CASCADE');
    await client.query('DROP TABLE IF EXISTS user_credentials CASCADE');

    const createTablesSql = fs.readFileSync(path.join(__dirname, 'migrations', 'createTables.sql')).toString();
    const statesSql = fs.readFileSync(path.join(__dirname, 'migrations', 'states.sql')).toString();
    await client.query(createTablesSql);
    await client.query(statesSql);
    console.log('Migrations ran successfully');
  } catch (error) {
    console.error('Error running migrations:', error);
  } finally {
    await client.end();
  }
}

runMigrations();
