var express = require('express');
var router = express.Router();
var messager = require('../modules/messager');
require('dotenv').config();

/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.query['hub.mode'] === 'subscribe' &&
        req.query['hub.verify_token'] === process.env.VERIFY_TOKEN) {
        console.log("Validating webhook");
        res.status(200).send(req.query['hub.challenge']);
    } else {
        console.error("Failed validation. Make sure the validation tokens match.");
        res.sendStatus(403);
    }
});

router.post('/', function (req, res, next) {
    //TODO: identify message purpose and direct to modules accordingly
    console.dir(req.body, { depth: 11, colors: true });
    //res.sendStatus(200);
    req.body.entry.forEach(function (entry) {
        entry.messaging.forEach(function (event){
            messager.text(event.sender.id, "responding to your message of " + event.message.text, function (status) {
                res.sendStatus(status);
            });
        });
    });
});

module.exports = router;