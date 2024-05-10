import express from 'express';
import dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import routes from './routes/routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use('/', routes);

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
