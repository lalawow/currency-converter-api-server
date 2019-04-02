const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').load();

let currency = {}

const getCurrency = () => {
    // https://openexchangerates.org/api/latest.json?app_id=YOUR_APP_ID
    axios.get('https://openexchangerates.org/api/latest.json?app_id=' + process.env.DATA_KEY_ID).then(res => {
        //console.log("get data:", res.data)
        currency = Object.assign({}, res.data)
    }).catch(error => {
        console.log(error.response)
    })
}
getCurrency()
setInterval(() => { getCurrency() }, 60 * 60 * 1000)

router.get('/get-data', function (req, res, next) {
    res.send(currency)
})

module.exports = router;

