//File stream
const fs = require('fs');

//Path
const path = require('path');

//Express
const express = require('express');
const app = express();

//External Files
const {
    accounts,
    users,
    writeJSON
} = require('./data');

const accountRoutes = require('./routes/accounts');
const servicesRoutes = require('./routes/services');

//Set path to views folder
app.set('views',
    path.join(__dirname, 'views')
);

//View engine
app.set('view engine', 'ejs');

//CSS
app.use(
    express.static(
        path.join(__dirname, 'public')
    )
); //CSS

//URL Encoded Middleware
app.use(
    express.urlencoded({
        extended: true
    })
); //URL Encoded Middleware

//index root
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Account Summary', accounts
    });
}); //index root

//Profile
app.get('/profile', (req, res) => {
    res.render('profile', {
        user: users[0] //First user in the users.json
    });
}); //Profile

//Accounts
app.use('/account', accountRoutes);

//Services
app.use('/services', servicesRoutes);

//Port 3000
app.listen(3000, () => {
    console.log('PS Project Running on port 3000!');
}); //Port 3000
