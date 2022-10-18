const { bulkImportNotification } = require('./notifications.dao');
const { getHotelUsers } = require('./../hotel-user/hotel-user.dao');
const { getCustomerDetailsById } = require('./../customer/customer.dao');

const notifyOnBooking = async( bookingObj ) => {
    try {
        const { hotelId, user, bookingId, bookingDate, _id: bookingRefId } = bookingObj;

        let customerDetails = await getCustomerDetailsById( user );
        customerDetails = customerDetails.toObject();

        const associatedHotelUsers = await getHotelUsers( { hotelId } );
        let notifications = [];
        if( !associatedHotelUsers || associatedHotelUsers.length === 0 ) {
            notifications = associatedHotelUsers.map( el => {
                return {
                    bookingRefId: bookingRefId,
                    user: el._id,
                    title: "Booking Successful - " + bookingId,
                    body: customerDetails.userId.firstName + " has booked a room in your hotel on " + bookingDate,
                    status: "sent"
                }
            } );
        }
        
        notifications.push( {
            bookingRefId: bookingRefId,
            user: user,
            title: "Booking Successful - " + bookingId,
            body: "You have a booking on " + bookingDate,
            status: "sent"
        } );

        await bulkImportNotification( notifications );

        return "Booking Successful !";
        
    }
    catch( err ) {
        throw err;
    }
}

module.exports = {
    notifyOnBooking
}