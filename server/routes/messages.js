var express = require('express');
var router = express.Router();

let messages = [];

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(messages);
});
router.post('/', function(req, res, next) {
  var username = req.body.username;
  var message = req.body.message;
  var key = null;
  var error = null;

  if (!username || username === '') {
    error = 'Username is required';
    console.log(error);
  }
  else if (!message || message === '') {
    error = 'Message is required';
    console.log(error);
  }
  else {
    pastMessages = messages.filter((message) => {
      if (message.username === username) {
        return message;
      }
    });

    key = `${username}${pastMessages.length}`;
    messages.push({username: username, message: message});
    console.log(`${username}: ${message}`);
  }

  res.json({username: username, message: message, key: key, error: error});
});

module.exports = router;
