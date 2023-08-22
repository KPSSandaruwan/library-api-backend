let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let BookModelSchema = new Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: [true, "Author field is required!"],
  },
  name: {
    type: String,
    required: [true, "Book name is required!"],
  },
  isbnNumber: {
    type: String,
    unique: true,
    required: [true, "ISBN number is required!"],
  }
});

const Book = mongoose.model("Book", BookModelSchema);
module.exports = { Book };
