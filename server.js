// MODULES //
const express = require('express');
const less = require('less-middleware');
const path = require('path');
const morgan = require('morgan');

// CONSTANTS //
const PORT = 8080;

// APPLICATION //
const app = require('express')();

(async () => {
    // REQUEST LOGGER //
    app.use(morgan('dev'));

    // MIDDLEWARE //
    app.use(less(path.join(__dirname, 'static', 'less'), {
        force: true,
        dest: path.join(__dirname, 'static', 'css')
    }));

    // STATIC //
    app.use(express.static(path.join(__dirname, 'static', 'css')));

    // MIDDLEWARE //
    await require('./middleware/EtaMiddleware')(app);
    console.log();

    app.listen(PORT, () => {
        console.log('Running server on port ' + PORT);
        console.log();

        console.log('- All debug logging requests will be logged here. -');
        console.log();
    });
})();