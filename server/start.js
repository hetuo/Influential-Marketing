'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const {resolve} = require('path')
const passport = require('passport')
const path = require('path');
const compression = require('compression');
const favicon = require('serve-favicon');
const http = require('http');
const SocketIO = require('socket.io');
const pkg = require('APP')
const app = express()

let sessionLife = 600000;
if (!pkg.isProduction && !pkg.isTesting) {
  app.use(require('volleyball'))
}

function refreshUserList(socket_id) {
  if(Object.keys(connectedUsers).length > 0){
    userList = [];
    for(let key in connectedUsers){
      if(connectedUsers.hasOwnProperty(key)){
        userList.push(connectedUsers[key]);
      }
    }
  }
  io.emit('user list changed', {userList:userList, self: socket_id});
}

app.use(require('express-session') ({
    resave: false,
    secret: process.env.SESSION_SECRET || 'an insecure secret key',
    saveUninitialized: true,
    cookie: {
      expires: new Date(Date.now()+sessionLife),
      maxAge: sessionLife
    }
  }))
  .use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();
  })
  // Body parsing middleware
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())

  // Authentication middleware
  .use(passport.initialize())
  .use(passport.session())
  .use(compression())
  // Serve static files from ../public
  .use(express.static(resolve(__dirname, '..', 'public')))
  // .use(express.static('dist'))

  .use('/node_modules', express.static(resolve(__dirname, '..', 'node_modules')))

  // Serve our api
  .use('/api', require('./api'))

  // Send index.html for anything else.
  .get('/*', (_, res) => res.sendFile(resolve(__dirname, '..', 'public', 'index.html')))

  let server = http.createServer(app);
  let io = new SocketIO(server);
  let connectedUsers = {};
  let userCount = 0;
  let userList = [];

  io.on('connection', function(socket) {
    if (userCount == 0) {
      connectedUsers[socket.id]=("Director");
    } else {
      connectedUsers[socket.id]=("Influencer");
    }
    userCount++;

    refreshUserList(socket.id);
    io.emit('user connected', {user: connectedUsers[socket.id], socket_id: socket.id});

    socket.on('disconnect', function(){
      let currentUser = connectedUsers.hasOwnProperty(socket.id);
      if (currentUser) {
        io.emit('user disconnected', {user: connectedUsers[socket.id], socket_id: socket.id});
        delete connectedUsers[socket.id];
      }
      refreshUserList();
    });

    socket.on('chat message', function(data) {
      let user = connectedUsers[data.socket_id];
      data["user"] =user;
      io.emit('chat message', data);
    });

    socket.on('name changed', function(data) {
      let user = connectedUsers[data.socket_id];
      data["user"] =user;
      connectedUsers[data.socket_id] =data.newName;
      io.emit('name changed', data);
      refreshUserList();
    });
});

server.listen(process.env.PORT || 1337);