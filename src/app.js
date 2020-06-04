const express  =  require ('express');
const path = require('path');
const app = express();

const bodyParser = require('body-parser');

const routes = require('./routes/index.js');

//setings
app.set('port',process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//middlewares
app.use((req, res, next) => {
	console.log(`${req.url} - ${req.method}`);
	next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//routes
app.use(routes);
// satic files
app.use(express.static(path.join(__dirname, 'public')));
// iniciar el server
app.listen(app.get('port'),() => {
    console.log("Server on port", app.get('port'))
});
