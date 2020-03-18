

const feeds = require('../routes/feeds');
const roles = require('../routes/roles');
const users = require('../routes/users');
const coupons = require('../routes/promo_coupons');
const userGroomer = require('../routes/user_groomers');
const userCustomer = require('../routes/user_customers');
const auth = require('../routes/auth');    
const error = require('../middleware/error');

const express = require('express');


module.exports = function (app) {


    app.use(express.json());
    app.use('/api/feeds', feeds);
    app.use('/api/roles', roles);
    app.use('/api/users', users);
    app.use('/api/coupons', coupons);
    app.use('/api/userGroomer', userGroomer);
    app.use('/api/userCustomer', userCustomer);
    app.use('/api/auth', auth);

    app.use(error);

}