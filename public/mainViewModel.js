function initialize() {
  new Vue({
    el: "#divPrimary",
    template: "#templatePrimary",
    data: {
      Colors: [
        '#e21400', '#91580f', '#f8a700', '#f78b00',
        '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
        '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
      ],
      username: '',
      connected: false,
      typing: false,
      lastTypingTime: null,
      socket: io(),
      messages: [],
      loggedOnUsers: [],
      connected: false,
      currentMessage: '',
      errorMessage: '',
      currentSuggestion: '',
      currentPassword: '',
      suggestions: [],
      canPlay: true,
      maxVotes: 2,
      votingLocked: false,
      currentVotingResults: null
    },
    methods: {
      setCurrentSuggestionList: function (data) {
        this.suggestions = data;

      },
      handleResults: function (data) {

        this.currentVotingResults = data;
        this.unlockVotes();

      },

      toggleSelected: function (data) {

        if (data.selected) {
          data.selected = !data.selected;
        } else {
          if (this.selectedSuggestions.length < this.maxVotes) {
            Vue.set(data, 'selected', true);
          }
        }
      },
      addSuggestion: function (data) {
        this.suggestions.push(data);

      },
      setLoggedOnUsers: function (data) {
        this.loggedOnUsers = data;

      },
      setErrorMessage: function (data) {
        this.errorMessage = data;
      },
      addChatTyping: function (data) {
        var user = this.getUser(data.username);
        if (user)
          user.typing = true;
      },
      removeChatTyping: function (data) {
        var user = this.getUser(data.username);
        if (user)
          user.typing = false;
      },
      handleReconnect: function () {
        log('you have been reconnected');
        if (this.username) {

          this.login();
        }
      },
      getUser: function (username) {

        for (var i = 0; i < this.loggedOnUsers.length; i++) {
          if (this.loggedOnUsers[i].username == username)
            return this.loggedOnUsers[i];

        }
        return null;
      },
      login: function () {
        if (this.username.length <= 14 && this.currentPassword.length <= 14)
          this.socket.emit('add user', {
            username: this.username,
            password: this.currentPassword
          });
      },
      addChatMessage: function (data) {
        this.messages.push(data);

        var el = document.getElementById('chatwindow');
        if (el)
          el.scrollTop = el.scrollHeight;
      },
      log: function (message) {
        this.addChatMessage({
          message: message,
          username: 'SYSTEM',
          isLog: true
        });

      },
      sendGameChoice: function (val) {
        this.socket.emit('game choice', val);
        this.canPlay = false;
      },
      finishGame: function (data) {
        this.canPlay = true;
        this.log(data);
      },
      sendMessage: function () {

        if (this.currentMessage && this.connected && this.currentMessage.length <= 255) {
          this.addChatMessage({
            username: this.username,
            message: this.currentMessage
          });
          // tell server to execute 'new message' and send along one parameter
          this.socket.emit('new message', this.currentMessage);
          this.currentMessage = '';

        }
      },
      sendVotes: function () {
        // if there is a non-empty message and a socket connection
        if (this.connected && this.selectedSuggestions.length > 0) {
          // tell server to execute 'new message' and send along one parameter
          this.socket.emit('new vote', this.selectedSuggestions);
          this.votingLocked = true;
        }
      },
      calculateVotes: function () {
        // if there is a non-empty message and a socket connection
        if (this.connected) {
          // tell server to execute 'new message' and send along one parameter
          this.socket.emit('calculate votes');
          this.votingLocked = true;
        }
      },
      unlockVotes: function () {
        this.votingLocked = false;

      },
      sendSuggestion: function () {
        // if there is a non-empty message and a socket connection
        if (this.currentSuggestion && this.connected && this.currentSuggestion.length <= 255) {
          // tell server to execute 'new message' and send along one parameter
          this.socket.emit('new suggestion', this.currentSuggestion);

          this.currentSuggestion = '';
        }
      },
      setConnected: function (con) {
        this.connected = con;
        this.loggedIn = con;
      }
    },
    created: function () {
      var setConnected = this.setConnected;
      var setCurrentSuggestionList = this.setCurrentSuggestionList;
      var removeChatTyping = this.removeChatTyping;
      var addChatTyping = this.addChatTyping;
      var log = this.log;
      var addChatMessage = this.addChatMessage;
      this.socket.on('login', function (data) {
        setConnected(true);
        // Display the welcome message
        var message = "Welcome to S-Movies Chat";
        setCurrentSuggestionList(data.suggestions);

        log(message);
      });
      this.socket.on('current suggestion list', setCurrentSuggestionList);
      this.socket.on('add suggestion', this.addSuggestion);
      this.socket.on('new message', this.addChatMessage);
      this.socket.on('game started', this.log);
      this.socket.on('game finished', this.finishGame);
      this.socket.on('login failed', this.setErrorMessage);
      this.socket.on('voting results', this.handleResults);
      this.socket.on('user joined', function (data) {
        log(data.username + ' joined')

      });
      this.socket.on('user left', function (data) {
        log(data.username + ' left');
        removeChatTyping(data);
      });

      this.socket.on('typing', function (data) {
        addChatTyping(data);
      });

      this.socket.on('stop typing', function (data) {
        removeChatTyping(data);
      });

      var setLoggedOnUsers = this.setLoggedOnUsers;
      this.socket.on('current user list', setLoggedOnUsers);

      this.socket.on('disconnect', function () {
        log('you have been disconnected');
      });

      this.socket.on('reconnect', this.handleReconnect);

      this.socket.on('reconnect_error', function () {
        log('attempt to reconnect has failed');
      });

    },
    computed: {
      selectedSuggestions: function () {
        var retData = [];
        for (var i = 0; i < this.suggestions.length; i++)
          if (this.suggestions[i].selected)
            retData.push(this.suggestions[i].ID);
        return retData;
      }

    }
  });

}