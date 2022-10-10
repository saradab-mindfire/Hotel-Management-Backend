const { errorResponse } = require('./responseHandler');

const invalidRoute = (req, res) => {
    errorResponse( res, "Invalid API Access Request !" );
}

const errorHandler = ( err, res, next ) => {
    if( res.headersSent ) {
        return next( err );
    }
    errorResponse( res, err.message );
}

module.exports = {
    invalidRoute,
    errorHandler
}