const express = require('express');
const cors = require('cors');
const { port } = require('./core/config');
const { errorHandler, invalidRoute } = require('./core/helpers/errorHandler');
const fs = require('fs');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const customCss = fs.readFileSync((process.cwd()+"/swagger.css"), 'utf8');

const app = express();

// DB Connection
require('./core/db/dbConnection');

app.use( express.json( { type: 'application/json' } ) );
app.use( cors() );

const router = require('./router');
app.use( '/api', router );

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {customCss}));

app.use( invalidRoute );
app.use( errorHandler );

app.listen( port, () => {
    console.log( `App listen on port ${ port }` );
} )