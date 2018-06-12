var express = require('express');
var exphbs = require('express-handlebars');
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var PORT = process.env.PORT || 3000;

// Require all models

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());


// Import routes and give the server access to them.
var routes = require("./routes/characters");

app.use(routes);

// sets view engine to handlebars

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

// Connects to mongoDB database

mongoose.connect("mongodb://localhost/savageworldsdb", function(error){
    if(error){
        console.log(error);
    } else {
        console.log("connected to database");
    }
});


// starts the server
app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on Port" + PORT);
});
  