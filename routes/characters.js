//***************************************************************************************************
// ROUTES
//***************************************************************************************************

var express = require("express");
var db = require("../models");

var router = express.Router();


// retrieves all characters from the DB and renders them to the homepage
router.get("/" , function(req,res){
    // Using our character model, "find" every character in our db
db.CharSheet.find({})
.then(function(data) {
    // If any characters are found, send them to the client
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

// renders the form for submitting characters
router.get("/form" , function(req,res){
    res.render("form")
});


// Route for getting all Characters from the db
router.get("/api/characters", function(req, res) {
    // Using our character model, "find" every character in our db
    db.CharSheet.find({})
      .then(function(data) {
        // If any characters are found, send them to the client
        res.json(data);
      })
      .catch(function(err) {
        // If an error occurs, send it back to the client
        res.json(err);
      });
});


// retrieves all the characters of a certain ID (not in use yet)
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



router.post("/api/characters", function(req, res) {
    // Create a new characterin the database
    db.CharSheet.create(req.body)
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


//  END ROUTES

module.exports = router;