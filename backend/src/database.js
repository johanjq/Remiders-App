// File that contains the connection with the database
const mongoose = require('mongoose');
//Process has access to our system
const URI = process.env.MONGODB_URI || 'mongodb://localhost/mosaicproject';

mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('DB is connected');
})