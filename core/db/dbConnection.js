const { dbURL } = require('../config');
const { connect } = require('mongoose');

const connectDB = async() => {
    try {
        await connect( dbURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        } )
        console.log( "Connected to DB !" );
    }
    catch( err ) {
        console.log( "Failed to Connect DB !" );
        process.exit();
    }
}

connectDB();