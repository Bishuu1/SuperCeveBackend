const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');


//setings
app.set('port', process.env.PORT || 4000);

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(cors());

//routes
//app.use('/index', require('./routes/index.js'));
//app.use('/', require('./routes/users.js'));
//app.use('/api/user:id/inputs', require('./routes/inputs.js'));
//ruta agregadas-dani
app.use('/api/Users', require('./routes/Users'));
app.use('/api/SetEntries', require('./routes/SetEntries'));

module.exports = app;