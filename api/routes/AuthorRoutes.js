module.exports = function (app) {
  const AuthorController = require("../controllers/AuthorController");

  app.post("/createAuthor", AuthorController.createAuthor);
  app.get("/getAllAuthors/:skip/:limit", AuthorController.getAllAuthors);
  app.get("/getAuthorById/:id", AuthorController.getAuthorById);
  app.put("/updateAuthor/:id", AuthorController.updateAuthor);
};