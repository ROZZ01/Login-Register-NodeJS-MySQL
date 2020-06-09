const express = require('express');
const routes = require('./routes/auth')
require('dotenv').config();
//Import routes
const authRoute = require('./routes/auth');
const privateRoutes = require('./routes/privateRoutes');
const app = express();


//Middlewares
app.use(express.json());


//Routes middlewere
app.use('/api/user', authRoute);
app.use('/api/loggedin', privateRoutes);



app.listen(process.env.PORT, () => console.log("Server up and running on port : ",process.env.PORT));