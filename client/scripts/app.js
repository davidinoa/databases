var app = {
  // server: 'http://parse.hrr.hackreactor.com/chatterbox/classes/messages',
  server: 'http://127.0.0.1:3000/classes/messages',

  init: function() {
    app.username = 'anonymous';

    app.onscreenMessages = {};

    app.$text = $('#message');

    app.loadMsgs();
    setInterval(app.loadMsgs.bind(app), 1000);

    $('#send').on('submit', app.handleSubmit);
  },

  handleSubmit: function(e) {
    e.preventDefault();

    var message = {
      username: app.username,
      text: app.$text.val(),
    };

    app.$text.val('');

    app.sendMsg(message);
  },

  renderMessage: function(message) {
    var $user = $('<div>', {class: 'user'}).text(message.username + ':');
    var $text = $('<div>', {class: 'text'}).text(message.text);
    var $message = $('<div>', {class: 'chat'}).append($user, $text);
    return $message;
  },

  displayMessage: function(message) {
    if (!app.onscreenMessages[message.objectId]) {
      var $html = app.renderMessage(message);
      $('#chats').prepend($html);
      app.onscreenMessages[message.objectId] = true;
    }
  },

  displayMessages: function(messages) {
    for (var i = 0; i < messages.length; i++) {
      app.displayMessage(messages[i]);
    }
  },

  loadMsgs: function() {
    $.ajax({
      url: app.server,
      data: { order: '-createdAt' },
      contentType: 'application/json',
      success: function(json) {
        console.log(json.results);
        app.displayMessages(json.results);
      },
      complete: function() {
        app.stopSpinner();
      }
    });
  },

  sendMsg: function(message) {
    app.startSpinner();
    $.ajax({
      url: app.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function(json) {
        message.objectId = json.objectId;
        app.displayMessages(message);
      },
      complete: function(json) {
        app.stopSpinner();
      }
    });
  },

  startSpinner: function() {
    $('.spinner img').show();
    $('form input[type=submit]').attr('disabled', 'true');
  },

  stopSpinner: function() {
    $('.spinner img').fadeOut('fast');
    $('form input[type=submit]').attr('disabled', null);
  }

};