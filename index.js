const mongoose = require('mongoose'); 
const express = require('express'); 
const app = express(); 

const feeds = require('./routes/feeds'); 
const roles = require('./routes/roles');
const users = require('./routes/users');
const coupons = require('./routes/promo_coupons');
const userGroomer = require('./routes/user_groomers');
const userCustomer = require('./routes/user_customers'); 


mongoose.connect('mongodb://localhost/Iruka')
    .then(() => console.log("Connected to mongodb"))
    .catch((err) => console.log("Can not connect to DB")); 


app.use(express.json()); 
app.use('/api/feeds', feeds) ; 
app.use('/api/roles', roles) ; 
app.use('/api/coupons', coupons) ; 
app.use('/api/users', users) ;
app.use('/api/userGroomer', userGroomer); 
app.use('/api/userCustomer', userCustomer); 

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));