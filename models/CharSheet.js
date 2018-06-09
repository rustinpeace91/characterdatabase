var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new LibrarySchema object
// This is similar to a Sequelize model
var CharSheetSchema = new Schema({
    name: {
        type: String,
    },
    parry: {
        type: Number
    },
    toughness: {
        type: Number
    },
    skills:{
        type: Array
    },
    weapons:{
        type: Array
    },
    other:{
        type: String
    },

});

// This creates our model from the above schema, using mongoose's model method
var CharSheet = mongoose.model("CharSheet", CharSheetSchema);

// Export the Book model
module.exports = CharSheet;
