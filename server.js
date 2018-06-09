var express = require('express');
var exphbs = require('express-handlebars');
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var PORT = process.env.PORT || 3000;

// Require all models
var db = require("./models");


var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/savageworldsdb", function(error){
    if(error){
        console.log(error);
    } else {
        console.log("connected to database");
    }
});

//MODELS



app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

app.post("/submit", function(req, res) {
    // Create a new Book in the database
    db.CharSheet.create({
      "name" : "Aridan Smaffbaan",
      "parry" : 8,
      "toughness" : 4,
      "skills" : ["shooting D8", "intimidate D4"],
      "wounds" : 3
    })
      .then(function(dbBook) {
        // If a Book was created successfully, find one library (there's only one) and push the new Book's _id to the Library's `books` array
        // { new: true } tells the query that we want it to return the updated Library -- it returns the original by default
        // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      })
      .then(function(dbLibrary) {
        // If the Library was updated successfully, send it back to the client
        res.json(dbLibrary);
      })
      .catch(function(err) {
        // If an error occurs, send it back to the client
        res.json(err);
      });
  });
  

// Route for getting all books from the db
app.get("/characters", function(req, res) {
    // Using our Book model, "find" every book in our db
    db.CharSheet.find({})
      .then(function(data) {
        // If any Books are found, send them to the client
        res.json(data);
      })
      .catch(function(err) {
        // If an error occurs, send it back to the client
        res.json(err);
      });
  });

app.get("/" , function(req,res){
        // Using our Book model, "find" every book in our db
    db.CharSheet.find({})
    .then(function(data) {
        // If any Books are found, send them to the client
        var hbsObject = {
            characters:data
        }
        console.log(hbsObject);
        res.render("index", hbsObject)
    })
    .catch(function(err) {
        // If an error occurs, send it back to the client
        res.json(err);
    });

});

app.get("/form" , function(req,res){
    res.render("form")
});




app.listen(PORT, function() {
    

    // Log (server-side) when our server has started
    console.log("Server listening on Port" + PORT);
});
  