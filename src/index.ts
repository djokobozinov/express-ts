import express from 'express';
import dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import { LOG_LEVEL, PORT } from './config';
import { registerRoutes } from './decorators';
import { UserController } from './controllers/user.controllers';

dotenv.config();

const app = express();

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
// setup the logger
app.use(morgan(LOG_LEVEL, { stream: accessLogStream }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// step 1: register routes
registerRoutes(app, [UserController]);

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
