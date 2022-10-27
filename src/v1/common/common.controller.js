const { getHotelsByClause, getHotelByClause } = require('./../hotel/hotel.dao');
const { getRoomTypesByClause, getRoomTypeByClause } = require('./../room-type/room-types.dao');
const { getAllRooms } = require('./../room/room.dao');
const { errorResponse, successResponse } = require('./../../../core/helpers/responseHandler');

const filterHotels = async( req, res ) => {
    try {
        const { roomType, roomId, minPrice, maxPrice, hotelId, location } = req.query;
        let hotels;
        let roomTypes;
        let rooms;

        if( location ) {
            hotels = await getHotelsByClause( { location } );
        }

        const hotelIds = hotels.map( el => el._id );
        roomTypes = await getRoomTypesByClause( {
            hotelId: {
                $in: hotelIds
            }
        } );

        const roomTypesIds = roomTypes.map( el => el._id );
        rooms = await getAllRooms(
            {
                
            }
        );

        let query = {};
        if( hotelId ) {
            Object.assign( query, {
                "hotelId": hotelId
            } );
        }
        if( roomType ) {
            Object.assign( query, {
                "roomType": roomType,
            } );
        }
        if( roomId ) {
            Object.assign( query, {
                "roomId": roomId,
            } );
        }
        if( minPrice && maxPrice ) {
            Object.assign( query, {
                "defaultPrice": {
                    $and: [
                        {"$gte": minPrice},
                        {"$lte": maxPrice}
                    ]
                }
            } );
        }

        // const hotels = await getHotelsByClause( query );

        return successResponse( res, "Hotels Fetched Successfully !" )
    }
    catch( err ) {
        return errorResponse( res, err.message );
    }
}

module.exports = {
    filterHotels
}