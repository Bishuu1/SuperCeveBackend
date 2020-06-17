const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/database', {useNewUrlParser: true, useFindAndModify:false ,useUnifiedTopology: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', () => {
    console.log('DB is connected!');
});


