const express = require('express');
const cors = require('cors');
const { port } = require('./core/config');
const { errorHandler, invalidRoute } = require('./core/helpers/errorHandler');

const app = express();

// DB Connection
require('./core/db/dbConnection');

app.use( express.json( { type: 'application/json' } ) );
app.use( cors() );

const router = require('./router');
app.use( '/api', router );

app.use( invalidRoute );
app.use( errorHandler );

app.listen( port, () => {
    console.log( `App listen on port ${ port }` );
} )