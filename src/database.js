const Mongoose = require('mongoose');

const Data = 'mongodb://localhost/Database';

Mongoose.connect(Data, {
    useNewUrlParser = true,
    useCreateIndex = true

});

const connection = Mongoose.connect();

connection.once('open', () => {
    console.log('DB is connected!');
});



