//File stream
const fs = require('fs');

//Path
const path = require('path');

//Express
const express = require('express');
const app = express();

//Set path to views folder
app.set(
    'views',
    path.join(
        __dirname, 'views'
    )
);

//View engine
app.set(
    'view engine', 'ejs'
);

//CSS
app.use(
    express.static(
        path.join(
            __dirname, 'public'
        )
    )
);

//URL Encoded Middleware
app.use(
    express.urlencoded({
        extended: true
    })
);

//Read account data
const accountData = fs.readFileSync(
    path.join(
        __dirname, 'json',
        'accounts.json'
    ), 'utf8'
);

const accounts = JSON.parse(accountData);

//Read user data
const userData = fs.readFileSync(
    path.join(
        __dirname,
        'json',
        'users.json'
    ), 'utf8'
);

const users = JSON.parse(userData);

//index root
app.get('/', (req, res) => {
    res.render(
        'index', {
            title: 'Account Summary', accounts
        }
    );
});

//savings
app.get('/savings', (req, res) => {
    res.render(
        'account', {
            account: accounts.savings
        }
    );
});

//checking
app.get('/checking', (req, res) => {
    res.render(
        'account', {
            account: accounts.checking
        }
    );
});

//credit
app.get('/credit', (req, res) => {
    res.render(
        'account', {
            account: accounts.credit
        }
    );
});

//Profile
app.get('/profile', (req, res) => {
    res.render(
        'profile', {
            user: users[0] //First user in the users.json
        }
    );
});

//Transfer
app.get('/transfer', (req, res) => {
    res.render(
        'transfer', {

        }
    );
});

app.post('/transfer', (req, res) => {
    //Subtract requested amount from selected from account
    accounts[req.body.from].balance = accounts[req.body.from].balance - req.body.amount;

    //Add requested amount to selected to account
    accounts[req.body.to].balance = parseInt(accounts[req.body.to].balance, 10) + parseInt(req.body.amount, 10);

    //JSON to string
    const accountsJSON = JSON.stringify(accounts);

    //Use FS to write to file
    fs.writeFileSync(
        path.join(
            __dirname,
            'json',
            'accounts.json'
        ),
        accountsJSON, 'utf8'
    );

    //Render transfers screen
    res.render(
        'transfer', {
            message: "Transfer Completed"
        }
    );
});

//Payments
app.get(
    '/payment', (req, res) => {
        res.render(
            'payment', {
                account: accounts.credit
            }
        );
    });

app.post(
    '/payment', (req, res) => {
        //Subtract amount from balance
        accounts.credit.balance = accounts.credit.balance - req.body.amount;

        //Add amount to available
        accounts.credit.available = parseInt(accounts.credit.available, 10) +
            parseInt(req.body.amount, 10);

        //Save to file
        const accountsJSON = JSON.stringify(accounts);

        //Use FS to write to file
        fs.writeFileSync(
            path.join(
                __dirname,
                'json',
                'accounts.json'
            ),
            accountsJSON, 'utf8'
        );

        res.render(
            '/payment', {
                message: "Payment Successful", 
                account: accounts.credit
            }
        );
    });

//Port 3000
app.listen(3000, () => {
    console.log('PS Project Running on port 3000!');
});
