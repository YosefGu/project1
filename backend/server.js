require('dotenv').config();

// routes
const routes = require('./routes/routes');
const userRoutes = require('./routes/user')

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const port = process.env.PORT;
const mogoAtlas_URI = process.env.URI;

app.use(cors());

// middleware - run everytime we get a reqwest
// check in every request if has a deta in the body and parse it to json. 
app.use(express.json());

app.use((req, res, next) => {
    console.log('path:', req.path, '| method:', req.method);
    next();
});

//routes
app.use('/api/users', routes)
app.use('/api/user', userRoutes)

mongoose.connect(mogoAtlas_URI)
.then(() => {
    app.listen(port, () => {
        console.log(`connected to db & listening in port ${port}.`)
    })
})
.catch((error) => {
    console.log(error)
});

