const Notification = require('./notifications.model');

const addNotification = ( notificationObj ) => {
    return Notification.create( notificationObj );
}

const bulkImportNotification = ( notifications ) => {
    return Notification.insertMany( notifications );
}

const updateNotification = ( id, status ) => {
    return Notification.findByIdAndUpdate( id, { status } );
}

module.exports = {
    addNotification,
    updateNotification,
    bulkImportNotification
}