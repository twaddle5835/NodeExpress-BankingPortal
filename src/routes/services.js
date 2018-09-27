const express = require('express');
const router = express.Router();

//External Files
const {
    accounts,
    writeJSON
} = require('../data');

//Transfer
router.get('/transfer', (req, res) => {
    res.render('transfer', {});
});

router.post('/transfer', (req, res) => {
    //Subtract requested amount from selected from account
    accounts[req.body.from].balance = accounts[req.body.from].balance - req.body.amount;

    //Add requested amount to selected to account
    accounts[req.body.to].balance = parseInt(accounts[req.body.to].balance, 10) + parseInt(req.body.amount, 10);

    //JSON to string
    const accountsJSON = JSON.stringify(accounts);

    writeJSON();

    //Render transfers screen
    res.render('transfer', {
        message: "Transfer Completed"
    });
});

//Payments
router.get('/payment', (req, res) => {
    res.render('payment', {
        account: accounts.credit
    });
});

router.post('/payment', (req, res) => {
    //Subtract amount from balance
    accounts.credit.balance = accounts.credit.balance - req.body.amount;

    //Add amount to available
    accounts.credit.available = parseInt(accounts.credit.available, 10) +
        parseInt(req.body.amount, 10);

    //Save to file
    const accountsJSON = JSON.stringify(accounts);

    writeJSON();

    res.render('payment', {
        message: "Payment Successful",
        account: accounts.credit
    });
});

module.exports = router;