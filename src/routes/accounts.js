const express = require('express');
const router = express.Router();

//External Files
const { accounts } = require('../data');

//savings
router.get('/savings', (req, res) => {
    res.render(
        'account', {
            account: accounts.savings
        }
    );
});

//checking
router.get('/checking', (req, res) => {
    res.render(
        'account', {
            account: accounts.checking
        }
    );
});

//credit
router.get('/credit', (req, res) => {
    res.render(
        'account', {
            account: accounts.credit
        }
    );
});

module.exports = router;