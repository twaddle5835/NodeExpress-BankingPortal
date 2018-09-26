//File stream
const fs = require('fs');

//Path
const path = require('path');

//Express
const express = require('express');
const app = express();

//Set path to views folder
app.set('views', path.join(__dirname, 'views'));

//View engine
app.set('view engine', 'ejs');

//CSS
app.use(express.static(path.join(__dirname, 'public')));

//Read account data
const accountData = fs.readFileSync(
    path.join(__dirname, 'json', 'accounts.json'), 'utf8'
);

const accounts = JSON.parse(accountData);

//Read user data
const userData = fs.readFileSync(
    path.join(__dirname, 'json', 'users.json'), 'utf8'
);

const users = JSON.parse(userData);

//index root
app.get('/', (req, res) => {
    res.render('index',
        {
            title: 'Account Summary', accounts
        });
});

//savings
app.get('/savings', (req, res) => {
    res.render('account',
        {
            account: accounts.savings
        });
});

//checking
app.get('/checking', (req, res) => {
    res.render('account',
        {
            account: accounts.checking
        });
});

//credit
app.get('/credit', (req, res) => {
    res.render('account',
        {
            account: accounts.credit
        });
});

//Profile
app.get('/profile', (req, res) => {
    res.render('profile',
    {
        user: users[0] //First user in the users.json
    });
});

//Port 3000
app.listen(3000, () => {
    console.log('PS Project Running on port 3000!');
});
