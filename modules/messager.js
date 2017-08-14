//var app = require('express');
var request = require('request');
require('dotenv').config();

//TODO: add templates for sending messages easily (ex: button message accepts message and button object, makes message with buttons in object)

module.exports = {
    text: function (recipientId, text, callback) {
        var messageData = {
            recipient: {
                id: recipientId
            },
            message: {
                text: text
            }
        };
        this.send(messageData, callback);
    },
    send: function send(messageData, callback) {
        request({
            uri: 'https://graph.facebook.com/v2.6/me/messages',
            qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
            method: 'POST',
            json: messageData

        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var recipientId = body.recipient_id;
                var messageId = body.message_id;
                callback(200);
                console.log("Successfully sent message with id %s to recipient %s",
                    messageId, recipientId);
            } else {
                callback(500);
                console.error("Unable to send message.");
                console.error(response);
                console.error(error);
            }
        });
    }
};