const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');

//Inicializacion
require('./database');

//Configuración
app.set('port',process.env.PORT || 3000);
app.set('views',path.join(__dirname, 'views'));



//server
app.use(require('./routes/index'));

//public
app.use(express.static(path.join(__dirname, 'public')));



app.listen(app.get('port'),() => {
    console.log("Server on port", app.get('port'))
});