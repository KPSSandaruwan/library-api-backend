let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let AuthorModelSchema = new Schema({
  firstName: {
    type: String,
    ref: "Author",
    required: [true, "First name is required!"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required!"],
  }
});

const Author = mongoose.model("Author", AuthorModelSchema);
module.exports = { Author };
