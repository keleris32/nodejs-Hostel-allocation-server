import { Request, Response } from 'express';

import { Client } from 'pg';

// @ts-ignore
// Config
import { host, user, database, password, port } from '../config/dbConfig';

// @ts-ignore
// DB queries
import query from '../dbQueries/createTable';

// Initialize Client instance
const client = new Client({
  host,
  user,
  database,
  password,
  port,
});

export function createDbTables(_req: Request, res: Response) {
  // Connect to Db
  async function connectToDB() {
    try {
      // Start connection
      await client.connect();
      console.log('Connected to DB successfully!');
    } catch (error) {
      console.log(`Error connecting to db >> ${error}`);

      // End connection
      await client.end();
      console.log('Connection ended!');
    }
  }

  // create rooms table
  async function createRoomsTable() {
    try {
      // Call function to connect to DB
      connectToDB();

      await client.query(query.createRoomsTableQuery);

      console.log('Rooms table created successfully!');
    } catch (error) {
      console.log(`Error im creating rooms table ${error}`);

      // End connection
      await client.end();
      console.log('Connection ended!');
    }
  }

  createRoomsTable();

  // create students table
  async function createStudentsTable() {
    try {
      // Continue with queries since the connection is already open
      await client.query(query.createStudentsTableQuery);

      res
        .status(200)
        .json({ message: 'Database tables created successfully!' });
      console.log('Student table created successfully!');
    } catch (error) {
      console.log(`Error in creating students table ${error}`);

      // End connection
      await client.end();
      res.status(500).json({ message: 'Creation failed!' });
      console.log('Connection ended!');
    } finally {
      // End connection
      await client.end();
      console.log('Connection ended!');
    }
  }

  createStudentsTable();
}
