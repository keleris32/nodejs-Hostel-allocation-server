import express from 'express';
import { createDbTables } from '../controllers/createTablesController';

const createTablesRouter = express.Router();

//@desc Create DB tables
//@route POST /api/create-tables
createTablesRouter.post('/create-tables', createDbTables);

export default createTablesRouter;
