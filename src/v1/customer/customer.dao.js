const Customer = require('./customer.model');

const createCustomer = async ( customerObj ) => {
    return Customer.create( customerObj );
}

const updateCustomer = async ( customerObj, customerClauses ) => {
    return Customer.updateOne( customerClauses, customerObj );
}

const disableCustomer = async ( customerClauses ) => {
    return Customer.updateOne( customerClauses );
}

const getCustomerDetailsById = async ( customerId ) => {
    return Customer.findById( customerId ).populate('userId');
}

const getCustomerDetails = async ( customerClauses ) => {
    return Customer.findOne( customerClauses ).populate('userId');
}

const getAllCustomers = async ( customerClauses ) => {
    return Customer.find( customerClauses ).populate('userId');
}

module.exports = {
    createCustomer,
    updateCustomer,
    disableCustomer,
    getCustomerDetailsById,
    getCustomerDetails,
    getAllCustomers
}