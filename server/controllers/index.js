var models = require('../models');

var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10,
  'Content-Type': 'application/json'
};

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(function(err, results) {
        res.set(headers);
        res.json({results: results});
      });
    },
    post: function (req, res) {
      console.log('****************************', req.body);
      var params = [
        req.body['text'],
        req.body['username'],
        req.body['roomname']
      ];

      models.messages.post(params, function(err, results) {
        res.set(headers);
        res.json(results);
      });
    },
    options: function(req, res) {
      res.set(headers);
      res.end(null);
    }
  },

  users: {
    get: function (req, res) {
      models.users.get(function(err, results) {
        res.json(results);
      });
    },
    post: function (req, res) {
      var params = [ req.body['username'] ];

      models.messages.post(params, function(err, results) {
        res.json(results);
      });
    }
  }
};

