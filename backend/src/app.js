//  File that contains the server
const express = require('express');
const cors = require('cors');
const app = express();

// settings

app.set('port', process.env.PORT || 4000);

// middlewares: they execute before reaching the routes
// I'll use cors to connect two servers and exchange date between each other
app.use(cors());
// Now my server understand json formats and strings
app.use(express.json());
// routes
app.use('/api/users', require('./routes/users'));
app.use('/api/todos', require('./routes/todos'));

module.exports = app;