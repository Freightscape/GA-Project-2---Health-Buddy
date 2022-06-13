/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
const mongoose = require("./connection");

////////////////////////////////////////////////
// Our Models
////////////////////////////////////////////////
// pull schema and model from mongoose
const { Schema, model } = mongoose;
// upper line is combined of these 2 lines
// const Schema = mongoose.Schema
// const model = mogoose.model

// make consumed schema
const consumedsSchema = new Schema({
  food: String,
  calories: Number,
  protien: Number,
  fat: Number,
  carbs: Number,
  satiating: Boolean,
  meal: String,
  totalCaloriesRemaining: Number,
  endOfDayWeight: Number,
  username: String,
});

// make consumed model
const Consumed = model("Consumed", consumedsSchema);

///////////////////////////////////////////////////
// Export Model
///////////////////////////////////////////////////
module.exports = Consumed;
