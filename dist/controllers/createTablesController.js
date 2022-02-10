"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDbTables = void 0;
const pg_1 = require("pg");
const dbConfig_1 = require("../config/dbConfig");
const createTable_1 = __importDefault(require("../dbQueries/createTable"));
const client = new pg_1.Client({
    host: dbConfig_1.host,
    user: dbConfig_1.user,
    database: dbConfig_1.database,
    password: dbConfig_1.password,
    port: dbConfig_1.port,
});
function createDbTables(_req, res) {
    async function connectToDB() {
        try {
            await client.connect();
            console.log('Connected to DB successfully!');
        }
        catch (error) {
            console.log(`Error connecting to db >> ${error}`);
            await client.end();
            console.log('Connection ended!');
        }
    }
    async function createRoomsTable() {
        try {
            connectToDB();
            await client.query(createTable_1.default.createRoomsTableQuery);
            console.log('Rooms table created successfully!');
        }
        catch (error) {
            console.log(`Error im creating rooms table ${error}`);
            await client.end();
            console.log('Connection ended!');
        }
    }
    createRoomsTable();
    async function createStudentsTable() {
        try {
            await client.query(createTable_1.default.createStudentsTableQuery);
            res
                .status(200)
                .json({ message: 'Database tables created successfully!' });
            console.log('Student table created successfully!');
        }
        catch (error) {
            console.log(`Error in creating students table ${error}`);
            await client.end();
            res.status(500).json({ message: 'Creation failed!' });
            console.log('Connection ended!');
        }
        finally {
            await client.end();
            console.log('Connection ended!');
        }
    }
    createStudentsTable();
}
exports.createDbTables = createDbTables;
//# sourceMappingURL=createTablesController.js.map