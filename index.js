const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoute = require('./Routes/auth');
const usersRoute = require('./Routes/user');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);

app.listen(port, () => {
    console.log('server started..');
});