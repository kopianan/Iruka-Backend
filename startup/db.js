
const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function () {
    mongoose.connect('mongodb+srv://kopianan:ananalfred@iruka-db-12lvj.gcp.mongodb.net/test?retryWrites=true&w=majority')
        .then(() => winston.info("Connected to mongodb"));

}
// mongodb+srv://kopianan:15121996%40aacH@iruka-db-12lvj.gcp.mongodb.net/test?retryWrites=true&w=majority
// mongodb+srv://kopianan:15121996%40aacH@iruka-db-12lvj.gcp.mongodb.net/test
//compas 
// mongodb+srv://kopianan:15121996%40aacH@iruka-db-12lvj.gcp.mongodb.net/test