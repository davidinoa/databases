var db = require('../db');

module.exports = {
  messages: {
    get: function () {},
    post: function () {}
  },

  users: {
    get: function (callback) {
      // fetch all users
      var queryStr = 'select * from users';
      db.query(queryStr, function(err, result) {
        callback(results);
      });
    },
    post: function (params, callback) {
      // create a user
      var queryStr = 'insert into users(username) values (?)';
      db.query(queryStr, params, function(err, result) {
        callback(results);
      });
    }
  }
};

