const RoomInventory = require('./room-inventory.model');

const createInventory = async( inventoryObj ) => {
    return RoomInventory.create( inventoryObj );
}

const updateInventory = async( inventoryClauses, inventoryObj ) => {
    return RoomInventory.findOneAndUpdate( inventoryClauses, inventoryObj, { upsert: true, new: true, setDefaultsOnInsert: true } );
}

module.exports = {
    createInventory,
    updateInventory
};