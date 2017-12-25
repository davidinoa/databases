var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      // fetch all messages
      // id, text, roomname and username
      var queryStr =
        'select messages.id, messages.text, messages.roomname, users.username from messages \
         left outer join users on (messages.userid = users.id) \
         order by messages.id desc';
      db.query(queryStr, function(err, results) {
        callback(results);
      });
    },
    post: function (params, callback) {
      // create a message
      var queryStr =
        'insert into messsages(text, userid, roomname) \
         values (?, (select id from users where username = ? limit 1), ?)';
      db.query(queryStr, params, function(err, result) {
        callback(results);
      });
    }
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

