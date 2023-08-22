const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuthorModelSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "First name is required!"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required!"],
  }
});

const Author = mongoose.model("Author", AuthorModelSchema);
module.exports = { Author };
