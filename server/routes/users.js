var express = require('express');
var router = express.Router();

let users = [];

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(users);
});
router.post('/', function(req, res, next) {
  var username = req.body.username;
  if (username && username !== '') {
    users.push(username);
    console.log(`User ${username} connected`);
    res.json({username: username, error: null});
  } else {
    res.json({username: null, error: 'Username required'});
  }
});

module.exports = router;
