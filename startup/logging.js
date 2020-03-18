require('express-async-errors');
const winston = require('winston');


module.exports = function () {

    winston.exceptions.handle(
        new winston.transports.Console({
            format: winston.format.json 
        }),
        new winston.transports.File({ filename: 'uncaughtExeptions.log' }))
    process.on('unhandledRejection', (ex) => {
        console.log('WE GOT UNHANDLED PROMISE REJECTION');
        process.exit(1);
    });
    winston.add(new winston.transports.File({ filename: 'logfile.log' }));

}