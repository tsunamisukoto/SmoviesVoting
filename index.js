// Setup basic express server
var useGoogle = (process.argv[2] == "useGoogle");
var express = require('express');
var app = express();
// var $ = require('jquery');
const https = require('https');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 5052;
var request = require('request');
const crypto = require('crypto');
const dbConfig = require('./config/database.config.js');
function sha256(data) {
  return crypto.createHash("sha256").update(data).digest("base64");
}
const rateLimit = require("express-rate-limit");

app.enable("trust proxy"); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000 // limit each IP to 100 requests per windowMs
});

//  apply to all requests
app.use(limiter);


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

//app.get('/', function (req, res) {
//    if (authenticated.checkIsAuthenticatedRequest(req, res)) {
//        res.sendFile(__dirname + '/public/rooms.html');

//    }
//    else {
//        res.sendFile(__dirname + '/public/login.html');

//    }
//});

app.use(express.static('public'));
const bodyParser = require('body-parser');
app.use(bodyParser.json())
const authenticated = require('./modules/Authenticated.js');

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
require('./routes/user.routes.js')(app);
require('./routes/auth.routes.js')(app);
require('./routes/room.routes.js')(app);
require('./routes/join.room.routes.js')(app);

server.listen(port,"0.0.0.0", function () {
  console.log('Server listening at port %d', port);
});
// Chatroom

var numUsers = 0;
var currentUserID = 0;
var allUsers = [];
var currentVotes = [];
var currentID = 0;

var currentGame = null;
var suggestions = [];
io.on('connection', function (socket) {
  var addedUser = false;

  // when the client emits 'new message', this listens and executes
  socket.on('new message', function (data) {
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
  });
  socket.on('new vote', function (data) {
    var found = false;
    for (var i = 0; i < currentVotes.length; i++) {
      if (currentVotes[i].username == socket.username) {
        found = true;
        currentVotes[i].votes = data;
        io.emit('new message', {
          username: socket.username,
          message: "Modified Existing Vote",
          isLog: true
        });
      }
    }
    if (!found) {
      currentVotes.push({
        username: socket.username,
        votes: data
      });
      io.emit('new message', {
        username: socket.username,
        message: "Submitted New Vote",
        isLog: true
      });
    }
  });

  function getSuggestion(id) {
    for (var i = 0; i < suggestions.length; i++) {
      if (suggestions[i].ID == id) {
        return suggestions[i];
      }
    }
    return null;
  }
  socket.on('calculate votes', function (data) {
    var retData = [];
    var ties = [];
    var winner = null;
    var highestVotes = 0;
    for (var m = 0; m < suggestions.length; m++) {
      var sug = JSON.parse(JSON.stringify(suggestions[m]));
      sug.votes = [];

      for (var i = 0; i < currentVotes.length; i++) {
        var voteList = currentVotes[i];

        for (var j = 0; j < voteList.votes.length; j++) {
          if (voteList.votes[j] == sug.ID)
            sug.votes.push(voteList.username);
        }

      }
      if (sug.votes.length != 0) {
        retData.push(sug);
        if (sug.votes.length > highestVotes) {
          winner = sug;
          highestVotes = sug.votes.length;
        }
      }


    }
    var results = {
      username: socket.username,
      suggestions: retData,
      winner: winner,
      ties: ties
    };
    io.emit('voting results', results);
    currentVotes = [];
  });
  socket.on('new suggestion', function (suggestionName) {
    var GoogleSearch = require('google-search');
    var googleSearch = new GoogleSearch({
      key: 'AIzaSyCzb6SI_JRrp6xLLYV617Ary6n59h36ros',
      cx: '004286675445984025592:ypgpkv9fjd4'
    });


    var suggestion = {
      Name: suggestionName,
      ID: currentID++,
      UserName: socket.username

    };
    if (useGoogle) {

      googleSearch.build({
        q: suggestionName + ' IMDB',
        searchType: "image",
        num: 1, // Number of search results to return between 1 and 10, inclusive 
      }, function (error, response) {
        var googleResults = response.items;

        if (googleResults && googleResults.length) {
          var imageURL = googleResults[0].image.thumbnailLink;
          suggestion.thumbNail = imageURL;
        }


        suggestions.push(suggestion);
        io.emit('add suggestion', suggestion);
      });
    } else {

      //Only if not using google
      io.emit('add suggestion', suggestion);
      suggestions.push(suggestion);

    }
  });

  function addUser(credentials) {
    var foundUser = false;

    for (var i = 0; i < allUsers.length; i++) {
      if (allUsers[i].UserName == credentials.username) {

        allUsers[i].Online = true;
        foundUser = allUsers[i];

      }

    }

    if (!foundUser) {
      allUsers.push({
        UserName: credentials.username,
        Password: sha256(credentials.password),
        Online: true,
        ID: currentUserID++,
        typing: false
      });
    } else {
      if (foundUser.Password != sha256(credentials.password)) {
        socket.emit('login failed', "Wrong Password");

        return false;
      }

    }
    io.emit('current user list', allUsers);
    return true;
  }

  function removeUser(userName) {
    var foundUser = false;
    for (var i = 0; i < allUsers.length; i++) {
      if (allUsers[i].UserName == userName) {
        allUsers[i].Online = false;
      }

    }
    socket.broadcast.emit('current user list', allUsers);
  }
  // when the client emits 'add user', this listens and executes
  socket.on('add user', function (credentials) {
    if (addedUser) return;
    if (!addUser(credentials)) {

    } else {
      // we store the username in the socket session for this client
      socket.username = credentials.username;

      ++numUsers;
      addedUser = true;
      socket.emit('login', {
        suggestions: suggestions
      });
      // echo globally (all clients) that a person has connected
      socket.broadcast.emit('user joined', {
        username: socket.username,
        numUsers: numUsers
      });
    }


  });

  function playGame(game1, game2) {
    var result = game1.username + " played " + game1.play;
    result += ". " + game2.username + " played " + game2.play + ". ";
    if (game1.play == game2.play)
      result += game1.username + " has drawn with " + game2.username + ". Play Again?";
    else {
      var game1Wins = false;
      switch (game1.play) {
        case "Rock":
          game1Wins = (game2.play == "Scissors");
          break;
        case "Paper":
          game1Wins = (game2.play == "Rock");
          break;
        case "Scissors":
          game1Wins = (game2.play == "Paper");
          break;
      }
      if (game1Wins) {
        result += game1.username + " has beaten " + game2.username;
      } else {
        result += game2.username + " has beaten " + game1.username;

      }

    }
    currentGame = null;
    return result;
  }
  socket.on('game choice', function (val) {
    var game = {
      play: val,
      username: socket.username
    };
    if (currentGame) {
      io.emit("game finished", playGame(currentGame, game));
    } else {
      currentGame = game;
      io.emit("game started", socket.username + " has initiated a game of Rock/Paper/Scissors. Will anyone challenge them?");
    }
  });
  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', function () {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', function () {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function () {
    if (addedUser) {
      --numUsers;
      removeUser(socket.username);

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
});