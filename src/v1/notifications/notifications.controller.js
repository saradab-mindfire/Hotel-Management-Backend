const { bulkImportNotification } = require('./notifications.dao');
const { errorResponse, successResponse } = require('./../../../core/helpers/responseHandler');
const { getAllCustomers } = require('./../customer/customer.dao');
const { getHotelUsers } = require('./../hotel-user/hotel-user.dao');

const bulkSendNotification = async( req, res ) => {
    try {
        let { title, body, users = [], userType = 'customer' } = req.body;
        
        let userIds = users;
        if( users.length === 0 ) {
            if( userType === 'customer' ) {
                users = await getAllCustomers( {} );
                userIds = users.map( el => el._id );
            }
            else if( userType === 'hotelUsers' ) {
                users = await getHotelUsers( {} );
                userIds = users.map( el => el._id );
            }
        }

        let notifications = userIds.map( el => {
            return {
                user: el._id,
                title: title,
                body: body,
                status: "sent"
            }
        } );

        await bulkImportNotification( notifications );

        return successResponse( res, "Notification Sent Successfully !" )
    }
    catch( err ) {
        return errorResponse( res, err.message )
    }
}

module.exports = {
    bulkSendNotification
}