(function() {
  'use strict';

  // Require dependencies that you will need. Dependencies perform a particular
  // function in your application

  // Express is a javascript routing framework.
  var express = require('express'),

  // Mongoose helps to connect to MongoDB
  mongoose = require('mongoose'),

  //Define the app
  app = express(),

  // Define your port
  port = process.env.PORT || 3030,

  // Require the config file
  config = require('./config/config'),

  //Dependency to help with path
  path = require('path'),

  // Body Parser
  bodyParser = require('body-parser'),

  // Controller
  Member = require('./server/controllers/member');

  // routes
  // routes = require('./server/routes/member');
  app.use(bodyParser.json());

  // Routes
  app.get('/api/view', Member.find);
  app.post('/api/save', Member.create);
  app.delete('/api/delete/:email', Member.delete);


  // Connect to the database
  mongoose.connect(config.db, function(err) {
    if (err) {
      console.log('Could not connect to database');
    } else {
      console.log('Connected to database techinpink');
    }
  });

  // Default path or route
  app.get('/', function(req, res) {
    // Deliver html file
    res.sendFile(path.join(__dirname + '/public/index.html'));
    app.use(express.static(__dirname + '/public'));
  });


  // Start up the server
  app.listen(port, function(err) {
    if (err) {
      console.log('Cannot connect to port');
    } else {
      console.log('Connected on port ' + port);
    }
  });
})();
