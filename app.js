const express = require('express')
const app = express()
const http = require('http').Server(app)
const gameLogic = require('./game-logic')
let io = require("socket.io")(http, {
  cors: {
    origin: "https://quorridor.herokuapp.com/",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }, 
  cookie: {
    name: "test",
    httpOnly: false,
    path: "/custom"
  }
});


io.on('connection', (client) => {
    console.log('New client connected (id=' + client.id + ').');
    gameLogic.initializeGame(io, client)
     
})



http.listen(8000), function () {
  console.log("listening in port "+ (8000));
};