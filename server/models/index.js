var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      // fetch all messages
      var queryStr =
        'select messages.id, messages.text, messages.roomname, users.username from messages \
         left outer join users on (messages.userid = users.id) \
         order by messages.id desc';
      db.query(queryStr, function(err, results) {
        callback(err, results);
      });
    },
    post: function (params, callback) {
      // create a message
      var queryStr =
        'insert into messages(text, userid, roomname) \
         values (?, (select id from users where username = ? limit 1), ?)';
      db.query(queryStr, params, function(err, results) {
        callback(err, results);
      });
    }
  },

  users: {
    get: function (callback) {
      // fetch all users
      var queryStr = 'select * from users';
      db.query(queryStr, function(err, results) {
        callback(err, results);
      });
    },
    post: function (params, callback) {
      // create a user
      var queryStr = 'insert into users(username) values (?)';
      db.query(queryStr, params, function(err, results) {
        callback(err, results);
      });
    }
  }
};

