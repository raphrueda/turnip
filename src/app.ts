import 'module-alias/register';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { config } from 'dotenv';

import { auth } from '@routes';

// intialise and destructure dot env config
config();
const { APP_PORT } = process.env;

// create express app
const app = express();

// express middleware
app.use(bodyParser.json());

// #region Route registration
app.use('/auth', auth);
// #endregion

app.listen(APP_PORT, () => {
    console.log(`server started on port ${APP_PORT}...`);
});
