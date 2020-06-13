const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes/index.js');
require ('./database.ks');

//setings
app.set('port',process.env.PORT || 3000);

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


//routes
app.use(routes);

// static files
app.use(express.static(path.join(__dirname, 'public')));


//
app.listen(app.get('port'),() => {
    console.log("Server on port", app.get('port'))
});
