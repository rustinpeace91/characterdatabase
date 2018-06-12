//***************************************************************************************************
// ROUTES
//***************************************************************************************************

var express = require("express");
var db = require("../models");

var router = express.Router();



router.post("/api/characters", function(req, res) {
    // Create a new Book in the database
    db.CharSheet.create(req.body)
      .then(function(character) {
        // If a Book was created successfully, find one library (there's only one) and push the new Book's _id to the Library's `books` array
        // { new: true } tells the query that we want it to return the updated Library -- it returns the original by default
        // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      })
      .then(function(dcharacter) {
        // If the Library was updated successfully, send it back to the client
        res.json(dcharacter);
      })
      .catch(function(err) {
        // If an error occurs, send it back to the client
        res.json(err);
      });
});
 
router.delete("/api/characters/:id", function(req,res){

    db.CharSheet.deleteOne({_id : req.params.id})
        .then(function(data){
            res.json(data);

        })
        .catch(function(err){
            res.json(err);
        });
});

router.get("/api/characters/:id", function(req,res){
    console.log(req.params.id)
    db.CharSheet.find({_id : req.params.id})
        .then(function(data){
            res.json(data);
        })
        .catch(function(err){
            res.json(err);
        });
});

// Import the model (cat.js) to use its database functions.




// Route for getting all books from the db


router.get("/api/characters", function(req, res) {
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

router.get("/" , function(req,res){
        // Using our Book model, "find" every book in our db
    db.CharSheet.find({})
    .then(function(data) {
        // If any Books are found, send them to the client
        var hbsObject = {
            characters:data
        }
        res.render("index", hbsObject)
    })
    .catch(function(err) {
        // If an error occurs, send it back to the client
        res.json(err);
    });

});

router.get("/form" , function(req,res){
    res.render("form")
});
//  END ROUTES

module.exports = router;